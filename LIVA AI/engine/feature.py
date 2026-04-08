
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
        "settings": "ms-settings:",
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
    """Create image using DALL·E"""
    query = re.sub(r"\b(?:create|generate|make)\b", "", query, flags=re.IGNORECASE).strip()
 
    if not query:
        speak("What image should I create?")
        return

    eel.DisplayMessage(f"Liva: Creating image of {query}")
    speak(f"Creating image of {query}")
    
    # Placeholder for DALL·E API integration
    # In a real implementation, you would call the DALL·E API here and display the generated image
    print(f"Image creation requested for: {query}")
    
@eel.expose
def chatbot(query):
    from engine.command import speak
    """Chat with AI chatbot"""
    query = query.strip()

    if "hii" in query or "hello" in query or "hey" in query:
        speak("Hello! How can I assist you today?")
        return "hello how can i help you"
    
    elif "how are you" in query:
        speak("I'm doing well, thank you! How can I help you today?")
        return"i am doing well how can i help you"
    
    elif "what is your name" in query or "who are you" in query:
        #speak("I am Liva, your personal AI assistant. How can I help you today?")
        return" i am liva your personal ai assistant how can i help you"
    
    elif "today date" in query or "time " in query:
    
        date_str = strftime("%B %d, %Y")
        time_str = strftime("%I:%M %p")
        speak(f"Today's date is {date_str} and the current time is {time_str}.")
        return f"Today's date is {date_str} and the current time is {time_str}."
    
    else:
        speak("I'm not sure how to respond to that. Can you please speak more clearly?")
        return "I'm not sure how to respond to that. Can you please speak more clearly?"

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

@eel.expose
def shutdown_computer(query): 
    from engine.command import speak
    """Shutdown computer (use with caution)"""
    speak("Shutting down computer in 10 seconds")
    subprocess.run(["shutdown", "/s", "/t", "10"])
    
def sleep_computer(query):
    from engine.command import speak
    """Put computer to sleep"""
    speak("Putting computer to sleep")
    if platform.system() == "Windows":
        subprocess.run(["rundll32.exe", "powrprof.dll,SetSuspendState", "0,1,0"])
    else:
        speak("Sleep function not supported on this OS")    

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







'''import re
import webbrowser
import sqlite3
import pywhatkit as kit
import playsound
from engine.command import speak
import eel
import os
import webbrowser
# expose means access the function in the js file
@eel.expose
def playAssistantSound ():
    
    music_dir="D:\\LIVA AI\\www\\assets\\audio\\Windows Error.wav"
    
    playsound.playsound(music_dir)
    
    
@eel.expose
def opencommand(query):

    import webbrowser
    import os
    import re

    # -------------------- CLEAN QUERY --------------------
    query = query.lower()
    query = re.sub(r"\b(open|launch|start)\b", "", query).strip()

    if not query:
        speak("What should I open?")
        return

    eel.DisplayMessage(f"Liva: Opening {query}")
    speak(f"Opening {query}")

    # -------------------- 1. LOCAL APPS --------------------
    apps = {
        "chrome": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "vs code": "C:\\Users\\shaik\\OneDrive\\Desktop\\Microsoft VS Code\\Code.exe",
        "notepad": "notepad",
        "calculator": "calc",
        "cmd": "cmd",
        "explorer": "explorer",
        "file explorer": "explorer",
        "settings": "ms-settings:"
    }

    for app in apps:
        if app in query:
            try:
                os.startfile(apps[app])
                return
            except Exception as e:
                speak("App path not found")
                print("ERROR:", e)
                return

    # -------------------- 2. WEBSITES --------------------
    websites = {
        "youtube": "https://www.youtube.com",
        "google": "https://www.google.com",
        "github": "https://github.com",
        "gmail": "https://mail.google.com",
        "facebook": "https://facebook.com",
        "instagram": "https://instagram.com"
    }

   # ---------------- YOUTUBE PLAY ---------------- #
@eel.expose
def Playyoutube(query):

    query = query.replace("play", "").replace("on youtube", "").strip()

    if not query:
        speak("What should I play?")
        return

    speak(f"Playing {query} on YouTube")
    kit.playonyt(query)


# ---------------- GOOGLE SEARCH ---------------- #
@eel.expose
def googlesearch(query):

    query = query.replace("search", "").replace("on google", "").strip()

    if not query:
        speak("What should I search?")
        return

    speak(f"Searching {query} on Google")
    webbrowser.open(f"https://www.google.com/search?q={query}")


# ---------------- MUSIC ---------------- #
@eel.expose
def youtubeplaymusic(query):

    speak("Playing music")
    kit.playonyt("latest songs")
'''







   
   
   
   
   
   
   
   
   