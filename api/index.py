from flask import Flask, jsonify
# from flask_socketio import SocketIO, emit
import flask_cors
import dotenv
import os
import requests
import time

dotenv.load_dotenv()
app = Flask(__name__)
# socketio = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)
flask_cors.CORS(app)

GH_GRAPHQL_QUERY = """
query {
  user(login: "%s") {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
    }
  }
}
"""

TEMPLATE = """
You are an expert software engineering assistant. A code repository from {repo_url} will be provided - your job is to respond queries about this code.

Here is the entire repository in plain text:
{repo}

Respond to the following query in markdown:
{query}
"""

ENDPOINT = "https://api.github.com/graphql"
CACHE_CONFIG = {"CACHE_TYPE": "simple"}
LOG_FILE_NAME = "app.log"
GITHUB_USERNAME = "voynow"
GITHUB_URL = "https://github.com/"

PROFILE_INFO = {
    "name": "Jamie Voynow",
    "bio": "Software Engineer @ Vanguard",
    "image": "/static/headshot.jpg",
    "linkedin": "https://www.linkedin.com/in/voynow/",
    "github": f"{GITHUB_URL}{GITHUB_USERNAME}",
}


def fetch_portfolio():
    """Fetch pinned projects from GitHub"""
    endpoint = "https://api.github.com/graphql"
    headers = {"Authorization": f"Bearer {os.environ['GH_TOKEN']}"}

    response = requests.post(
        endpoint,
        json={"query": GH_GRAPHQL_QUERY % GITHUB_USERNAME},
        headers=headers,
    ).json()

    edges = response["data"]["user"]["pinnedItems"]["edges"]
    projects = [
        {
            "name": node["node"]["name"],
            "description": node["node"]["description"],
            "url": node["node"]["url"],
            "imageUrl": f'{node["node"]["name"]}.png',
        }
        for node in edges
    ]
    return projects


@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


@app.route("/api/portfolio", methods=["GET"])
def portfolio():
    return jsonify(fetch_portfolio())


@app.route("/api/project/<string:project_name>", methods=["GET"])
def project(project_name):
    portfolio = {item["name"]: item for item in fetch_portfolio()}
    return jsonify(portfolio[project_name])


# @socketio.on("send_message")
# def handle_send_message(data):
#     print("Received message:", data)
#     response = "*** test response*** "
#     time.sleep(2)
#     emit("receive_message", response)


if __name__ == "__main__":
    app.run()
