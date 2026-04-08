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
    shutdown_computer,
    sleep_computer,
    chatbot
)

# ------------------- SPEAK FUNCTION -------------------
@eel.expose
def speak(text):
    engine = pyttsx3.init('sapi5')  # using Microsoft Speech API
    voices = engine.getProperty('voices')  # getting available voices
    if len(voices) > 1:
        engine.setProperty('voice', voices[1].id)  # female voice
    engine.setProperty('rate', 190)  # speech speed
    
    eel.DisplayMessage(text)
    engine.say(text)
    engine.runAndWait()

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
        query = r.recognize_google(audio, language='en-in,hi-in')
        speak("processing command...")
        print("processing command...")
        eel.DisplayMessage("processing command...")
        
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

    elif "what is your name" in query:
        speak(f"I am Liva, your personal AI assistant. {query}")
        chatbot(query)

    elif "today date" in query or "time" in query:
        now = datetime.now()

        date_str = now.strftime("%B %d, %Y")
        time_str = now.strftime("%I:%M %p")

        speak(f"Today's date is {date_str} and the current time is {time_str}.")
        chatbot(query)

    elif "who is" in query or "what is" in query:
        speak(f"Searching for {query}")
        googlesearch(query)

    elif "search" in query:
        speak(f"Searching {query} on Google")
        googlesearch(query)

    elif "play music" in query or "play song" in query:
        speak("Playing music")
        youtubeplaymusic(query)

    elif "shutdown" in query:
        speak("Shutting down computer")
        shutdown_computer(query)

    elif "sleep computer" in query:
        speak("Putting computer to sleep")
        sleep_computer(query)

    else:
        speak("Sorry, I didn't understand that command.")
        print("Command not recognized")

    eel.showHood()



























'''import pyttsx3
import speech_recognition as sr
import eel
import time
from engine.feature import opencommand, Playyoutube, googlesearch, youtubeplaymusic, createimage, shutdown_computer, sleep_computer, chatbot
  
    
@eel.expose
def speak(text):
    engine = pyttsx3.init('sapi5')  # using Microsoft Speech API
    voices = engine.getProperty('voices')  # getting available voices
    if len(voices) > 1:
        engine.setProperty('voice', voices[1].id)  # female voice
    engine.setProperty('rate', 190)  # speech speed
    
    eel.DisplayMessage(text)
    engine.say(text)
    engine.runAndWait()

@eel.expose
def keyboard_input(text):
    query = text.lower()
    return query
    pressed_keys = []  # List to store pressed keys
    while True:
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                pressed_keys.append(event.key)  # Add pressed key to the list
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
        query = r.recognize_google(audio, language='en-in,hi-in')
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
        speak("Speech recognition service error.")
        print(f"Error: {e}")
        return ""
    except Exception as e:
        print(f"Unexpected error: {e}")
        return ""

eel.init("www")  # your frontend folder

@eel.expose
def allcommands():
    
    if keyboard_input:
        query = keyboard_input()
    else :
        query = takeCommand()     
    
    if query == "":
        speak("I didn't hear anything. Please try again.")
        eel.showHood()
        return
    
    print(f"Processing command: {query}")
    
    # Fix the logic - proper if-elif chain
    if "open" in query:
        try:
            from engine.feature import opencommand
            speak(f"Opening {query}")
            opencommand(query)
        except ImportError:
            speak("Open command feature not available")
    
    elif "on youtube" in query or "youtube" in query:
        try:
            from engine.feature import Playyoutube
            speak(f"Playing {query} on youtube")
            Playyoutube(query)
        except ImportError:
            speak("YouTube feature not available")
    
    elif "create image "in query or "generate image" in query:
        try:
            from engine.feature import createimage
            speak(f"Creating image for {query}")
            googlesearch(query)
        except ImportError:
            speak("Image creation feature not available")
    
    elif "hii" in query or "hello" in query:
        
        try:
            
        
            from engine.feature import chatbot
            speak("Hello! How can I help you today?")
            chatbot(query)
        
        except ImportError:
            speak("not recognized clearly")
    
    elif "how are you" in query:
        try:
            from engine.feature import chatbot
            speak("I'm doing well, thank you! How can I help you today?")
            chatbot(query)

        except ImportError:
            speak("not recognized clearly")
        
    
    elif "what is your name" in query:
        
        from engine.feature import chatbot
    try:
        
        
        speak("I am Liva, your personal AI assistant. How can I help you today?")
        chatbot(query)
       
    except ImportError:
        speak("not recognize clearly ")     
     
        
    elif  "today date" in query or "time " in query:
        from engine.feature import chatbot
        try:
            
            import strftime
            date_str = strftime("%B %d, %Y")
            time_str = strftime("%I:%M %p")
            speak(f"Today's date is {date_str} and the current time is {time_str}.")
            chatbot(query)
            
        except ImportError:
            
            
            speak("not recognized clearly") 
               
        
    elif "what is " in query or "who is " in query:
        try:
            from engine.feature import googlesearch
            speak(f"Searching for {query}")
            googlesearch(query)
        except ImportError:
            speak("Search feature not available")
            
    elif "history" in query:
        try:
            from engine.feature import googlesearch
            speak("Showing command history"+query)
            googlesearch(query)  # Placeholder for actual history function
        except ImportError:
            speak("History feature not available")        
        
              
    
    elif "google search" in query or "search" in query:
        try:
            from engine.feature import googlesearch
            speak(f"Searching {query} on google")
            googlesearch(query)  # Fixed: call the function with query
        except ImportError:
            speak("Google search feature not available")
    
    elif "play song" in query or "play music" in query:
        try:
            from engine.feature import youtubeplaymusic 
            speak("Playing song")
            youtubeplaymusic(query)    
        except ImportError:
            speak("Music feature not available")
    
    elif "shotdown asus" in query:
        from engine.feature import shutdown_computer
        speak("Shutting down computer")
        shutdown_computer(query)
    
    elif "sleep computer" in query:
        from engine.feature import sleep_computer  
        speak("Putting computer to sleep")
        sleep_computer(query)
    
    else:
        speak("Sorry, I didn't understand that command.")
        print("Command not recognized")
    
    eel.showHood()

# Start Eel app
#if __name__ == "__main__":
 #   eel.start('index.html', size=(1000, 700))



'''












