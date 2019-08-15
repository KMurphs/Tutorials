# [A Simple Predictive App using React for User Interface and Flask and python for the server backend](https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33)



## [The Server](https://scotch.io/tutorials/getting-started-with-flask-a-python-microframework)

### Setting Up

Ensure that python is installed and note the version installed
```
λ python
Python 3.7.3 (default, Mar 27 2019, 17:13:21) [MSC v.1915 64 bit (AMD64)] :: Anaconda, Inc. on win32

Warning:
This Python interpreter is in a conda environment, but the environment has
not been activated.  Libraries may fail to load.  To activate this environment
please see https://conda.io/activation

Type "help", "copyright", "credits" or "license" for more information.
>>>
```
Version is ``3.7.3`` and is installed globally.


In due time, the server will be moved to a docker container. But for now, we will set up the server locally.
> We'll start by installing virtualenv, a tool to create isolated Python environments. We need to use virtual environments to keep the dependencies used by different Python projects separate, and to keep our global site-packages directory clean. We'll go one step further and install virtualenvwrapper, a set of extensions that make using virtualenv a whole lot easier by providing simpler commands.

```
$ pip install virtualenv
$ pip install virtualenvwrapper 
```
However, on windows, the last command must be replaced with ``pip install virtualenvwrapper-win``. From thereon,
```
cd server
mkvirtualenv react-flask-ml-server
workon react-flask-ml-server
```
We have created a virtual env ``react-flask-ml-server``, we have activated it and are using it.
View the current virtual env with ``pip -V``

Now, let's install flask
```
$ pip install Flask
```
The following command prints out the dependencies installed with flask.
```
$ pip freeze > requirements.txt
Click==7.0
Flask==1.1.1
itsdangerous==1.1.0
Jinja2==2.10.1
MarkupSafe==1.1.1
Werkzeug==0.15.5
```

> What do all these packages do? 
> Flask uses Click (Command Line Interface Creation Kit) for its command-line interface, which allows you to add custom shell commands for your app. 
> ItsDangerous provides security when sending data using cryptographical signing. 
> Jinja2 is a powerful template engine for Python.
> MarkupSafe is a HTML string handling library. 
> Werkzeug is a utility library for WSGI, a protocol that ensures web apps and web servers can communicate effectively.


### server.py

```
echo #Hello World  > server.py
sublime server.py
```

> We use the __name__ argument to indicate the app's module or package, so that Flask knows where to find other files such as templates. 


### Running the server
```
# $ export FLASK_APP=server.py
$ set FLASK_APP=server.py
$ flask run
 * Serving Flask app "server.py"
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
A visit at http://127.0.0.1:5000/ yield the hello world from the server.py

### General Repo setup 

```
mkdir app app\templates app\static
```
> Most Flask apps have the following basic file structure:

> run.py: This is the application's entry point. We'll run this file to start the Flask server and launch our application.
> config.py: This file contains the configuration variables for your app, such as database details.
> app/__init__.py: This file intializes a Python module. Without it, Python will not recognize the app directory as a module.
> app/views.py: This file contains all the routes for our application. This will tell Flask what to display on which path.
> app/models.py: This is where the models are defined. A model is a representation of a database table in code. However, because we will not be using a database in this tutorial, we won't be needing this file.

```
echo >> run.py
echo >> config.py
echo >> app/__init__.py
echo >> app/views.py
echo >> app/templates/base.html
echo >> app/templates/index.html
echo >> app/templates/about.html
```
and 
```
rm server.py
```

#### config.py
```
# config.py

# Enable Flask's debugging features. Should be False in production
DEBUG = True
```
> Note that this config file is very simplified and would not be appropriate for a more complex application. For bigger applications, you may choose to have different config.py files for testing, development, and production, and put them in a config directory, making use of classes and inheritance. You may have some variables that should not be publicly shared, such as passwords and secret keys. These can be put in an instance/config.py file, which should not be pushed to version control.

#### app/__init__.py
```
# app/__init__.py

from flask import Flask

# Initialize the app
app = Flask(__name__, instance_relative_config=True)

# Load the views
from app import views

# Load the config file
app.config.from_object('config')
```
> Next, we have to initialize our app with all our configurations. This is done in the app/__init__.py file. Note that if we set instance_relative_config to True, we can use app.config.from_object('config') to load the config.py file.

#### run.py
```
# run.py

from app import app

if __name__ == '__main__':
    app.run()
```


#### views.py
The first ``server.py`` was already an informal view file.
```
# views.py

from flask import render_template

from app import app

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/about')
def about():
    return render_template("about.html")
```
This file references templates that do not exists yet

#### base.html
```
<!-- base.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{% block title %}{% endblock %}</title>
    <!-- Bootstrap core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="https://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation"><a href="/">Home</a></li>
            <li role="presentation"><a href="/about">About</a></li>
            <li role="presentation"><a href="http://flask.pocoo.org" target="_blank">More About Flask</a></li>
          </ul>
        </nav>
      </div>
      {% block body %}
      {% endblock %}
      <footer class="footer">
        <p>© 2016 Your Name Here</p>
      </footer>
    </div> <!-- /container -->
  </body>
</html>
```

#### index.html
```
<!-- index.html-->

{% extends "base.html" %}
{% block title %}Home{% endblock %}
{% block body %}
<div class="jumbotron">
  <h1>Flask Is Awesome</h1>
  <p class="lead">And I'm glad to be learning so much about it!</p>
</div>
{% endblock %}
```

#### Running the new app
```
# $ export FLASK_APP=run.py
$ set FLASK_APP=run.py
$ flask run
 * Serving Flask app "server.py"
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Note that the templates folder must be situated as in 
```
|-- server (the project)
	|--	run.py
	|--	app  
		|-- templates	
				|-- base.html
				|-- index.html
```

#### Restarting Server on Change
```
$ export FLASK_APP=main.py
$ export FLASK_DEBUG=1
$ python -m flask run
```

curl -X POST http://127.0.0.1:5000/data/predict -d {\"foo\":\"bar\"}