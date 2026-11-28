<script setup>
import BookCard from './BookCard.vue'
defineProps({
  books: { type: Array, required: true },
  favorites: { type: Array, default: () => [] }, // ids des livres favoris
})
defineEmits(['toggle-favorite'])
</script>

<template>
  <ul class="book-list">
    <li v-for="book in books" :key="book.id">
      <BookCard
        :book="book"
        :favorite="favorites.includes(book.id)"
        @toggle-favorite="$emit('toggle-favorite', $event)"
      />
    </li>
  </ul>
</template>

<style scoped>
/* Mobile-first : le style de base vise le plus petit écran */
.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}
@media (min-width: 40em) {
  /* ≈ 640 px : tablette portrait */
  .book-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 64em) {
  /* ≈ 1024 px : ordinateur */
  .book-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
