# -*- coding: utf-8 -*-
from pusher import Pusher
from application import app, db
from flask import request, jsonify, session, g
from user_info import PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET
from werkzeug.security import generate_password_hash, \
    check_password_hash
from models import (
    User
)
from functools import wraps

p = Pusher(
    app_id=PUSHER_APP_ID,
    key=PUSHER_KEY,
    secret=PUSHER_SECRET,
)


@app.route('/api/echo', methods=["GET", "POST"])
def test_message():
    data = request.form
    p['test_channel'].trigger('echo', {'message': data['message']})
    return jsonify({"status": 0})


def emit(action, data, broadcast=False):
    if broadcast:
        p['br'].trigger(action, data)
    else:
        p['private'].trigger(action, data)


@app.route('/api/start', methods=["POST"])
def api_start():
    data = request.form
    username = data['username']
    user_id = data['user_id']

    session['username'] = username
    session['user_id'] = user_id

    emit('user_joined', {
        'username': username,
    }, broadcast=True)

    return jsonify({
        'status': 0,
    })


@app.route('/api/call/<action_name>', methods=["POST"])
def api_call(action_name):
    data = request.form

    if action_name == "new_message":
        emit_new_message(data)
    elif action_name == "typing":
        emit_typing()
    elif action_name == "stop_typing":
        emit_stop_typing()

    return jsonify({"status": 0})


def emit_new_message(data):
    emit('new_message', {
        'message': data['message'],
        'username': data['username'],
    }, broadcast=True)


def emit_typing():
    emit('typing', {
        'username': session['username'],
        'user_id': session['user_id'],
    }, broadcast=True)


def emit_stop_typing():
    emit('stop_typing', {
        'username': session['username'],
        'user_id': session['user_id'],
    }, broadcast=True)
