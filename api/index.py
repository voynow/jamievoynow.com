from flask import Flask, jsonify
import flask_cors
import config
import dotenv
import os
import requests

dotenv.load_dotenv()
app = Flask(__name__)
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
        json={"query": config.GH_GRAPHQL_QUERY % config.GITHUB_USERNAME},
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