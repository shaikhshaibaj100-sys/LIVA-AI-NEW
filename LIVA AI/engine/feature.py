
import re
from time import strftime
import webbrowser
import sqlite3
import pywhatkit as kit
import playsound
import eel
import os
import subprocess
import platform


# expose means access the function in the js file
@eel.expose
def playAssistantSound():
    """Play assistant sound effect"""
    try:
        music_dir = r"C:\LIVA AI\LIVA AI\www\assets\audio\chimes.wav"
        if os.path.exists(music_dir):
            playsound.playsound(music_dir)
        else:
            print("Sound file not found")
    except Exception as e:
        print(f"Error playing sound: {e}")


@eel.expose
def opencommand(query):
    
    from engine.command import speak
    """Open applications and websites based on voice command"""
    
    # -------------------- CLEAN QUERY --------------------
    query = query.lower()
    query = re.sub(r"\b(?:open|launch|start|)\b", "", query).strip()

    if not query:
        speak("What should I open?")
        return

    
    speak(query)

    # -------------------- 1. LOCAL APPS --------------------
    apps = {
        "chrome": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "chrome": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",  # 32-bit fallback
        "vs code": "C:\\Users\\{user}\\OneDrive\\Desktop\\Microsoft VS Code\\Code.exe".format(user=os.getenv('USERNAME')),
        "notepad": "notepad",
        "calculator": "calc",
        "cmd": "cmd",
        "command prompt": "cmd",
        "explorer": "explorer",
        "file ": "explorer",
        "settings":"c:\\windows\\system32\\ms-settings.exe",
        "control panel": "control",
        "task manager": "taskmgr",
        "paint": "mspaint",
        "whatsapp": "C:\\Users\\{user}\\OneDrive\\Desktop\\WhatsApp.lnk".format(user=os.getenv('USERNAME')),
        "android studio": "C:\\Users\\{user}\\OneDrive\\Desktop\\Android Studio.lnk".format(user=os.getenv('USERNAME')) ,
        
    }

    for app_name, app_path in apps.items():
        if app_name in query:
            try:
                if os.path.exists(app_path) or app_path in ["notepad", "calc", "cmd", "explorer", "ms-settings:", "control", "taskmgr", "mspaint"]:
                    if platform.system() == "Windows":
                        os.startfile(app_path)
                    else:
                        subprocess.run([app_path])
                    speak(app_name)
                    return
            except Exception as e:
                speak("App not found, trying alternative method")
                try:
                    # Fallback to Windows Run command
                    subprocess.run(['start', app_path], shell=True, check=True)
                    return
                except:
                    speak("Could not open the application")
                    print("ERROR:", e)
                    return

    # -------------------- 2. WEBSITES --------------------
    websites = {
        "youtube": "https://www.youtube.com",
        "google": "https://www.google.com",
        "github": "https://github.com",
        "gmail": "https://mail.google.com",
        "facebook": "https://facebook.com",
        "instagram": "https://instagram.com",
        "whatsapp web": "https://web.whatsapp.com",
        "stackoverflow": "https://stackoverflow.com",
        "linkedin": "https://linkedin.com",
        "chatgpt":"https://chat.openai.com",
        "gemini":"https://gemini.google.com"
    }

    for site in websites:
        if site in query:
            webbrowser.open(websites[site])
            speak(f"Open {site}")
            return

    # -------------------- 3. FALLBACK - Google Search --------------------
    speak(f"Searching for {query}")
    webbrowser.open(f"https://www.google.com/search?q={query.replace(' ', '+')}")

@eel.expose
def Playyoutube(query):
    
    from engine.command import speak
    """Play YouTube video based on query"""
    query = re.sub(r"\b(?:play|on youtube)\b", "", query, flags=re.IGNORECASE).strip()

    if not query:
        speak("What should I play?")
        return

    eel.DisplayMessage(f"Liva: Playing {query} on YouTube")
    speak(f"{query}")
    
    try:
        kit.playonyt(query)
    except Exception as e:
        
        
        speak("Could not play on YouTube")
        print(f"YouTube error: {e}")


