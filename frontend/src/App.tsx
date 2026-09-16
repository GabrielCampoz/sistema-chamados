import { useEffect, useState } from "react"
import NovoChamado from "./components/NovoChamado"
import type { CategoriaChamado, Chamado, PrioridadeChamado } from "./types/Chamado"
import ListaChamados from "./components/ListaChamados"
import "./App.css"

const CHAMADOS_STORAGE_KEY = "sistema-chamados:chamados"

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [chamados, setChamados] = useState<Chamado[]>(() => {
    const chamadosSalvos = localStorage.getItem(CHAMADOS_STORAGE_KEY)

    if (!chamadosSalvos) {
      return []
    }

    try {
      const dadosSalvos: unknown = JSON.parse(chamadosSalvos)

      return Array.isArray(dadosSalvos) ? dadosSalvos as Chamado[] : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, JSON.stringify(chamados))
  }, [chamados])

  function abrirChamado() {
    setMostrarFormulario(true)
  }

  function fecharFormulario() {
    setMostrarFormulario(false)
  }

  function adicionarChamado(
    titulo: string,
    descricao: string,
    categoria: CategoriaChamado,
    prioridade: PrioridadeChamado
  ) {
    const novoChamado: Chamado = {
      id: Date.now(),
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      prioridade: prioridade,
      status: "aberto"
    }

    setChamados((chamadosAtuais) => [
      ...chamadosAtuais,
      novoChamado
    ])

    setMostrarFormulario(false)
  }

  function resolverChamado(id: number) {
    setChamados((chamadosAtuais) =>
      chamadosAtuais.map((chamado) =>
        chamado.id === id
          ? { ...chamado, status: "resolvido" }
          : chamado
      )
    )
  }

  const totalAbertos = chamados.filter((chamado) => chamado.status === "aberto").length
  const totalResolvidos = chamados.filter((chamado) => chamado.status === "resolvido").length

  return (
    <div className="app-shell">
      <header className="hero-header">
        <div className="hero-header__content">
          <span className="eyebrow">Central de suporte</span>
          <h1>Sistema de Chamados</h1>
          <p>Registre solicitações, acompanhe prioridades e mantenha tudo sob controle.</p>
        </div>

        {!mostrarFormulario && (
          <button className="button button--primary" type="button" onClick={abrirChamado}>
            <span aria-hidden="true">+</span>
            Novo chamado
          </button>
        )}
      </header>

      <main className="main-content">
        <section className="summary-grid" aria-label="Resumo dos chamados">
          <article className="summary-card summary-card--total">
            <span>Total de chamados</span>
            <strong>{chamados.length}</strong>
          </article>
          <article className="summary-card summary-card--open">
            <span>Em aberto</span>
            <strong>{totalAbertos}</strong>
          </article>
          <article className="summary-card summary-card--resolved">
            <span>Resolvidos</span>
            <strong>{totalResolvidos}</strong>
          </article>
        </section>

        {mostrarFormulario && (
          <NovoChamado
            onCriarChamado={adicionarChamado}
            onCancelar={fecharFormulario}
          />
        )}

        <ListaChamados chamados={chamados} onResolverChamado={resolverChamado} />
      </main>
    </div>
  )
}

export default App
