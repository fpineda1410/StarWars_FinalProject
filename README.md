# WebApp boilerplate with React JS
<h1>Procedimientos</h1>

<p>Para ponerlo a funcionar instalen sqlite3 de este link https://www.sqlite.org/2021/sqlite-tools-win32-x86-3350400.zip</p>

<p>Editen la variable de sistema como se dice aqui: https://www.youtube.com/watch?v=wXEZZ2JT3-k</p>

<p>Hacer un .env que tenga lo siguiente:</p>

<p>FLASK_APP_KEY="any key works"
FLASK_APP=src/app.py
FLASK_ENV=development</p>

<p>En la terminal de su editor lleguen al src (cd src), y sigan las siguientes instrucciones:</p>

<p>$sqlite3 test.db</p>

<p>Una vez hecha su base de datos, hacen pipenv run init, luego pipenv run migrate y luego pipenv run upgrade</p>

<p>Para disfrutar de manera local sin gitpod ejecutan pipenv run local_start</p>

<p>10de10 Felipe</p>