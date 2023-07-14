# 🚀 Jamie Voynow's Portfolio

![GitHub stars](https://img.shields.io/github/stars/voynow/jamievoynow.com?style=social)

Welcome to Jamie Voynow's Portfolio repository! This repository contains the code for a personal portfolio website that showcases pinned projects from GitHub and provides a chat interface to learn about the projects in a natural language interface. The portfolio is built using Flask, Next.js, and OpenAI's GPT model.

## 🎯 Why Use This Repo

If you're looking to build a personal portfolio that goes beyond just listing your projects and provides an interactive way for visitors to learn about your work, this repo is for you. The chat interface uses OpenAI's GPT-3.5-turbo model to answer queries about the projects, providing a unique and engaging user experience.

## 📂 Repo Structure
```
.
├── api
│   └── index.py
├── app
│   ├── ChatInterface.tsx
│   ├── globals.css
│   ├── Navbar.tsx
│   ├── Portfolio.tsx
│   ├── ProjectPage.tsx
│   └── Skills.tsx
├── pages
│   ├── index.tsx
│   └── project
│       └── [name].tsx
├── _app.tsx
└── postcss.config.js
```

## 📖 Example Usage

The main functionality of the portfolio is exposed through the `/api/chat` endpoint in `api/index.py`. This endpoint accepts a POST request with a JSON body containing a `message` and a `project` name. The `message` is the query that you want the GPT-3 model to answer about the `project`.

Here's an example of how to use this endpoint:

```python
import requests

data = {
    "message": "What is the main function of this project?",
    "project": "project_name"
}

response = requests.post("http://localhost:3000/api/chat", json=data)

print(response.json())
```

In the `app/ChatInterface.tsx` file, you can see how the chat interface is implemented in the front-end using React. The `handleSend` function is responsible for sending the user's message to the `/api/chat` endpoint and displaying the response from the GPT-3 model.

## 🎉 Conclusion

This repo provides a unique way to showcase your projects in your portfolio. By integrating a chat interface powered by GPT-3, visitors can interactively learn about your projects. Feel free to clone this repo and customize it according to your needs. Happy coding! 🚀