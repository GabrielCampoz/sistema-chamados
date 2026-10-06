import type { Chamado } from "../types/Chamado"

export const CHAMADOS_STORAGE_KEY = "sistema-chamados:chamados"

function ehChamado(valor: unknown): valor is Chamado {
  if (typeof valor !== "object" || valor === null || Array.isArray(valor)) {
    return false
  }

  const chamado = valor as Record<string, unknown>

  return (
    typeof chamado.id === "number" && Number.isFinite(chamado.id) &&
    typeof chamado.titulo === "string" && chamado.titulo.trim() !== "" &&
    typeof chamado.descricao === "string" && chamado.descricao.trim() !== "" &&
    (chamado.categoria === "hardware" || chamado.categoria === "software" ||
      chamado.categoria === "rede" || chamado.categoria === "acesso") &&
    (chamado.prioridade === "baixa" || chamado.prioridade === "media" || chamado.prioridade === "alta") &&
    (chamado.status === "aberto" || chamado.status === "resolvido")
  )
}

export function carregarChamados(): { chamados: Chamado[]; leituraFalhou: boolean } {
  let salvos: string | null

  try {
    salvos = localStorage.getItem(CHAMADOS_STORAGE_KEY)
  } catch {
    return { chamados: [], leituraFalhou: true }
  }

  try {
    const dados: unknown = JSON.parse(salvos ?? "[]")
    return { chamados: Array.isArray(dados) ? dados.filter(ehChamado) : [], leituraFalhou: false }
  } catch {
    return { chamados: [], leituraFalhou: false }
  }
}

export function salvarChamados(chamados: Chamado[]): void {
  localStorage.setItem(CHAMADOS_STORAGE_KEY, JSON.stringify(chamados))
}
