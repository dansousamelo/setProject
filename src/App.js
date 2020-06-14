import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Novo Projeto ${Date.now()}`,
        url: "http://github.com/...", 
        techs: ["Node.js", "..."]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    const repositoryOne = Array.from(repositories);
    const repositoryId = repositories.findIndex(repository=>repository.id = id);
    repositoryOne.splice(repositoryId, 1);
    setRepositories(repositoryOne);
    }

  return (
    <div>
      <ul data-testid="repository-list">
       
          { repositories.map(repository =>
             <li key={repository.id}>
               {repository.title}
              <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
            
            ) }
          
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
