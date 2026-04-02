import eel
import webbrowser
import time
import threading
import os

# ✅ Direct imports - NO __init__.py needed!
from engine.command import speak, takeCommand, allcommands
from engine.feature import (
    playAssistantSound, opencommand, Playyoutube,
    googlesearch, youtubeplaymusic
)

print("🚀 Liva AI Assistant - Direct imports")

eel.init('www') 

# Startup
try:
    playAssistantSound()
    print("✅ Startup OK")
except:
    print("⚠️ No sound file")


'''
os.system("start http://localhost:8000/index.html")


eel.start('index.html', mode=None,host='localhost',block=True)
'''
# Auto-open browser
def open_browser():
    time.sleep(2)
   # webbrowser.open('http://localhost:8000')
    

threading.Thread(target=open_browser, daemon=True).start()

#Start server
print("🌐 http://localhost:8000")
eel.start('index.html', size=(1200, 800), port=8000)








'''import os #to run the web app in the default browser
import eel #connect the backend to the frontend

from engine.feature import * #to play the assistant sound when the program starts, you can replace it with your own sound file and path
from engine.command import * #to take command from the user and speak the response, you can replace it with your own functions and logic


eel.init('www')

playAssistantSound()

os.system("start http://localhost:8000/index.html")


eel.start('index.html', mode=None,host='localhost',block=True)'''
      

  
