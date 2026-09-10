import { useState } from "react"

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


  function criarChamado() {
    if (titulo.trim() === "" || 
    descricao.trim() === "" ||
    categoria === "") {
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

      <label>Categoria</label>

      <select
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

      <label>Prioridade</label>

      <select
      value={prioridade}
      onChange={(event) => setPrioridade(event.target.value)}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <br />

      <button onClick={criarChamado}>
        Criar chamado
      </button>

      <button onClick={onCancelar}>
        Cancelar
      </button>
    </div>
  )
}

export default NovoChamado