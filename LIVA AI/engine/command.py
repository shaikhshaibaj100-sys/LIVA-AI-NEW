import pyttsx3
import speech_recognition as sr
import eel
import time
    
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

    with sr.Microphone() as source:  # microphone input
        print("Listening...")
        eel.DisplayMessage("Listening...")
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source)

        audio = r.listen(source, timeout=10, phrase_time_limit=6)

    try:
        print("Recognizing...")
        eel.DisplayMessage("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")
        eel.DisplayMessage(f"User said: {query}\n")

    except Exception as e:

        return ""

    return query.lower()

@eel.expose
def allcommands():
    
    query=takeCommand()
    print(query)
    
    if "open" in query:
       from engine.feature import opencommand
       opencommand(query)
       
    elif "on Youtube":
        from engine.feature import Playyoutube
        Playyoutube(query)
        
    else:
        print("Command not recognized")# Add your logic to handle unrecognized commands here

    eel.showHood()










#text = takeCommand()

#speak("Hello, I am LIVA, your personal assistant. How can I help you today?")