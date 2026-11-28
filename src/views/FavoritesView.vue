<script setup>
import { computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavoritesStore } from '@/stores/favorites'
import BookList from '@/components/BookList.vue'
import BookListSkeleton from '@/components/BookListSkeleton.vue'
import BaseButton from '@/components/BaseButton.vue'

const { books, loading, error, load } = useBooks()
const favorites = useFavoritesStore()
onMounted(load)

const list = computed(() => books.value.filter((b) => favorites.has(b.id)))
</script>

<template>
  <div class="container favorites">
    <h1 class="favorites__title">Mes favoris</h1>

    <div v-if="loading">
      <p class="sr-only" role="status">Chargement…</p>
      <BookListSkeleton :count="4" />
    </div>
    <div v-else-if="error" role="alert" class="favorites__message">
      <p>Impossible de charger les livres ({{ error }}).</p>
      <BaseButton type="button" @click="load">Réessayer</BaseButton>
    </div>
    <div v-else-if="!list.length" class="favorites__message" role="status">
      <p>Vous n'avez encore aucun favori.</p>
      <BaseButton to="/catalogue">Parcourir le catalogue</BaseButton>
    </div>
    <BookList v-else :books="list" :favorites="favorites.ids" @toggle-favorite="favorites.toggle" />
  </div>
</template>

<style scoped>
.favorites {
  padding-top: var(--space-8);
}
.favorites__title {
  margin: 0 0 var(--space-6);
  font-size: var(--fs-800);
}
.favorites__message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  text-align: center;
}
</style>
