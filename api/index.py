from flask import Flask, jsonify
import flask_cors
import services

app = Flask(__name__)
flask_cors.CORS(app)

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/portfolio", methods=["GET"])
def portfolio():
    return services.fetch_portfolio()

if __name__ == "__main__":
    app.run()
