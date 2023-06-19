import socket
import tqdm
import requests
url = "http://localhost:3000"

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
        while not done:
            data = client.recv(int(file_size))
            if file_bytes[-5:] == b"<END>":
                done = True
            file_bytes += data
            progress_bar.update(len(data))
            requests.post(url+"/transfer_rate", json={"transfer_rate": str(progress_bar.n)})
        file.write(file_bytes)
        file.close()
        print("File received:", file_path)
        server.close()
        client.close()

server_rec()
