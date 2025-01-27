from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app, resources={r"/*": {"origins": "*"}})

import requests
import json
from datetime import datetime

def make_request_openai(instruction, question, userInput, model="gpt-4o-mini", max_tokens=800):
     API_KEY =""
     URL ="https://api.openai.com/v1/chat/completions"
     
     data = {
                    "model": model,
                    "max_tokens": max_tokens,
                    "messages": [{"role":"system","content": 
                                  f"The user needs to answer the following question {question}. Instruction: " + instruction},
                                  {"role":"user", "content":
                                   userInput}],
                    "stream":False
               }
     print(data)
     return "test"
     response = requests.post(URL, json=data, stream=False,
                                        headers={"Authorization": f"Bearer {API_KEY}"}, timeout=300)

     return response.json()["choices"][0]["message"]["content"]

def load_json_file():
    try:
        with open('config.json') as f:
            return json.load(f)
    except Exception as e:
        print("ERROR")
        print(e, flush=True)
        return ""

@app.route('/get_config', methods=['POST', 'GET'])
def get_config():
    data = load_json_file()
    print(data, flush=True)
    return jsonify(data)

@app.route('/evaluate_bm', methods=['POST', 'GET'])
def evaluate_questions():
    data = request.json.get("input")
    instruction = data.get("evaluationPrompt")
    question = data.get("question")
    userInput =  data.get("userInput")
    llm_response = make_request_openai(instruction, question, userInput)
    # TODO: identify if user input was good or not 
    return jsonify({"response": llm_response})


@app.route('/evaluate_answers', methods=['POST', 'GET'])
def evaluate_answer():
    
    return jsonify({"finished": True})

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, port=5007)

