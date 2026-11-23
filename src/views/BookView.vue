<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '@/composables/useBooks'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()
const { books, loading, error, load } = useBooks()
const book = computed(() => books.value.find((b) => b.id === Number(props.id)))

onMounted(async () => {
  await load()
  if (error.value) return
  if (!book.value) {
    router.replace({ name: 'not-found', params: { pathMatch: ['livres', props.id] } })
    return
  }
  document.title = `${book.value.title} · Biblio+`
})
</script>

<template>
  <div class="container detail">
    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>Impossible de charger ce livre ({{ error }}).</p>
      <BaseButton type="button" @click="load">Réessayer</BaseButton>
    </div>
    <article v-else-if="book" class="detail__book">
      <img
        class="detail__cover"
        :src="book.cover"
        width="200"
        height="300"
        :alt="'Couverture de ' + book.title"
      />
      <div class="detail__body">
        <h1 class="detail__title">{{ book.title }}</h1>
        <p class="detail__meta">{{ book.author }} · {{ book.year }} · {{ book.category }}</p>
        <p class="detail__status" :class="{ 'detail__status--off': !book.available }">
          {{ book.available ? 'Disponible' : 'Emprunté' }}
        </p>
        <p class="detail__summary">{{ book.summary }}</p>
        <BaseButton to="/catalogue" variant="ghost">← Retour au catalogue</BaseButton>
      </div>
    </article>
  </div>
</template>

<style scoped>
.detail {
  padding-top: var(--space-8);
}
.detail__book {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.detail__cover {
  width: 14rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
}
.detail__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  flex: 1 1 18rem;
}
.detail__title {
  margin: 0;
  font-size: var(--fs-800);
}
.detail__meta {
  margin: 0;
  color: var(--color-text-muted);
}
.detail__status {
  margin: 0;
  padding: var(--space-1) var(--space-3);
  border: 1px solid currentColor;
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
}
.detail__status--off {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
.detail__summary {
  margin: 0;
  max-width: 40rem;
}
</style>
