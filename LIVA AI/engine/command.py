import pyttsx3
import speech_recognition as sr
import eel
from datetime import datetime

from engine.feature import (
    opencommand,
    Playyoutube,
    googlesearch,
    youtubeplaymusic,
    createimage,
    sleep_computer,
    chatbot
)

# ------------------- SPEAK FUNCTION -------------------
import asyncio
import edge_tts
import os
import uuid
import eel
from playsound import playsound

VOICE = "en-IN-NeerjaNeural"  # 🔥 Indian Female Natural Voice

async def generate_voice(text, filename):
    communicate = edge_tts.Communicate(text=text, voice=VOICE)
    await communicate.save(filename)

@eel.expose
def speak(text):
    try:
        eel.DisplayMessage(text)
    except:
        pass

    print("Assistant:", text)

    try:
        filename = f"voice_{uuid.uuid4()}.mp3"

        # 🔥 Generate voice
        asyncio.run(generate_voice(text, filename))

        # 🔊 Play sound
        playsound(filename)

        # 🧹 Clean file
        os.remove(filename)

    except Exception as e:
        print("Voice Error:", e)


@eel.expose
def keyboard_input(text):
    query = text.lower()
    return query
    pressed_keys = []  # List to store pressed keys
    while True:
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                pressed_keys.append(event.unicode)  # Add pressed key to the list
                if event.key == pygame.K_RETURN:  # Check for Enter key
                    query = ''.join(pressed_keys[:-1])  # Combine keys into a string, excluding Enter
                    return query.lower()  # Return the query in lowercase
                


@eel.expose
def takeCommand():
    r = sr.Recognizer()  # recognizer object

    try:
        with sr.Microphone() as source:
            speak("Listening...")
            print("Listening...")
            eel.DisplayMessage("Listening...")
            r.pause_threshold = 1
            r.adjust_for_ambient_noise(source, duration=1)

            audio = r.listen(source, timeout=10, phrase_time_limit=6)

        speak("Recognizing...")
        print("Recognizing...")
        eel.DisplayMessage("Recognizing...")
        query = r.recognize_google(audio, language='en-in') 
        print(f"User said: {query}\n")
        eel.DisplayMessage(f"User said: {query}")
        return query.lower()
    
    except sr.WaitTimeoutError:
        speak("No speech detected. Please try again.")
        return ""
    except sr.UnknownValueError:
        speak("Sorry, I could not understand the audio.")
        return ""
    except sr.RequestError as e:
        speak("Internet error please cheak your connection.")
        print(f"Error: {e}")
        return ""
    except Exception as e:
        print(f"Unexpected error: {e}")
        return ""
    

# ------------------- INITIALIZE EEL -------------------
eel.init("www")


# ------------------- MAIN COMMAND FUNCTION -------------------
@eel.expose
def allcommands(text=None):

    # Choose input method
    if text:
        query = text.lower()
    else:
        query = takeCommand()

    if query == "":
        speak("I didn't hear anything.")
        eel.showHood()
        return

    print(f"Processing: {query}")

    # ---------------- COMMANDS ----------------

    if "open" in query:
        speak(f"Opening {query}")
        opencommand(query)

    elif "youtube" in query:
        speak(f"Playing {query} on YouTube")
        Playyoutube(query)

    elif "create image" in query or "generate image" in query:
        speak(f"Creating image for {query}")
        createimage(query)

    elif "hello" in query or "hi" in query:
        speak(f"Hello! How can I help you? {query}")
        chatbot(query)

    elif "how are you" in query:
        speak(f"I'm doing well. How can I help you? {query}")
        chatbot(query)

    elif "Assistant name " in query:
        speak(f"I am Liva, your personal AI assistant. {query}")
        chatbot(query)

    elif "today date" in query or "time" in query:
        now = datetime.now()

        date_str = now.strftime("%B %d, %Y")
        time_str = now.strftime("%I:%M %p")

        speak(f"Today's date is {date_str} and the current time is {time_str}.")
        chatbot(query)

    elif "search" in query:
        speak(f"Searching {query} on Google")
        googlesearch(query)

    elif "play music" in query or "play song" in query:
        speak("Playing music")
        youtubeplaymusic(query)

    elif "sleep computer" in query:
        speak("sir aaop ka pc sone wala hain byy")
        sleep_computer()

    else:
        speak("Sorry, I didn't understand that command.")
        print("Command not recognized")

    eel.showHood()

