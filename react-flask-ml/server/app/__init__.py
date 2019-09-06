# app/__init__.py

from flask import Flask
import os

static_folder = 'static\\react-app\\build'
if 'APP_STATIC_FOLDER' in os.environ:
	static_folder = os.environ['APP_STATIC_FOLDER']

# Initialize the app
app = Flask(__name__, instance_relative_config=True, static_folder=static_folder)
# app = Flask(__name__, instance_relative_config=True)

# Load the config file
app.config.from_object('config.Config')
# app.config.from_object('config.ProductionConfig')

# Load the views
from app import controller
controller.init();


