# -*- coding: utf-8 -*-
"""
Created on Wed Aug 14 13:14:38 2019

@author: stephane.kibonge
"""

import pandas
import matplotlib.pyplot as plt

df = pandas.read_csv('dataset/iris.data', names=['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class'])
print(df)

# let's look for Nans and missing data: isnull return true for NaN
print(df.isnull().values.any()) # False
print(df.isnull().sum())

#let's print out the 3 classes
print(df['class'].unique()) # ['Iris-setosa' 'Iris-versicolor' 'Iris-virginica']

print(df.describe())

# correlation
plt.matshow(df.corr())
plt.show()
# or more beautifully
f = plt.figure()
plt.matshow(df.corr(), fignum=f.number)
plt.xticks(range(df.shape[1]), df.columns, fontsize=14, rotation=45)
plt.yticks(range(df.shape[1]), df.columns, fontsize=14)
cb = plt.colorbar()
cb.ax.tick_params(labelsize=14)
plt.title('Correlation Matrix', fontsize=16)


# Extracting X and Y then training and test data
X = df.iloc[:, :-1].values
y = df.iloc[:,  -1].values

# https://www.analyticsindiamag.com/7-types-classification-algorithms/
# Classification algorithms
#    Logistic Regression
#    Naive Bayes
#    Stochastic Gradient Descent
#    K-Nearest Neighbours
#    Decision Tree
#    Random Forest
#    Support Vectore Machine


# Logistic Regression
# from sklearn.linear_model import LogisticRegression
# lr = LogisticRegression()
# lr.fit(x_train, y_train)
# y_pred=lr.predict(x_test)