@eel.expose
def createimage(query):
    from engine.command import speak
    import re, base64, requests, urllib.parse, time, os
    from datetime import datetime
    import eel

    # ---------------- CLEAN QUERY ----------------
    query = re.sub(r"\b(?:create|generate|make|image of)\b", "", query, flags=re.IGNORECASE).strip()

    if not query:
        speak("What image should I create?")
        return

    # ---------------- STYLE SYSTEM 🎨 ----------------
    style = "realistic"

    if "anime" in query:
        style = "anime"
        query += ", anime style, studio ghibli, high quality"
    elif "logo" in query:
        style = "logo"
        query += ", minimalist logo, vector, clean design"
    elif "3d" in query:
        style = "3d"
        query += ", 3D render, octane render, ultra realistic"
    elif 'cinamatic' in query:
        style = "cinematic"
        query += ", ultra realistic, 4k, cinematic lighting"
    else:
        
        query+=",natural, realistic, high quality"
        
        
        
    speak("creating image of " + query)
    eel.DisplayMessage(f"Liva: Creating {style} image of {query}")
    eel.showStatus("🎨 Generating image...", "loading")
    speak(f"Creating {style} image")

    try:
        # ---------------- POLLINATIONS (PRIMARY) ----------------
        encoded_query = urllib.parse.quote(query)
        url = f"https://image.pollinations.ai/prompt/{encoded_query}?width=1024&height=1024"

        for attempt in range(3):
            response = requests.get(url)
            if response.status_code == 200:
                break
            time.sleep(2)

        response.raise_for_status()
        image_data = response.content

    except Exception as e:
        print("Pollinations failed:", e)

        try:
            # ---------------- FALLBACK: HUGGINGFACE ----------------
            HF_API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"
            HF_API_KEY = os.getenv("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")  # 🔒 safe method

            headers = {"Authorization": f"Bearer {HF_API_KEY}"}

            response = requests.post(HF_API_URL, headers=headers, json={"inputs": query})
            response.raise_for_status()

            image_data = response.content

        except Exception as e2:
            print("Fallback failed:", e2)
            eel.showStatus("❌ All image services failed", "error")
            speak("Sorry, image generation failed.")
            return

    # ---------------- SAVE + DISPLAY ----------------
    try:
        image_b64 = base64.b64encode(image_data).decode("utf-8")

        # Save locally (history)
        folder = "generated_images"
        os.makedirs(folder, exist_ok=True)

        filename = f"{folder}/liva_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"

        with open(filename, "wb") as f:
            f.write(image_data)

        image_data_url = f"data:image/png;base64,{image_b64}"

        eel.showGeneratedImage(image_data_url, filename, query)
        
        eel.showStatus("✅ Image ready!", "success")
        speak("Image created successfully")
        eel.DisplayMessage(f"Liva: Image created - {query}") # Debug path
        print(f"Image saved to: {filename}")
        speak("image saved successfully on genereted image file please check the file ")
        

    except Exception as e:
        print("Save/display error:", e)
        eel.showStatus("❌ Error displaying image", "error")
        


@eel.expose
def chatbot(query):
    from engine.command import speak
    from time import strftime
    import difflib

    # ---------------- CLEAN INPUT ----------------
    query = query.lower().strip()

    # ---------------- BASIC SMART MATCH ----------------
    greetings = ["hi", "hello", "hey", "hii", "namaste"]
    how_are_you = ["how are you", "kaise ho", "kya haal hai"]
    name_query = ["your name", "who are you", "assistant name", "tum kaun ho"]
    time_query = ["time", "date", "samay", "aaj ki date"]

    # ---------------- GREETINGS ----------------
    if any(word in query for word in greetings):
        response = "Hello sir me aap ki help ke liye yahan hoon, aap batao kya karna hai?"

    # ---------------- HOW ARE YOU ----------------
    elif any(word in query for word in how_are_you):
        response = "Main bilkul badhiya hoon  Aap batao?"

    # ---------------- NAME ----------------
    elif any(word in query for word in name_query):
        response = "Main Liva hoon, aapka personal AI assistant jo aapki madad ke liye hamesha tayaar hai"

    # ---------------- DATE & TIME ----------------
    elif any(word in query for word in time_query):
        date_str = strftime("%B %d, %Y")
        time_str = strftime("%I:%M %p")
        response = f"Aaj ki date {date_str} hai aur time {time_str} hai "

    # ---------------- SMALL TALK ----------------
    elif "kya kar rahe ho" in query or "what are you doing" in query:
        response = "Main aapki help karne ke liye ready hoon aap batao kya karna hai?"

    elif "thank" in query or "shukriya" in query:
        response = "Welcome sir . app kabhi bhi puch sakte ho!"
            
    # ---------------- SMART FALLBACK ----------------
    else:
        # Try fuzzy matching (smart guessing)
        possible = ["hello", "time", "your name", "how are you"]

        match = difflib.get_close_matches(query, possible, n=1)

        if match:
            response = f"Kya aap '{match[0]}' puchna chahte the? "
        else:
            response = "Mujhe samajh nahi aaya  thoda clearly bol sakte ho?"

    # ---------------- SPEAK + RETURN ----------------
    speak(response)
    return response


@eel.expose
def googlesearch(query):
    from engine.command import speak
    """Perform Google search"""
    query = re.sub(r"\b(?:search|on google)\b", "", query, flags=re.IGNORECASE).strip()

    if not query:
        speak("What should I search?")
        return

    eel.DisplayMessage(f"Liva: Searching {query} on Google")
    speak(f"{query}")
    
    search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
    webbrowser.open(search_url)

@eel.expose
def youtubeplaymusic(query):
    from engine.command import speak
    """Play music on YouTube"""
    eel.DisplayMessage("Liva: Playing music")
    speak("Playing music")
    
    try:
        # More specific music queries
        music_queries = [
            "latest hindi songs",
            "top english songs",
            "lofi music",
            "relaxing music"
        ]
        import random
        selected_query = random.choice(music_queries)
        kit.playonyt(selected_query)
        speak(f"Playing {selected_query}")
    except Exception as e:
        speak("Could not play music")
        print(f"Music error: {e}")

# Additional utility functions
@eel.expose
def get_system_info(query):
    
    """Get basic system information"""
    import platform
    system_info = {
        "system": platform.system(),
        "release": platform.release(),
        "version": platform.version(),
        "processor": platform.processor(),
        "architecture": platform.architecture()
    }
    return system_info

    
import os
import platform
import subprocess

def sleep_computer():
    from engine.command import speak

    speak("sir aap ka pc ab sone wala hain byyy")

    try:
        if platform.system() == "Windows":
            os.system("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")
        else:
            speak("Sleep not supported on this system")
    except Exception as e:
        print("Sleep Error:", e)
        speak("Unable to sleep the computer")

@eel.expose
def open_folder(path=""):
    from engine.command import speak 
    """Open specific folder"""
    if not path:
        path = os.path.expanduser("~")  # Home directory
    try:
        os.startfile(path)
    except:
        subprocess.run(["explorer", path])

