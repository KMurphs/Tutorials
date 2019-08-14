# views.py

from flask import render_template

from app import app
from app.views import views

@app.route('/')
def index():
    return views.index()


@app.route('/about')
def about():
    return views.about()