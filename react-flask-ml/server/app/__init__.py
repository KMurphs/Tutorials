# app/__init__.py

from flask import Flask

# Initialize the app
app = Flask(__name__, instance_relative_config=True, static_folder='static\\react-app\\build')
# app = Flask(__name__, instance_relative_config=True)

# Load the config file
app.config.from_object('config.Config')
# app.config.from_object('config.ProductionConfig')

# Load the views
from app import controller
controller.init();


