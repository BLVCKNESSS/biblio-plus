import { describe, it, expect, vi, afterEach } from 'vitest'
import { useBooks } from '../useBooks'

afterEach(() => vi.restoreAllMocks())

describe('useBooks', () => {
  it('charge les livres', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => [{ id: 1 }] })
    const { books, loading, error, load } = useBooks()
    await load()
    expect(books.value).toHaveLength(1)
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it("passe en erreur si le fichier n'existe pas", async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 404 })
    const { books, error, load } = useBooks()
    await load()
    expect(error.value).toBe('Erreur HTTP 404')
    expect(books.value).toHaveLength(0)
  })
})
