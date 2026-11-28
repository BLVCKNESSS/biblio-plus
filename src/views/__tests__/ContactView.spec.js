// src/views/__tests__/ContactView.spec.js
import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactView from '../ContactView.vue'

it("affiche les erreurs d'un formulaire vide", async () => {
  const wrapper = mount(ContactView)
  await wrapper.get('form').trigger('submit')
  expect(wrapper.text()).toContain('Adresse e-mail invalide.')
})
