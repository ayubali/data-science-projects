import os
from flask import Flask, request, Response, jsonify
from functools import wraps
import json
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

print(__name__)
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
__db__ = SQLAlchemy(app)


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


# set the default error handler
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


# dummy users
USERS = [
    {'id': 1, 'first': 'Joe', 'last': 'Bloggs',
        'email': 'joe@bloggs.com', 'role': 'Student', 'active': 1},
    {'id': 2, 'first': 'Ben', 'last': 'Bitdiddle',
        'email': 'ben@cuny.edu', 'role': 'Student', 'active': 1},
    {'id': 3, 'first': 'Alissa P', 'last': 'Hacker',
        'email': 'missalissa@cuny.edu', 'role': 'Professor', 'active': 1},
]


def initFlask():

     # use in-memory database for debugging
    global  __db__
    engine = __db__.engine

    drop_table_statement = """drop table users"""
    # engine.execute(drop_table_statement)

    # create the users table
    # sql statement
    create_table_stmt = """create table users(
        id integer primary key,
        first text not null,
        last text not null,
        email text not null,
        role text default null,
        active integer default 0
        );
    """
    engine.execute(create_table_stmt)
    insert_statement = """
         insert into users(first, last, email, role, active)
         values(?, ?, ?, ?, ?)
         """
    for u in USERS:
        print(f"inserting {u}")
         # insert into db; note unpacking of tuple (*c)
        engine.execute(insert_statement, u['first'],  u['last'], u['email'],u['role'], u['active'])

    print('******* This is end of initialization *******')
    return


if __name__ == '__main__':
     app.run(debug=True)

initFlask()
     
# Your code here...
# E.g.,
# @app.route("/users", methods=["GET"])

# Problem 1
def convertToUserObject(row):
    user = dict(row)
    if user['active'] == 1:
        user['active'] = True
    else:
        user['active'] = False
    return user

@app.route("/users", methods=["GET"])
def get_users():
    global __db__
    engine = __db__.engine
    users = engine.execute('select * from users')
    selected_users = []
    for row in users:
        user = convertToUserObject(row)
        selected_users.append(user)
    return jsonify(selected_users)


# Problem 2
@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    global __db__
    engine = __db__.engine
    selected_user = engine.execute('select * from users where id  =  ?',id).fetchone()
    if selected_user == None:
        raise InvalidUsage("user not found" , 404)
    else:
        return jsonify(convertToUserObject(selected_user))

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

        global __db__
        engine = __db__.engine

        insert_statement = """
                 insert into users(first, last, email, role, active)
                 values(?, ?, ?, ?, ?) 
                 """

        result = engine.execute(insert_statement, pdata['first'], pdata['last'], pdata['email'], pdata['role'], pdata['active'])
        new_user = engine.execute('select * from users where id  =  ?',  result.lastrowid).fetchone()
        response = jsonify(convertToUserObject(new_user))
        response.status_code = 201
        return response
    
    else:
        raise InvalidUsage("Unsupported Media Type", 415)


# Problem 4
@app.route("/users/<int:id>", methods=["PATCH", "PUT"])
def updated_user(id):
    if request.headers['Content-Type'] == 'application/json':
        global __db__
        engine = __db__.engine

        selected_user = engine.execute('select * from users where id  =  ?', id).fetchone()
        if selected_user == None:
            raise InvalidUsage("user not found" , 404)
            
        pdata = request.get_json()
        selected_user = dict(selected_user)
        update_statement = """
        update users
        set first = ?, last=?, email=?, role=?, active=?
        where id = ?
        """
        if pdata.get('first') != None:
            selected_user['first'] = pdata.get('first')
        if pdata.get('last') != None:
            selected_user['last'] = pdata.get('last') 
        if pdata.get('email') != None:
            selected_user['email'] = pdata.get('email') 
        if pdata.get('role') != None:
            selected_user['role'] = pdata.get('role')     
        if pdata.get('role') != None:
            selected_user['active'] = pdata.get('active')

        result = engine.execute(update_statement, selected_user['first'], selected_user['last'], selected_user['email'],
                       selected_user['role'], selected_user['active'], selected_user['id'])

        updated_user = engine.execute('select * from users where id  =  ?', id).fetchone()
        response = jsonify(convertToUserObject(updated_user))
        response.status_code = 200
        return response
    else:
        raise InvalidUsage("Unsupported Media Type", 415)
        

# Problem 5
@app.route("/users/<int:id>/deactivate", methods=["POST"])
def delete_user(id):
    global __db__
    engine = __db__.engine

    selected_user = engine.execute('select * from users where id  =  ?', id).fetchone()
    if selected_user == None:
        raise InvalidUsage("user not found", 404)

    update_statement = """
            update users
            set active=?
            where id = ?
            """
    engine.execute(update_statement, False, id)
    deleted_user = engine.execute('select * from users where id  =  ?', id).fetchone()
    response = jsonify(convertToUserObject(deleted_user))
    response.status_code = 200
    return response
