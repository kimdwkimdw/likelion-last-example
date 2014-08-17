from application import db


class User(db.Model):
    nickname = db.Column(db.String(255), primary_key=True)
    password = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=db.func.now())
