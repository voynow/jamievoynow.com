import dotenv
from flask import Flask, jsonify, request
import flask_cors
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

EXCLUDE_EXTENSIONS = [
    ".ipynb",
    ".yaml",
    ".yml",
    ".json",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".csv",
    ".txt",
    ".jsonl",
    ".struct",
    ".map",
    ".obj",
    ".cleaned",
    ".dict",
    ".GIF",
    ".tiktoken",
    ".lock",
    ".pack",
    ".sub",
    ".zh_CN",
    ".dae",
    ".zh_CN_tgt",
    ".dat",
    ".tsv",
    ".tokens",
    ".off",
    ".sense",
    ".log",
    ".bvh",
    ".onnx",
    ".gltf",
    ".cif",
    ".geojson",
    ".pkl",
    ".bin",
    ".pdb",
    ".sdf",
    ".xmi",
    ".out",
    ".train",
    ".stl",
    ".kicad_pcb",
    ".mp3",
    ".pdf",
    ".npy",
    ".pyc",
    ".ttf",
    ".woff",
    ".woff2",
    ".eot",
    ".otf",
    ".wav",
    ".mp4",
    ".swp",
    ".mat",
]


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


def get_repo_content(user, repo, path=""):
    """Recursively get all files in a repo"""
    headers = {"Authorization": f"token {os.environ['GH_TOKEN']}"}
    url = f"https://api.github.com/repos/{user}/{repo}/contents/{path}"
    repo_repsone = requests.get(url, headers=headers)
    repo_repsone.raise_for_status()

    files_dict = {}
    for file in repo_repsone.json():
        if file["type"] == "dir":
            files_dict.update(get_repo_content(user, repo, file["path"]))

        elif not any(file["name"].endswith(ext) for ext in EXCLUDE_EXTENSIONS):
            if file["size"] == 0 and file["download_url"] is None:
                continue
            file_response = requests.get(file["download_url"], headers=headers)
            file_response.raise_for_status()

            try:
                files_dict[file["path"]] = file_response.content.decode("utf-8")
            except UnicodeDecodeError:
                print(f"Skipping file {file['path']} due to UnicodeDecodeError")

    return files_dict


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    query = data.get("message")
    project_name = data.get("project")

    github_url = PROFILE_INFO["github"]
    repo_url = f"{github_url}/{project_name}"
    repo_docs = get_repo_content("voynow", project_name)
    repo_str = "\n\n".join([f"{key}:\n{value}" for key, value in repo_docs.items()])
    
    try:
        project_chat_chain = chat_utils.GenericChain(
            template=TEMPLATE, model_name="gpt-3.5-turbo-16k"
        )
        response = project_chat_chain(repo_url=repo_url, repo=repo_str, query=query)
    except openai.error.InvalidRequestError:
        response = f"I'm sorry, this repo is not supported yet due to context length limitations. We are actively working on fixing this!"
    return jsonify(response["text"])


if __name__ == "__main__":
    app.run()
