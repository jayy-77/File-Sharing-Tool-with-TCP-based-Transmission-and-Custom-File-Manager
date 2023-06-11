from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route('/post-data', methods=['POST'])
def post_data():
    data = request.get_json() 
    response = {'message': 'Data posted successfully'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 4444)