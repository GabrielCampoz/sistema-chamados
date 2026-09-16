// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import App from "./App"

const CHAMADOS_STORAGE_KEY = "sistema-chamados:chamados"

describe("App", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it("exibe os chamados salvos ao iniciar", () => {
    localStorage.setItem(
      CHAMADOS_STORAGE_KEY,
      JSON.stringify([
        {
          id: 1,
          titulo: "Computador não liga",
          descricao: "A máquina não responde ao botão de energia.",
          categoria: "hardware",
          prioridade: "alta",
          status: "aberto",
        },
      ]),
    )

    render(<App />)

    expect(screen.getByText("Computador não liga")).not.toBeNull()
  })

  it("salva os chamados quando um novo chamado é criado", async () => {
    render(<App />)

    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    fireEvent.change(screen.getByLabelText(/t.tulo/i), {
      target: { value: "Internet indisponível" },
    })
    fireEvent.change(screen.getByLabelText(/descri/i), {
      target: { value: "Não há conexão no setor financeiro." },
    })
    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "rede" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Criar chamado" }))

    await waitFor(() => {
      const chamadosSalvos = JSON.parse(
        localStorage.getItem(CHAMADOS_STORAGE_KEY) ?? "[]",
      ) as Array<{ titulo: string }>

      expect(chamadosSalvos[0]?.titulo).toBe("Internet indisponível")
    })
  })

  it("inicia com a lista vazia quando os dados salvos são inválidos", () => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, "dados corrompidos")

    render(<App />)

    expect(screen.getByText("Nenhum chamado cadastrado.")).not.toBeNull()
  })

  it("ignora dados salvos que não sejam uma lista", () => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, JSON.stringify({ titulo: "Inválido" }))

    render(<App />)

    expect(screen.getByText("Nenhum chamado cadastrado.")).not.toBeNull()
  })

  it("resume o total de chamados por status", () => {
    localStorage.setItem(
      CHAMADOS_STORAGE_KEY,
      JSON.stringify([
        { id: 1, titulo: "A", descricao: "A", categoria: "hardware", prioridade: "alta", status: "aberto" },
        { id: 2, titulo: "B", descricao: "B", categoria: "software", prioridade: "media", status: "aberto" },
        { id: 3, titulo: "C", descricao: "C", categoria: "rede", prioridade: "baixa", status: "resolvido" },
      ]),
    )

    render(<App />)

    const resumo = within(screen.getByRole("region", { name: "Resumo dos chamados" }))
    expect(resumo.getByText("3")).not.toBeNull()
    expect(resumo.getByText("2")).not.toBeNull()
    expect(resumo.getByText("1")).not.toBeNull()
  })
})
