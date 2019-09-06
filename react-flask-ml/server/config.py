# config.py

# Enable Flask's debugging features. Should be False in production
# DEBUG = True


class Config(object):
    DEBUG = True
    DEVELOPMENT = True
    SECRET_KEY = 'do-i-really-need-this'
    FLASK_HTPASSWD_PATH = '/secret/.htpasswd'
    FLASK_SECRET = SECRET_KEY
    DB_HOST = 'database' # a docker link
    DATASET_FILEPATH ='app/ml_model/dataset/iris.data'

class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    DB_HOST = 'my.production.database' # not a docker link