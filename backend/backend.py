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
client = OpenAI(
            api_key="",
        )

def make_request_openai(instruction, question, userInput, previousInputs=[]):
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
                                            Given question '{question}', provide a well structured, easy to understand feedback response. 
                                             You MUST USE A CLEAR STRUCTURED markdown format. 
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
        messages = []
        for item in previousInputs:
            messages.append({'role': 'user', 'content': f"Question '{item['question']}'. User Input: '{item['userInput']}' "})

        messages.append({'role': 'user', 'content': userInput})
        print(messages)
        response = client.chat.completions.create(
            model = 'gpt-4o-mini',
            messages = messages,
            functions = student_custom_functions,
            function_call = 'auto'
        )
        
        json_response = json.loads(response.choices[0].message.function_call.arguments)
        print(json_response)
        llm_response = json_response.get("feedback")
        is_feedback_acceptable = json_response.get("is_feedback_acceptable")

        return llm_response, is_feedback_acceptable
def ai_bm_extraction(userInputs):
        student_custom_functions = [
            {
                "name": "evaluate_business_model",
                "description": "Evaluates a business model based on predefined dimensions and questions, returning structured enum outputs or None for unanswerable questions.",
                
                "parameters": {
                    "type": "object",
                    "properties": {
                        "D2_DegreeOfDigitization": {
                            "type": ["string", "null"],
                            "description": "Degree of Digitization: Is the business model purely digital, digitally enabled, or does it operate independently of digital technologies?",
                            "enum": ["Purely digital", "Digitally enabled", "Not necessarily digital", None]
                        },
                        "D3_ProductType": {
                            "type": ["string", "null"],
                            "description": "Product Type: What is the primary type of product or service offered?",
                            "enum": ["Physical", "Financial", "Human", "Intellectual property", "Hybrid", "Product type not specified", None]
                        },
                        "D4_StrategyForDifferentiation": {
                            "type": ["string", "null"],
                            "description": "Differentiation Strategy: How does the pattern propose to differentiate the offering?",
                            "enum": ["Quality", "Customization", "Combination", "Access/convenience", "Price", "Network effects", "No impact on differentiation", None]
                        },
                        "D5_TargetCustomers": {
                            "type": ["string", "null"],
                            "description": "Target Customers: Does the pattern target specific new customer segments, lock-in existing customers, other companies (B2B) or no impact on target customers exist?",
                            "enum": ["Specific new customer segment", "Lock-in existing customers", "Other companies (B2B)", "No impact on target customers", None]
                        },
                        "D6_ValueDeliveryProcess": {
                            "type": ["string", "null"],
                            "description": "Value Delivery Process: How does the pattern affect the delivery process, such as branding + marketing, sales channels, sales models, customer relationship management or no impact on delivery process?",
                            "enum": ["Brand and marketing", "Sales channel", "Sales model", "Customer relationship management", "No impact on delivery process", None]
                        },
                        "D7_Sourcing": {
                            "type": ["string", "null"],
                            "description": "Sourcing Strategy: Does the pattern require in-house production (make), external sourcing (buy), or a mix (no impact on sourcing)?",
                            "enum": ["Make", "Buy", "No impact on sourcing", None]
                        },
                        "D8_ThirdPartiesInvolved": {
                            "type": ["string", "null"],
                            "description": "Third-Party Involvement: Are suppliers, customers, competitors, or multiple parties involved in the business process or there is no impact on third parties involved?",
                            "enum": ["Suppliers", "Customers", "Competitors", "Multiple parties", "No impact on third parties involved", None]
                        },
                        "D9_ValueCreationProcess": {
                            "type": ["string", "null"],
                            "description": "Creation Process: How does the pattern innovate or optimize the creation process through innovation, supply, production, multiple steps or no impact on creation process?",
                            "enum": ["Innovation", "Supply", "Production", "Multiple steps", "No impact on creation process", None]
                        },
                        "D10_RevenueModel": {
                            "type": ["string", "null"],
                            "description": "Revenue Model: What revenue generation strategy?",
                            "enum": ["Sell", "Lend", "Intermediate", "Advertising", "No impact on revenue model", None]
                        },
                        "D11_PricingStrategy": {
                            "type": ["string", "null"],
                            "description": "Pricing Strategy: What is the pricing strategy?",
                            "enum": ["Premium", "Cheap", "Dynamic", "Non-transparent", "No impact on pricing strategy", None]
                        },
                        "D12_DirectProfitEffect": {
                            "type": ["string", "null"],
                            "description": "Profit Effects: Does the pattern primarily aim to increase revenue, reduce costs, have multiple effects or no direct profit impact?",
                            "enum": ["Increase revenue", "Reduce cost", "Multiple effects", "No direct profit impact", None]
                        }
                    },
                    "required": [
                        "D2_DegreeOfDigitization",
                        "D3_ProductType",
                        "D4_StrategyForDifferentiation",
                        "D5_TargetCustomers",
                        "D6_ValueDeliveryProcess",
                        "D7_Sourcing",
                        "D8_ThirdPartiesInvolved",
                        "D9_ValueCreationProcess",
                        "D10_RevenueModel",
                        "D11_PricingStrategy",
                        "D12_DirectProfitEffect"
                    ],
                    "additionalProperties": True
                }
            }
        ]

        messages = []
        for item in userInputs:
            if len(item['userInput']) > 9:
                messages.append({'role': 'user', 'content': f"Question '{item['question']}'. User Input: '{item['userInput']}'"})
        print(messages)
        if len(messages) == 0:
            return "No messages"
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=messages,
            functions=student_custom_functions,  # Corrected to a list
            function_call='auto'
        )

        
        json_response = json.loads(response.choices[0].message.function_call.arguments)
        print(json_response)
        return json_response

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
    previousInputs =  data.get("previousInputs")
    if instruction  is None or question is None:
        return jsonify({"details": "missing info in config"}), 401
    
    llm_response, satisfactory_outcome = make_request_openai(instruction, question, userInput, previousInputs=previousInputs)
   
    return jsonify({"response": llm_response, 
                    "satisfactory_outcome": satisfactory_outcome, 
                    "html": markdown.markdown(llm_response)})

@app.route('/extract_bm', methods=['POST', 'GET'])
def extract_bm():
    data = request.json
    userInputs = data.get("userInputs")
    if userInputs is None:
        return jsonify({"details": "missing info in config"}), 401
    
    llm_response = ai_bm_extraction(userInputs)
   
    return jsonify({"data": llm_response})


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

