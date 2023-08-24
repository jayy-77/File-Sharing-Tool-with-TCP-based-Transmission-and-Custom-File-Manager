from flask import Flask, request, jsonify
import os
import socket
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

url = "http://localhost:3000"
file_name, file_size, host = "", "", ""
def directory_finder(listdir):
    root_struct = []

    for i in listdir:
        if os.path.isfile(f"{os.getcwd()}/{i}"):
            root_struct.append({"type": "file", "content": i})
        else:
            root_struct.append({"type": "directory", "content": i})

    return root_struct

def explorer():
    app = Flask(__name__)
    CORS(app)

    root = "/home/" + os.getcwd().split("/")[2]

    @app.route("/directory")
    def traverse():
        os.chdir(root)
        return jsonify(directory_finder(os.listdir()), os.getcwd())

    @app.route("/post-data", methods=["POST"])
    def change_dir():
        global file_name, file_size, host
        data = request.get_json()

        if data["item_object"]["type"] == "directory":
            os.chdir(os.getcwd() + "/" + data["item_object"]["content"])

        else:
            host = socket.gethostname()
            port = 9970
            client_socket = socket.socket()
            client_socket.connect((host, port))

            content = data["item_object"]["content"]

            file_name = content.split("/")[-1]
            file = open(content, "rb")
            file_size = os.path.getsize(content)
            info = f"{file_name}<SEP>{file_size}"
            client_socket.send(info.encode())
            file_data_byte = file.read()
            client_socket.sendall(file_data_byte)
            client_socket.send(b"<END>")
            client_socket.close()
            file.close()

        return jsonify(directory_finder(os.listdir()), os.getcwd())

    @app.route("/back-dir", methods=["POST"])
    def back_dir():
        os.chdir("..")
        return jsonify(directory_finder(os.listdir()), os.getcwd())



    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=4544)


while True:
    explorer()