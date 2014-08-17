from secret_keys import SESSION_KEY
from user_info import ADMIN_EMAIL, ADMIN_DB_URI


class Config(object):
    SECRET_KEY = SESSION_KEY


class Production(Config):
    DEBUG = False
    CSRF_ENABLED = False
    ADMIN = ADMIN_EMAIL
    SQLALCHEMY_DATABASE_URI = ADMIN_DB_URI
    migration_directory = 'migrations'
