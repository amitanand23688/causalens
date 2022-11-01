#!/usr/bin/python
from unittest import result
from bottle import Bottle
import os
from os import listdir
from os.path import isfile, join
import json
app = Bottle()


@app.route('/')
def index():
    return "Success"

@app.route('/files')
def list_files():
    current_dir = os.path.join(os.getcwd(), "uploads")
    files_list = [{"name": f, "size": os.path.getsize(join(current_dir, f))} for f in listdir(current_dir) if isfile(join(current_dir, f))]
    result = []
    for i in files_list:
        result.append({"name": i["name"].split("-")[1], "type": i["name"].split(".")[1], "size_in_bytes": i["size"]})

    return json.dumps(result)

@app.route('/removetask')
def remove():
    pass


@app.route('/files/<filename>')
def read_file(filename):
    current_dir = os.getcwd()
    fully_qualified_path = os.path.join(current_dir, "uploads", filename)
    if os.path.exists(fully_qualified_path):
        with open(fully_qualified_path, "r") as f:
            return f.read()
    else:
        raise FileNotFoundError



if __name__ == '__main__':
    app.run(host= '127.0.0.1', port= 8001, debug=True)
    

