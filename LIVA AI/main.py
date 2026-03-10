import os #to run the web app in the default browser
import eel #connect the backend to the frontend

from engine.feature import * #to play the assistant sound when the program starts, you can replace it with your own sound file and path
from engine.command import * #to take command from the user and speak the response, you can replace it with your own functions and logic

eel.init('www')

playAssistantSound()

os.system("start msedge.exe --app=http://localhost:8000/index.html")

eel.start('index.html', mode=None,host='localhost',block=True)
