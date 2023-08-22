import socket
import tqdm
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def server_rec():

    while True:
        server = socket.socket()
        server.bind((socket.gethostname(), 9970))
        server.listen()
        client, addr = server.accept()
        print("Client connected:", addr)

        file_name, file_size = client.recv(1024).decode().split("<SEP>")
        print("Received file name:", file_name)
        print("Received file size:", file_size)
        file_path = "/home/jay/LJ/SEM-4/dev/PY/fileX/{}".format(file_name)
        file = open(file_path, "wb")

        file_bytes = b""
        done = False
        progress_bar = tqdm.tqdm(total=int(file_size), unit='B', unit_scale=True)
        file_path = f"/home/jay/LJ/SEM-4/dev/PY/fileX/{file_name}"
        @app.route("/file_config", methods=["POST"])
        def config_file():
            return jsonify({
                "ip": addr,
                "status": True,
                "host": "client",
                "file_name": file_name,
                "file_size": file_size,
                "file_path": file_path,
                "tranfer_rate": "ok",
                "progress": "10%"
            })
        app.run(host="0.0.0.0", port=4546)

        while not done:
            data = client.recv(int(file_size))
            if file_bytes[-5:] == b"<END>":
                done = True
            file_bytes += data
            progress_bar.update(len(data))

        file.write(file_bytes)
        file.close()
        print("File received:", file_path)
        server.close()
        client.close()

server_rec()
