import { useState } from "react"

type NovoChamadoProps = {
    onCriarChamado: (titulo: string, descricao: string) => void
}

function NovoChamado({ onCriarChamado }: NovoChamadoProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")

  function criarChamado() {
    onCriarChamado(titulo, descricao)

    setTitulo("")
    setDescricao("")
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

      <button onClick={criarChamado}>
        Criar chamado
      </button>
    </div>
  )
}

export default NovoChamado