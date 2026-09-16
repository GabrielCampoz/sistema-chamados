import { useState, type FormEvent } from "react"
import type { CategoriaChamado, PrioridadeChamado } from "../types/Chamado"

type NovoChamadoProps = {
  onCriarChamado: (
    titulo: string,
    descricao: string,
    categoria: CategoriaChamado,
    prioridade: PrioridadeChamado
  ) => void

  onCancelar: () => void
}

function NovoChamado({ onCriarChamado, onCancelar }: NovoChamadoProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState<CategoriaChamado | "">("")
  const [prioridade, setPrioridade] = useState<PrioridadeChamado>("media")


  function criarChamado(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      titulo.trim() === "" ||
      descricao.trim() === "" ||
      categoria === ""
    ) {
      alert("Preencha todos os campos")
      return
    }

    onCriarChamado(
      titulo,
      descricao,
      categoria,
      prioridade)

    setTitulo("")
    setDescricao("")
    setCategoria("")
    setPrioridade("media")
  }

  return (
    <form className="ticket-form" onSubmit={criarChamado}>
      <div className="section-heading">
        <div>
          <span className="eyebrow eyebrow--dark">Nova solicitação</span>
          <h2>Novo chamado</h2>
        </div>
        <p>Descreva o problema para agilizar o atendimento.</p>
      </div>

      <div className="form-grid">
        <div className="field field--wide">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            placeholder="Ex.: Computador não inicia"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <div className="field field--wide">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            rows={4}
            placeholder="Conte o que aconteceu e quando o problema começou"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(event) => {
              const valor = event.target.value

              if (
                valor === "" ||
                valor === "hardware" ||
                valor === "software" ||
                valor === "rede" ||
                valor === "acesso"
              ) {
                setCategoria(valor)
              }
            }}
          >
            <option value="">Selecione uma categoria</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="rede">Rede</option>
            <option value="acesso">Acesso</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="prioridade">Prioridade</label>
          <select
            id="prioridade"
            value={prioridade}
            onChange={(event) => {
              const valor = event.target.value

              if (valor === "baixa" || valor === "media" || valor === "alta") {
                setPrioridade(valor)
              }
            }}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button className="button button--ghost" type="button" onClick={onCancelar}>
          Cancelar
        </button>
        <button className="button button--primary" type="submit">
          Criar chamado
        </button>
      </div>
    </form>
  )
}

export default NovoChamado
