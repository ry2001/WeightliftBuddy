from flask import Flask

app = Flask(__name__)


@app.route('/login')
def login():
    return {'user': ['ry', 'kw', 'st', 'abi', 'val'], 'password': ['ry', 'kw', 'st', 'abi', 'val']}


if __name__ == '__main__':
    app.run(debug=True)
