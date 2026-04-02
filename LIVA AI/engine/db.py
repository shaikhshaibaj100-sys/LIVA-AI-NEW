import sqlite3

conn = sqlite3.connect("Liva.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS commands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    path TEXT
)
""")

# Insert data
data = [
    ("youtube", "website", "https://www.youtube.com"),
    ("google", "website", "https://www.google.com"),
    ("github", "website", "https://github.com"),
    ("gmail", "website", "https://mail.google.com"),
    ("college", "website", "https://www.shrisaibabacollege.com"),

    ("chrome", "app", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"),
    ("vs code", "app", "C:\\Users\\MR.SHAIBAJ SHAIKH\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"),
    ("notepad", "app", "notepad"),
    ("calculator", "app", "calc"),
]

cursor.executemany("INSERT INTO commands (name, type, path) VALUES (?, ?, ?)", data)

conn.commit()
conn.close()






























'''import sqlite3  

conn=sqlite3.connect('Liva.db')

cursor=conn.cursor()

query="CREATE TABLE IF NOT EXISTS sys_command(id integer  primary key,name varchar(100),path varchar(1000))"  

cursor.execute(query)


query="INSERT INTO sys_command VALUES(null,'','')"
cursor.execute(query)
conn.commit()'''

'''import sqlite3  

conn = sqlite3.connect('Liva.db')
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS sys_command(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    path TEXT
)
""")

# Insert real data
cursor.execute(
    "INSERT INTO sys_command (name, path) VALUES (?, ?)",
    ("chrome", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
)

cursor.execute(
    "INSERT INTO sys_command (name, path) VALUES (?, ?)",
    ("notepad", "notepad.exe")
)

cursor.execute(
    "INSERT INTO sys_command (name, path) VALUES (?, ?)",
    ("youtube", "C:\Users\shaik\OneDrive\Desktop")
)
conn.commit()
conn.close()'''


