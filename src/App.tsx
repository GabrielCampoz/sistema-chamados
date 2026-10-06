import { useState } from "react"
import Header from "./components/Header/Header"
import Dashboard from "./components/Dashboard/Dashboard"
import AvisoArmazenamento from "./components/AvisoArmazenamento/AvisoArmazenamento"
import NovoChamado from "./components/NovoChamado/NovoChamado"
import ListaChamados from "./components/ListaChamados/ListaChamados"
import { useChamados } from "./hooks/useChamados"
import styles from "./App.module.css"

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const { chamados, adicionarChamado, resolverChamado, leituraFalhou, erroAoSalvar } = useChamados()

  function abrirChamado() {
    setMostrarFormulario(true)
  }

  function fecharFormulario() {
    setMostrarFormulario(false)
  }

  return (
    <div className={styles.shell}>
      <Header mostrarFormulario={mostrarFormulario} onNovoChamado={abrirChamado} />

      <main className={styles.content}>
        <Dashboard chamados={chamados} />

        <AvisoArmazenamento leituraFalhou={leituraFalhou} erroAoSalvar={erroAoSalvar} />

        {mostrarFormulario && (
          <NovoChamado
            onCriarChamado={(titulo, descricao, categoria, prioridade) => {
              adicionarChamado(titulo, descricao, categoria, prioridade)
              fecharFormulario()
            }}
            onCancelar={fecharFormulario}
          />
        )}

        <ListaChamados chamados={chamados} onResolverChamado={resolverChamado} />
      </main>
    </div>
  )
}

export default App
