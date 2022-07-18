import ml_detection as ml
from flask import Flask

app = Flask(__name__)

users = ['ry', 'kw', 'st', 'abi', 'val']
passwords = ['ry', 'kw', 'st', 'abi', 'val']


@app.route('/login')
def login():
    return {'user': users, 'password': passwords}


@app.route('/camera')
def camera():
    return ml.main()


if __name__ == '__main__':
    app.run(debug=True)
