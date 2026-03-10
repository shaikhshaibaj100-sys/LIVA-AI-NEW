import playsound as playsound
import os
import eel
import re
from engine.config import AssistantName
from engine.command import speak 
import pywhatkit as kit

# expose means access the function in the js file
@eel.expose
def playAssistantSound ():
    
    music_dir="D:\\LIVA AI\\www\\assets\\audio\\Windows Error.wav"
    
    playsound.playsound(music_dir)
    
def opencommand():
    query = query.replace(AssistantName,"")
    query = query.replace("open","")
    query.lower()
    
    if query!="":
        speak("Opening..."+query)
        os.system("start>>>"+query)
      
    else:
        speak("application not found !!!") 
        
def Playyoutube():
    search_term=extract_yt_search_term(query)#you can replace this with your own function to extract the search term from the query
    speak("Playing "+search_term+" on youtube")#you can replace this with your own function to speak the response
    kit.playonyt(search_term)               
    
    
def extract_yt_search_term(query):
    
    pattern=r"play\s+(*?)\s+on\s+youtube"#you can replace this with your own regex pattern to extract the search term from the query
    
    match=re.search(pattern,command,re.IGNORECASE)#you can replace this with your own regex pattern to extract the search term from the query
    return match.group(1) if match else None #you can replace this with your own logic to extract the search term from the query

    
        