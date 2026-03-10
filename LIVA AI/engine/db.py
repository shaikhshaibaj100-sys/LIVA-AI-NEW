import sqlite3  

conn=sqlite3.connect('Liva.db')

cursor=conn.cursor()

query="CREATE TABLE IF NOT EXISTS sys_command(id integer  primary key,name varchar(100),path varchar(1000))"  

cursor.execute(query)


query="INSERT INTO sys_command VALUES(null,'','')"
cursor.execute(query)
conn.commit()