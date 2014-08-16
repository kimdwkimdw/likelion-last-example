from flask import Flask

app = Flask('application')
app.config.from_object('application.settings.Production')


import urls
