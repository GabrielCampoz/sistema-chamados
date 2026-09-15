import { useState, type FormEvent } from "react"

type NovoChamadoProps = {
  onCriarChamado: (
    titulo: string,
    descricao: string,
    categoria: string,
    prioridade: string
  ) => void

  onCancelar: () => void
}

function NovoChamado({ onCriarChamado, onCancelar }: NovoChamadoProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState("")
  const [prioridade, setPrioridade] = useState("media")


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
    <form onSubmit={criarChamado}>
      <h2>Novo chamado</h2>

      <label htmlFor="titulo">Título</label>
      <input
        id="titulo"
        type="text"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
      />

      <br />

      <label htmlFor="descricao">Descrição</label>
      <textarea
        id="descricao"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
      />

      <br />

      <label htmlFor="categoria">Categoria</label>

      <select
        id="categoria"
        value={categoria}
        onChange={(event) => setCategoria(event.target.value)}
      >
        <option value="">Selecione uma categoria</option>
        <option value="hardware">Hardware</option>
        <option value="software">Software</option>
        <option value="rede">Rede</option>
        <option value="acesso">Acesso</option>
      </select>

      <br />

      <label htmlFor="prioridade">Prioridade</label>

      <select
        id="prioridade"
        value={prioridade}
        onChange={(event) => setPrioridade(event.target.value)}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <br />

      <button type="submit">
        Criar chamado
      </button>

      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  )
}

export default NovoChamado