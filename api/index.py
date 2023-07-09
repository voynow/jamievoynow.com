from flask import Flask, jsonify
import flask_cors

app = Flask(__name__)
flask_cors.CORS(app)

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/portfolio", methods=["GET"])
def portfolio():
    # TODO: Replace this with actual data
    data = [
        {
            "name": "Project 1",
            "description": "This is a description for project 1.",
            # "imageUrl": "https://example.com/image1.jpg"
        },
        {
            "name": "Project 2",
            "description": "This is a description for project 2.",
            # "imageUrl": "https://example.com/image2.jpg"
        }
    ]
    return jsonify(data)

if __name__ == "__main__":
    app.run()