'''import pyttsx3
import speech_recognition as sr
import eel
import time
import engine.feature

@eel.expose
def speak(text):
    engine = pyttsx3.init('sapi5')  # using Microsoft Speech API
    voices = engine.getProperty('voices')  # getting available voices
    engine.setProperty('voice', voices[1].id)  # female voice
    engine.setProperty('rate', 190)  # speech speed
    
    eel.DisplayMessage(text)
    engine.say(text)
    engine.runAndWait()
    
@eel.expose
def takeCommand():

    r = sr.Recognizer()  # recognizer object

    with sr.Microphone() as source:
        speak("Listening...")
        print("Listening...")
        eel.DisplayMessage("Listening...")
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source)

        audio = r.listen(source, timeout=10, phrase_time_limit=6)

    try:
        speak("Recognizing...")
        print("Recognizing...")
        eel.DisplayMessage("Recognizing...")
        query = r.recognize_google(audio, language='en-in',)
        print(f"User said: {query}\n")
        speak(query)    
        eel.DisplayMessage(f"User said: {query}\n")

    except Exception as e:

        return ""

    return query.lower()


eel.init("www")  # your frontend folder

@eel.expose
def allcommands():
    query = takeCommand()
    eel.startAssistant()()
    
    if query != "": 
    
    elif "open" in query:
        
        from engine.feature import opencommand
        speak("Opening..."+query)
        opencommand(query)
       
    elif "on Youtube" in query:
        
        from engine.feature import Playyoutube
        speak("Playing "+query+" on youtube")
        Playyoutube(query)
        
    elif "on googlesearch"in query:
        
        from engine.feature import googlesearch
        speak("Searching "+query+" on google")
        (query)
        
    elif  "play song" in query:
        from engine.feature import youtubeplaymusic 
        speak("Playing song")

        youtubeplaymusic(query)    
            
        
    else:
        
        speak("Sorry, I didn't understand that command.")# Add your logic to handle unrecognized commands here
        print("Command not recognized")# Add your logic to handle unrecognized commands here

    eel.showHood()










#text = takeCommand()

#speak("Hello, I am LIVA, your personal assistant. How can I help you today?")'''