// src/stores/__tests__/favorites.spec.js
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useFavoritesStore } from '../favorites'

describe('favorites', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('ajoute puis retire un favori', () => {
    const store = useFavoritesStore()
    store.toggle(1)
    expect(store.has(1)).toBe(true)
    expect(store.count).toBe(1)
    store.toggle(1)
    expect(store.has(1)).toBe(false)
    expect(store.count).toBe(0)
  })

  it('persiste les favoris dans le localStorage', async () => {
    const store = useFavoritesStore()
    store.toggle(3)
    await nextTick()
    expect(JSON.parse(localStorage.getItem('biblio:favorites'))).toEqual([3])
  })
})
