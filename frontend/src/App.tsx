import { useState } from "react";

function App() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")

  function abrirChamado() {
    setMostrarFormulario(true)
  }

  function criarChamado() {
    alert(`Título: ${titulo}\nDescrição: ${descricao}`)
  }

  return (
    <div>
      <h1>Sistema de Chamados</h1>
      <p>Gerencie seus chamados de suporte.</p>

      <button onClick={abrirChamado}>
        Abrir chamado
      </button>

      {mostrarFormulario && (
        <div>
          <h2>Novo chamado</h2>

          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />

          <br />

          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />

          <br />

          <button onClick={criarChamado}>
            Criar chamado
          </button>
        </div>
      )}
    </div>
  )
}

export default App