// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import App from "./App"

const STORAGE_KEY = "sistema-chamados:chamados"

describe("Fluxos preservados na refatoração", () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it("preserva o filtro ao abrir e cancelar o formulário e ao resolver um chamado", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
      { id: 1, titulo: "Aberto", descricao: "A", categoria: "rede", prioridade: "alta", status: "aberto" },
      { id: 2, titulo: "Finalizado", descricao: "B", categoria: "software", prioridade: "baixa", status: "resolvido" },
    ]))
    render(<App />)
    fireEvent.change(screen.getByLabelText("Filtrar por status"), { target: { value: "aberto" } })
    expect(screen.queryByText("Finalizado")).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }))
    expect(screen.queryByText("Finalizado")).toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "Marcar como resolvido" }))
    expect(screen.getByText("Nenhum chamado com o status selecionado.")).not.toBeNull()

    fireEvent.change(screen.getByLabelText("Filtrar por status"), { target: { value: "resolvido" } })
    expect(screen.getByText("Aberto")).not.toBeNull()
    expect(screen.getByText("Finalizado")).not.toBeNull()
    expect(screen.queryByRole("button", { name: "Marcar como resolvido" })).toBeNull()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)[0].status).toBe("resolvido")
    const resumo = within(screen.getByRole("region", { name: "Resumo dos chamados" }))
    expect(resumo.getByText("0")).not.toBeNull()
    expect(resumo.getAllByText("2")).toHaveLength(2)
  })

  it("descarta o formulário cancelado sem criar chamado", () => {
    render(<App />)
    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "Rascunho" } })
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }))
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([])

    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    expect((screen.getByLabelText("Título") as HTMLInputElement).value).toBe("")
    expect((screen.getByLabelText("Prioridade") as HTMLSelectElement).value).toBe("media")
  })

  it("mantém o formulário aberto sem salvar quando faltam campos obrigatórios", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {})
    render(<App />)
    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "   " } })
    fireEvent.click(screen.getByRole("button", { name: "Criar chamado" }))
    expect(screen.getByLabelText("Título")).not.toBeNull()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([])
  })
})
