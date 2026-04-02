
import pyttsx3
import speech_recognition as sr
import eel
import time
from engine.feature import opencommand, Playyoutube, googlesearch, youtubeplaymusic

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