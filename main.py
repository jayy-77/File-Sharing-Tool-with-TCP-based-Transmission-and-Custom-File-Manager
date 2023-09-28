from flask import Flask, request, jsonify
import os
import socket
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

url = "http://localhost:3000"
file_name, file_size, host = "", "", ""
ip = ""

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

    root_disks = []
    for i in range(65, 91):
        if os.path.isdir(f"{chr(i)}:/"):
            root_disks.append(f"{chr(i)}:/")

    root = root_disks[0]

    @app.route("/directory", methods=["POST"])
    def traverse():
        global ip
        ip = request.get_json()["ip"]
        os.chdir(root)
        return jsonify(directory_finder(os.listdir()), os.getcwd(), root_disks)

    @app.route("/change-disk", methods=["POST"])
    def change_desk():
        disk_name = request.get_json()
        print(disk_name)
        os.chdir(disk_name["disk"])
        return jsonify(directory_finder(os.listdir()), os.getcwd(), root_disks)

    @app.route("/post-data", methods=["POST"])
    def change_dir():
        global file_name, file_size, host
        data = request.get_json()
        print(data)
        flag = -1
        if data["item_object"]["type"] == "directory":
            os.chdir(os.getcwd() + "/" + data["item_object"]["content"])
            flag = 0

        else:
            host = ip
            port = 9971
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
            flag = 1

        return jsonify(directory_finder(os.listdir()), os.getcwd(), root_disks, flag)

    @app.route("/back-dir", methods=["POST"])
    def back_dir():
        os.chdir("..")
        return jsonify(directory_finder(os.listdir()), os.getcwd(), root_disks)

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=4544)

while True:
    explorer()