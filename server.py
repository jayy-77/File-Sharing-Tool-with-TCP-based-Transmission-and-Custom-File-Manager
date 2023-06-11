import socket
import tqdm

def server_rec():

    while True:
        print("again")
        server = socket.socket()
        server.bind((socket.gethostname(), 9979))
        server.listen()
        client, addr = server.accept()
        print("Client connected:", addr)

        file_name = client.recv(1024).decode()
        print("Received file name:", file_name)

        # file_size = client.recv(1024).decode()
        # print("Received file size:", file_size)

        file_path = "/home/jay/LJ/SEM-4/dev/PY/fileX/{}".format(file_name)
        file = open(file_path, "wb")

        file_bytes = b""
        done = False

        while not done:
            data = client.recv(1024)
            if file_bytes[-5:] == b"<END>":
                done = True
            file_bytes += data

        file.write(file_bytes)
        file.close()
        print("File received:", file_path)
        server.close()
        client.close()

server_rec()
