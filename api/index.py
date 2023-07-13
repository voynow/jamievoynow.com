import dotenv
from flask import Flask, jsonify, request
import flask_cors
from git2doc import loader
from llm_blocks import chat_utils
import openai
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

Respond to the following query:
{query}

Be concise unless otherwise specified. Respond in formatted markdown. If you are unable to answer the question, respond with "I don't know" or "I'm not sure".
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
    print("TESTTEST")
    portfolio = {item["name"]: item for item in fetch_portfolio()}
    return jsonify(portfolio[project_name])


@app.route("/api/chat", methods=["POST"])
def chat():
    print("TESTTESTTEST")
    data = request.get_json()
    query = data.get("message")
    project_name = data.get("project")

    github_url = PROFILE_INFO["github"]
    repo_url = f"{github_url}/{project_name}"
    # repo_docs = loader.pull_code_from_repo(repo_url)

    repo_str = ""
    # for item in repo_docs:
    #     repo_str += f"{item['file_path']}:\n\n{item['page_content']}\n\n"
    try:
        project_chat_chain = chat_utils.GenericChain(
            template=TEMPLATE, model_name="gpt-3.5-turbo-16k"
        )
        response = project_chat_chain(repo_url=repo_url, repo=repo_str, query=query)["text"]
    except openai.error.InvalidRequestError:
        response = f"I'm sorry, this repo is not supported yet due to context length limitations. We are actively working on fixing this!"
    return jsonify(response)


if __name__ == "__main__":
    app.run()
