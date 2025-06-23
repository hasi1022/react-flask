from flask import Flask, request, jsonify
from flask_cors import CORS
import random, string
from models import RailwayModel
from flask_cors import CORS
import requests
from dotenv import load_dotenv
load_dotenv(override=True)  # ✅ Force override any system variable
# python server.py to run programe
# venv/Scripts/activate



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

db = RailwayModel()

def gen_pnr():
    return random.randint(1000, 9999)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    db.create_user((
        data["fname"], data["lname"], data["username"],
        data["password"], data["phno"], data["gender"],
        data["dob"], data["age"]
    ))
    return jsonify({"message": "User created"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = db.auth_user(data["username"], data["password"])
    return jsonify(user) if user else ("", 401)

# @app.route("/ticket", methods=["POST"])
# def book_ticket():
    data = request.json
    pnr = random.randint(1000, 9999)
    db.book_ticket((
        pnr, data["name"], data["age"], data["train_no"],
        data["train_name"], data["gender"], data["class"],
        data["source"], data["destination"], data["cost"]
    ))
    db.update_seat_count(data["train_name"], data["class"])
    return jsonify({"pnr": pnr})
@app.route("/ticket", methods=["POST", "OPTIONS"])
def book_ticket():
    if request.method == "OPTIONS":
        return '', 200  # Handles preflight CORS request

    data = request.json
    pnr = random.randint(1000, 9999)
    db.book_ticket((
        pnr, data["name"], data["age"], data["train_no"],
        data["train_name"], data["gender"], data["class"],
        data["source"], data["destination"], data["fare"]
    ))
    db.update_seat_count(data["train_name"], data["class"])
    return jsonify({"pnr": pnr})

@app.route("/ticket/<int:pnr>", methods=["GET"])
def get_ticket(pnr):
    ticket = db.get_ticket(pnr)
    return jsonify(ticket) if ticket else ("hello", 404)

@app.route("/ticket/<int:pnr>", methods=["DELETE"])
def delete_ticket(pnr):
    db.delete_ticket(pnr)
    return jsonify({"message": "Ticket cancelled"})

@app.route("/trains", methods=["GET"])
def get_trains():
    trains = db.get_all_trains()
    return jsonify(trains)

@app.route('/api/hello', methods=['GET'])
def hello():
    return {"message": "Hello from Flask!"}

@app.route('/calculate_fare', methods=['POST'])
def fare_api():
    data = request.json
    fare = db.calculate_fare(data['train_name'], data['source'], data['destination'], data['class'])
    return jsonify({"fare": fare})

@app.route("/train_route", methods=["POST"])
def get_train_route():
    data = request.json
    train_name = data.get("train_name", "").strip()
    print("Train name received:", train_name)

    if not train_name:
        return jsonify({"error": "Train name is required"}), 400

    route = db.get_route(train_name)
    print("Route fetched:", route)

    if not route:
        return jsonify([])

    return jsonify(route)

@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,DELETE"
    return response


if __name__ == "__main__":
    app.run(debug=True)