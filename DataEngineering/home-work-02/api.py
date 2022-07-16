import os
from flask import Flask, request, Response, jsonify
from functools import wraps
import json


# Custom error handler. Raise this exception
# to return a status_code, message, and body
class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


print(__name__)

app = Flask(__name__)

# set the default error handler
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


if __name__ == '__main__':
    app.run(debug=True)

# dummy users
USERS = [
    {'id': 0, 'first': 'Joe', 'last': 'Bloggs',
        'email': 'joe@bloggs.com', 'role': 'student', 'active': True},
    {'id': 1, 'first': 'Ben', 'last': 'Bitdiddle',
        'email': 'ben@cuny.edu', 'role': 'student', 'active': True},
    {'id': 2, 'first': 'Alissa P', 'last': 'Hacker',
        'email': 'missalissa@cuny.edu', 'role': 'professor', 'active': True},
]

# Your code here...
# E.g.,
# @app.route("/users", methods=["GET"])

# Problem 1
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(USERS)


# Problem 2
@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    
    selected_user = None
    for user in USERS:
        if user['id'] == id:
            selected_user = user
            break
    if selected_user == None:
        raise InvalidUsage("user not found" , 404)
    else:
        return jsonify(selected_user)

# Problem 3
@app.route("/users", methods=["POST"])
def create_user():
    if request.headers['Content-Type'] == 'application/json':
        pdata = request.get_json()
        first = pdata.get('first')
        last = pdata.get('last')
        email = pdata.get('email')
        
        if first == None or last == None or email == None:
            raise InvalidUsage("nprocessable Entity", 422)
            
        
        # defult role is student
        if pdata.get('role') is None:
            pdata['role'] = 'Student'
            
        if pdata.get('active') is None:
            pdata['active'] = False
            
        maxId =  max(USERS,key=lambda item:item['id'])['id']
      
        pdata['id'] = maxId+1;
        USERS.append(pdata);
        
        response = jsonify(pdata)
        response.status_code = 201
        return response
    
    else:
        raise InvalidUsage("Unsupported Media Type", 415)


# Problem 4

@app.route("/users/<int:id>", methods=["PATCH", "PUT"])
def updated_user(id):
    if request.headers['Content-Type'] == 'application/json':
        selected_user = None
        for user in USERS:
            if user['id'] == id:
                selected_user = user
                break
        if selected_user == None:
            raise InvalidUsage("user not found" , 404)
            
        pdata = request.get_json() 
        if pdata.get('first') != None:
            selected_user['first'] = pdata.get('first')
        if pdata.get('last') != None:
            selected_user['last'] = pdata.get('last') 
        if pdata.get('email') != None:
            selected_user['email'] = pdata.get('email') 
        if pdata.get('role') != None:
            selected_user['role'] = pdata.get('role')     
        if pdata.get('active') != None:
            selected_user['active'] = pdata.get('active')   
        
        response = jsonify(selected_user)
        response.status_code = 200
        return response
    else:
        raise InvalidUsage("Unsupported Media Type", 415)
        

# Problem 5
@app.route("/users/<int:id>/deactivate", methods=["POST"])
def delete_user(id):
    selected_user = None
    for user in USERS:
        if user['id'] == id:
            selected_user = user
            break
        if selected_user == None:
            raise InvalidUsage("user not found" , 404)
            
    selected_user['active'] = False;
    
    response = jsonify(selected_user)
    response.status_code = 200
    return response