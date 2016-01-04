from flask import Flask, redirect, request, session, url_for, abort, render_template, send_from_directory

import os
import datetime

DEBUG = True
SECRET_KEY = 'dev'

app = Flask(__name__)
app.config.from_object(__name__)
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getdatetime')
def getdatetime():
    return datetime.datetime.utcnow().isoformat()

@app.route('/rsvp/<name>')
def rsvp(name):
    with open('rsvp.txt', 'a') as f:
        f.write(name + '\n')
    return 'Welcome aboard ' + name + '! Glad you can make it!'

@app.route('/slideshow')
def slideshow():
    return render_template('slideshow.html')

@app.route('/slideshow/getimages')
def getimages():
    return str(['static/images/NewYearsParty/' + f for f in os.listdir('/var/www/NewYearsParty/static/images/NewYearsParty')])

if __name__ == '__main__':
    app.run('0.0.0.0')
