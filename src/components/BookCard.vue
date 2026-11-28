<script setup>
defineProps({
  book: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
  priority: { type: Boolean, default: false }, // image visible dès l'arrivée : pas de lazy
})
const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <article class="book-card">
    <img
      class="book-card__cover"
      :src="book.cover"
      width="200"
      height="300"
      :alt="'Couverture de ' + book.title"
      :loading="priority ? 'eager' : 'lazy'"
    />
    <div class="book-card__body">
      <h3 class="book-card__title">
        <RouterLink class="book-card__link" :to="{ name: 'book', params: { id: book.id } }">
          {{ book.title }}
        </RouterLink>
      </h3>
      <p class="book-card__author">{{ book.author }}</p>
      <p class="book-card__status" :class="{ 'book-card__status--off': !book.available }">
        {{ book.available ? 'Disponible' : 'Emprunté' }}
      </p>
      <button
        class="book-card__fav"
        type="button"
        :aria-pressed="favorite"
        @click="emit('toggle-favorite', book.id)"
      >
        {{ favorite ? '★ Retirer des favoris' : '☆ Ajouter aux favoris' }}
      </button>
      <slot name="actions" />
    </div>
  </article>
</template>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.book-card__cover {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--radius) var(--radius) 0 0;
}
.book-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
  padding: var(--space-4);
}
.book-card__title {
  margin: 0;
  font-size: var(--fs-300);
}
.book-card__link {
  color: inherit;
  text-decoration: none;
}
.book-card__link:hover {
  text-decoration: underline;
}
.book-card__author {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-200);
}
.book-card__status {
  align-self: flex-start;
  margin: 0;
  padding: var(--space-1) var(--space-3);
  border: 1px solid currentColor;
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: var(--fs-200);
  font-weight: 600;
}
.book-card__status--off {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
.book-card__fav {
  margin-top: auto;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-primary);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.book-card__fav:hover,
.book-card__fav[aria-pressed='true'] {
  background: var(--color-primary-soft);
}
</style>
