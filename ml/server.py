import ml_detection as ml
from flask import Flask, request, jsonify

app = Flask(__name__)

users = ['ry', 'kw', 'st', 'abi', 'val', 'abc']
passwords = ['ry', 'kw', 'st', 'abi', 'val','123']


@app.route('/login')
def login():
    return {'user': users, 'password': passwords}


@app.route('/camera')
def camera():
    return ml.main()


@app.route("/register", methods=["POST"], strict_slashes=False)
def register():
    body = request.get_json(force=True)
    user = body['user']
    password = body['password']

    users.append(user)
    passwords.append(password)
    return jsonify(body)


if __name__ == '__main__':
    app.run(debug=True)
