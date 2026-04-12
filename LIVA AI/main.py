
import eel
import webbrowser
import time
import threading
import os

# ✅ Direct imports - NO __init__.py needed!
from engine.command import speak, takeCommand, allcommands
from engine.feature import opencommand, playAssistantSound,Playyoutube,createimage,chatbot,googlesearch,youtubeplaymusic,get_system_info,sleep_computer,open_folder

print("🚀 Liva AI Assistant - Direct imports")

eel.init('www') # Initialize Eel with the 'www' folder for frontend files

# Startup
try:
    playAssistantSound()
    print("✅ Startup OK")
except:
    print("⚠️ No sound file")





# Auto-open browser
def open_browser():
    time.sleep(2)
   # webbrowser.open('http://localhost:8000')
    

threading.Thread(target=open_browser, daemon=True).start()

#Start server
print("🌐 http://localhost:8000")
eel.start('index.html', size=(1200, 800), port=8000)


