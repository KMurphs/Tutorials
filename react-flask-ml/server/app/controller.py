# views.py

from app import app
from app.views import views
from app.ml_model import model
from flask import request, send_from_directory
import numpy as np
import os
import re

def init():
	# print(app.config)
	# print(app.config['DATASET_FILEPATH'])
	model.train()


# # https://flask.palletsprojects.com/en/1.1.x/api/#flask.Request
# # request.args is to get urls arguments  GET
# # request.form to get form parameter POST
# @app.route('/')
# def index():
# 	print(train.hello())
# 	return views.index()


@app.route('/api/predict', methods = ['POST'])
def api_predict():
	
	# data = request.get_json(force=True)
	# print(data)
	# print(data['foo'])

	data_format = request.args['format']
	if(data_format == 'csv'):
		print("in csv")
		# print(request.get_data())
		# print(request.values)
		# print(request.form)
		# print(request.files)

		# print(type(request.get_data()))
		# print(repr(request.get_data().decode("utf-8")))
		data = request.get_data().decode("utf-8").split('\r\n')
		data = [item.split(',') for item in data]
		# print(data)
		data = np.asarray(data, dtype=np.float32)
		pred = model.predict(data)
		# predictions = data.tolist();
		# print(predictions)
		# predictions[:,-1] = pred
		# predictions = ["{} is predicted to represent '{}'".format(data[i,:], pred[i]) for i in range(pred.shape[0]) ]
		predictions = [{
			'inputs': data[i,:].tolist(),
			'prediction': pred[i]
		} for i in range(pred.shape[0]) ]
		# print(predictions)
		# predictions = '\n'.join(predictions)
	else:
		print("in default")

	return {'predictions': predictions}
	# return predictions


@app.route('/data/predict', methods = ['POST'])
def form_predict():
	print(request.form.get('foo'))

	return views.about()


@app.route('/about')
def about():
	return views.about()




# Serve React App
@app.route('/', defaults={'path': ''}, methods = ['GET'])
@app.route('/<path:path>', methods = ['GET'])
def serve(path):
	# print('\n')
	# print(path)
	# print(app.static_folder + path)
	# print(app.static_folder) # C:\PersonalProjects\Tutorials\react-flask-ml\server\app\static\react-app\build
	


	if path != "" and os.path.exists(app.static_folder + path):
		response = send_from_directory(app.static_folder, path)
	else:
		response = send_from_directory(app.static_folder, 'index.html')
	
	# x = re.search(".jpg$", path)
	# if (x):
	# 	print("YES! We have a match!")
	# 	response.headers['Content-Type'] = 'image/jpeg'
	# else:
	# 	print("No match")

	# response.headers['Content-Type'] = 'text/html; charset=utf-8'
	
	return response