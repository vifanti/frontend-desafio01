import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post("/repositories", {
      url: `https://github.com/Rocketseat/${Date.now()}`,
      title: Date.now(),
      techs: ["Node", "Express", "TypeScript"],
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    /**
     * Aqui usamos o filter para 'gerar um novo array sem o id que acabou de
     * ser excluído, para manter a imutabilidade.
     */
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
