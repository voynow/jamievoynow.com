# Constants and configuration variables
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