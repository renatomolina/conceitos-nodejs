const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body; 

  repository = repositories.find((repository) => repository.id == id);
  if (!repository) {
    return response.send(400);
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  repositoryIndex = repositories.findIndex((repository) => repository.id == id);

  if (repositoryIndex == -1) {
    return response.send(400);
  }

  repositories.splice(repositoryIndex, 1);

  return response.send(204);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  repository = repositories.find((repository) => repository.id == id);

  if (!repository) {
    return response.send(400);
  }

  repository.likes++;

  return response.json(repository);
});

module.exports = app;
