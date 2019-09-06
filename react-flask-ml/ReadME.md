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



#### Posting to the server

curl -X POST http://127.0.0.1:5000/data/predict -d {\"foo\":\"bar\"}
curl -d @test.data -X POST http://127.0.0.1:5000/api/predict?format=csv
in the client folder there is post man collection that can be used to submit requests to the server.




## [The ui](https://create-react-app.dev/docs/getting-started)

Setup with
```
npx create-react-app my-app
cd my-app
npm start
```
and ``npm run build`` when ready to deploy to production.

Since the ui is using xmlhttp request, one need to disable CORS policy on the browser being used. This is only for development purposes. 
Long term solution would be to have the back end send the correct CORS headers, or do the xmlhttp request against the original source url that served the page. 
But our backend isn't serving the page at the moment.


if one is using chrome, navigate the chrome installation folder ``C:\Program Files (x86)\Google\Chrome\Application``, get a cmd window at that folder and issue
```
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```
This will open a new window with CORS policy disabled. Use this window for all the testing and development until the ui is complete.
At this point, ``npm run build`` can be executed to generate build folder.


Also, note that one should have a look at the images and prepare them for production.
Using paint.net, that should involve, resizing the image with
```
Resampling:                       Best Quality
By absolute size:                 checked
Maintain aspect ratio:            checked
Pixel size width and height:      around 1200px
Resolution:                       72 pixels/inch
Print size width and height:      around 15inches
```
This will significantly reduce the size of the image.

Then save the image, with the settings:
```
Quality:              90%
Chroma Subsampling:   4:4:4(Best Quality)
```
The file size should go down to about 500kb



## Serving the app
At this point the ui can be served by our backend. Move the build folder generated for the ui at ``react-flask-ml\server\app\static\react-app``
Then configure the app, to serve the folder.

In the app folder, add the following lines to __init__.py
```
static_folder = 'static\\react-app\\build'
if 'APP_STATIC_FOLDER' in os.environ:
  static_folder = os.environ['APP_STATIC_FOLDER']

# Initialize the app
app = Flask(__name__, instance_relative_config=True, static_folder=static_folder)
```
The environment variable will be used in our container. For now, since it isn't set it will default to ``static\\react-app\\build`` from this folder (where __init__.py is located along with controller.py)

Then in order to serve all the index.html resources, add these lines at the end of controller.py
```
# Serve React App
@app.route('/', defaults={'path': ''}, methods = ['GET'])
@app.route('/<path:path>', methods = ['GET'])
def serve(path):

  # print(path)
  # print(app.static_folder) # C:\PersonalProjects\Tutorials\react-flask-ml\server\app\static\react-app\build - on windows

  if path != "" and os.path.exists(app.static_folder + path):
    response = send_from_directory(app.static_folder, path)
  else:
    response = send_from_directory(app.static_folder, 'index.html')
  
  return response
```
Note that in order to work properly, the files url in the index.html should start with "/".


Then, ``python run`` should properly serve the application.


## [Containerizing](https://medium.com/@smirnov.am/running-flask-in-production-with-docker-1932c88f14d0)

We will setup a nginx server (exposed to the outside world) and uwsig server as the python production server (instead of the native flask server).
For that, we setup a ``nginx.conf``, a ``uwsgi.ini`` and a ``start.sh`` file. The first two will setup the nginx and uwsgi servers. The last one will launch them when the container start.

A Dockerfile can be written, we set up the APP_STATIC_FOLDER environment variable (for linux now), install python utils, send the context, convert all the files in the context to linux end-of-line style, place the nginx.conf file where it's suppoed to be, install our python app requirements.txt, run our start.sh file at bootup.


From thereon,
```
docker build -t cloud.canister.io:5000/kmurphs/react-flask-ml -f Dockerfile .
docker run --name react-flask-ml --net testnetwork -p 60060:80 -t cloud.canister.io:5000/kmurphs/react-flask-ml
```

A visit at localhost:60060 should present our react-flask-ml app.