from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend running"})

@app.route("/api/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files["image"]
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    return jsonify({
        "message": "Image uploaded successfully",
        "filename": image.filename
    })

if __name__ == "__main__":
    app.run(debug=True)
