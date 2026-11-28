// src/stores/reservations.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

const KEY = 'biblio:reservations'

export const useReservationsStore = defineStore('reservations', () => {
  const items = ref(JSON.parse(localStorage.getItem(KEY) ?? '[]'))

  function add(reservation) {
    items.value.push({ ...reservation, date: new Date().toISOString() })
    localStorage.setItem(KEY, JSON.stringify(items.value))
  }

  return { items, add }
})
