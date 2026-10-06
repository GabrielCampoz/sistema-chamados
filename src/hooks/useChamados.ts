import { useEffect, useState } from "react"
import type { CategoriaChamado, Chamado, PrioridadeChamado } from "../types/Chamado"
import { carregarChamados, salvarChamados } from "../storage/chamadosStorage"

export function useChamados() {
  const [dadosIniciais] = useState(carregarChamados)
  const [chamados, setChamados] = useState<Chamado[]>(dadosIniciais.chamados)
  const [erroAoSalvar, setErroAoSalvar] = useState(false)

  useEffect(() => {
    // Não substitui dados existentes quando a leitura inicial foi bloqueada.
    if (dadosIniciais.leituraFalhou) return

    try {
      salvarChamados(chamados)
      // O aviso depende do resultado da sincronização com o armazenamento externo.
      // oxlint-disable-next-line react/set-state-in-effect
      setErroAoSalvar(false)
    } catch {
      setErroAoSalvar(true)
    }
  }, [chamados, dadosIniciais.leituraFalhou])

  function adicionarChamado(
    titulo: string,
    descricao: string,
    categoria: CategoriaChamado,
    prioridade: PrioridadeChamado
  ) {
    const novoChamado: Chamado = {
      id: Date.now(),
      titulo,
      descricao,
      categoria,
      prioridade,
      status: "aberto"
    }

    setChamados((chamadosAtuais) => [...chamadosAtuais, novoChamado])
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

  return {
    chamados,
    adicionarChamado,
    resolverChamado,
    leituraFalhou: dadosIniciais.leituraFalhou,
    erroAoSalvar,
  }
}
