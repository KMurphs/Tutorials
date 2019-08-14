#model.py

# Importing the libraries
from app import app
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder 
from sklearn.linear_model import LogisticRegression

classifier = LogisticRegression(random_state = 0, solver='lbfgs', multi_class='auto')
label_encoder_y = LabelEncoder()


def train():
	print('Training Machine Learning Model')

	# Reading Dataset
	# dataset = pd.read_csv(app.config['DATASET_FILEPATH'], names=['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species'])
	dataset = pd.read_csv(app.config['DATASET_FILEPATH'])

	# Splitting target and input variables
	X = dataset.iloc[:, :-1].values
	y = dataset.iloc[:,  -1].values
	classes = np.unique(y)

	# Encoding target variable as numeric	
	y = label_encoder_y.fit_transform(y)

	# Fit Regressor
	classifier.fit(X, y)
	
	print('Model Trained')


def predict(X_test):
	print('Predicting on input data')
	y_pred = classifier.predict(X_test)
	# return [classes[i] for i in y_pred]
	return label_encoder_y.inverse_transform(y_pred)