import { useState } from "react"
import NovoChamado from "./components/NovoChamado"

type Chamado = {
  id: number
  titulo: string
  descricao: string
  categoria: string
  prioridade: string
}

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [chamados, setChamados] = useState<Chamado[]>([])

  function abrirChamado() {
    setMostrarFormulario(true)
  }

  function adicionarChamado(titulo: string, descricao: string, categoria: string, prioridade: string) {
    const novoChamado = {
      id: Date.now(),
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      prioridade: prioridade
    }

    setChamados([...chamados, novoChamado])
  }

  return (
    <div>
      <h1>Sistema de Chamados</h1>
      <p>Gerencie seus chamados de suporte.</p>

      <button onClick={abrirChamado}>
        Abrir chamado
      </button>

      {mostrarFormulario && (
        <NovoChamado onCriarChamado = {adicionarChamado} />
        )}

        <h2>Chamados</h2>

        {chamados.map((chamado) => (
          <div key={chamado.id}>
            <h3>{chamado.titulo}</h3>
            <p>{chamado.descricao}</p>
            <p>Categoria: {chamado.categoria}</p>
            <p>Prioridade: {chamado.prioridade}</p>
          </div>
        ))}
    </div>
  )
}

export default App