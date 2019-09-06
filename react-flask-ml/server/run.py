# run.py

from app import app

if __name__ == '__main__':
	if(app.config['DEBUG']):
		app.run()
	else:
		app.run(use_reloader=True, threaded=True)