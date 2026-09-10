import { useState } from "react"
import NovoChamado from "./components/NovoChamado"
import type { Chamado } from "./types/Chamado"
import ListaChamados from "./components/ListaChamados"

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [chamados, setChamados] = useState<Chamado[]>([])

  function abrirChamado() {
    setMostrarFormulario(true)
  }

  function fecharFormulario() {
    setMostrarFormulario(false)
  }

  function adicionarChamado(titulo: string, descricao: string, categoria: string, prioridade: string) {
    const novoChamado = {
      id: Date.now(),
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      prioridade: prioridade,
      status: "aberto"
    }

    setChamados([...chamados, novoChamado])
    setMostrarFormulario(false)
  }

  return (
    <div>
      <h1>Sistema de Chamados</h1>
      <p>Gerencie seus chamados de suporte.</p>

      <button onClick={abrirChamado}>
        Abrir chamado
      </button>

      {mostrarFormulario && (
        <NovoChamado 
        onCriarChamado = {adicionarChamado} 
        onCancelar={fecharFormulario}
        />
        )}

        <ListaChamados chamados={chamados} />

    </div>
  )
}

export default App