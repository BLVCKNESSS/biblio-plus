<script setup>
const model = defineModel({ type: String, default: '' })
</script>

<template>
  <form class="search" role="search" @submit.prevent>
    <label for="q" class="sr-only">Rechercher un livre</label>
    <input
      id="q"
      v-model="model"
      class="search__input"
      type="search"
      placeholder="Titre, auteur…"
    />
  </form>
</template>

<style scoped>
.search {
  width: 100%;
  max-width: 40rem;
}
.search__input {
  width: 100%;
  min-height: 3rem;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
}
</style>
