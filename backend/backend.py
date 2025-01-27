from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module
import markdown
from openai import OpenAI

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app, resources={r"/*": {"origins": "*"}})

import requests
import json
from datetime import datetime

def make_request_openai(instruction, question, userInput, model="gpt-4o-mini", max_tokens=800):
        client = OpenAI(
            api_key="",
        )

        student_custom_functions = [
            {
                'name': 'generate-business-evaluation',
                'description': question,
                'parameters': {
                    'type': 'object',
                    'properties': {
                        'feedback': {
                            'type': 'string',
                            'description': f"""{instruction}. 
                                            Provide a well structured, easy to understand feedback response in markdown format. 
                                            Also give hints to improve or refine the definition. """
                        },
                        'is_feedback_acceptable': {
                            'type': 'boolean',
                            'description': 'Is the user provided answer acceptable given the question and instruction?'
                        },
                    }
                }
            }
        ]
        response = client.chat.completions.create(
            model = 'gpt-4o-mini',
            messages = [{'role': 'user', 'content': userInput}],
            functions = student_custom_functions,
            function_call = 'auto'
        )
        
        json_response = json.loads(response.choices[0].message.function_call.arguments)
        print(json_response)
        llm_response = json_response.get("feedback")
        is_feedback_acceptable = json_response.get("is_feedback_acceptable")

        return llm_response, is_feedback_acceptable

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
    return jsonify(data)

@app.route('/evaluate_bm', methods=['POST', 'GET'])
def evaluate_questions():
    data = request.json
    currentQuestionIndex = data.get("currentQuestionIndex")
    userInput =  data.get("userInput")
    config = load_json_file().get(f"Question_{currentQuestionIndex +1}")
    question = config['yes']['followupQuestion']
    instruction= config['yes'].get('evaluationPrompt')
    if instruction  is None or question is None:
        return jsonify({"details": "missing info in config"}), 401
    
    llm_response, satisfactory_outcome = make_request_openai(instruction, question, userInput)
   
    return jsonify({"response": llm_response, 
                    "satisfactory_outcome": satisfactory_outcome, 
                    "html": markdown.markdown(llm_response)})


@app.route('/evaluate_answers', methods=['POST', 'GET'])
def evaluate_answer():
    data = request.json
    currentQuestionIndex = data.get("currentQuestionIndex")
    userInput =  data.get("userInput")
    config = load_json_file().get(f"Question_{currentQuestionIndex +1}")

    questions = config['no']['tutoring']['questions']
    feedback = []
    for index, item in enumerate(userInput):
        userInput = item.get("userInput")
        instruction = questions[index]['evaluationPrompt']
        question = questions[index]['question']
        
        llm_response, satisfactory_outcome = make_request_openai(instruction, question, userInput)
        feedback.append({"response": llm_response, 
                         "html": markdown.markdown(llm_response), 
                         "satisfactory_outcome": satisfactory_outcome})
    if userInput is None or question is None:
        return jsonify({"details": "missing info in config"}), 401
    

    return jsonify({"feedback": feedback})

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, port=5007)

