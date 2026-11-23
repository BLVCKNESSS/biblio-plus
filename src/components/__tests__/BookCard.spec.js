import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookCard from '../BookCard.vue'

const book = {
  id: 2,
  title: 'Germinal',
  author: 'Émile Zola',
  available: false,
  cover: '/covers/germinal.jpg',
}

describe('BookCard', () => {
  it('affiche le titre et le statut', () => {
    const w = mount(BookCard, {
      props: { book },
      global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } },
    })
    expect(w.text()).toContain('Germinal')
    expect(w.text()).toContain('Emprunté')
  })

  it('émet toggle-favorite avec l’id du livre', async () => {
    const w = mount(BookCard, {
      props: { book },
      global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } },
    })
    await w.get('button').trigger('click')
    expect(w.emitted('toggle-favorite')[0]).toEqual([2])
  })
})
