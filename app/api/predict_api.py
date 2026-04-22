from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)


BASE_DIR = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, "final_model.pkl")
print(model_path)
model = joblib.load(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    attempts = data["attempts"]
    time_spent = data["time_spent"]

    predicted = model.predict([[attempts, time_spent]])[0]

    return jsonify({
        "predicted_accuracy": float(predicted)
    })

if __name__ == "__main__":
    app.run(port=5000)