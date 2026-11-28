<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import BookList from '@/components/BookList.vue'
import BookListSkeleton from '@/components/BookListSkeleton.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useFavoritesStore } from '@/stores/favorites'

const { books, loading, error, load } = useBooks()
const favorites = useFavoritesStore()
onMounted(load)

const query = ref('')
const category = ref('')
const sort = ref('title')
const page = ref(1)
const PER_PAGE = 8

// Tri : ordre alphabétique français pour les textes (É avant F), numérique pour l'année
function compare(a, b) {
  const x = a[sort.value]
  const y = b[sort.value]
  return typeof x === 'string' ? x.localeCompare(y, 'fr') : x - y
}

const filtered = computed(() =>
  books.value
    .filter((b) => !category.value || b.category === category.value)
    .filter((b) =>
      (b.title + ' ' + b.author).toLowerCase().includes(query.value.trim().toLowerCase()),
    )
    .sort(compare),
)
const pageCount = computed(() => Math.ceil(filtered.value.length / PER_PAGE))
const visible = computed(() =>
  filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE),
)
const categories = computed(() => [...new Set(books.value.map((b) => b.category))])

watch([query, category, sort], () => (page.value = 1)) // retour page 1
</script>

<template>
  <div class="container catalogue">
    <h1 class="catalogue__title">Catalogue</h1>

    <div class="filters">
      <div class="filters__field filters__field--grow">
        <label for="cat-q">Recherche</label>
        <input id="cat-q" v-model="query" type="search" placeholder="Titre, auteur…" />
      </div>
      <div class="filters__field">
        <label for="cat-category">Catégorie</label>
        <select id="cat-category" v-model="category">
          <option value="">Toutes</option>
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>
      </div>
      <div class="filters__field">
        <label for="cat-sort">Trier par</label>
        <select id="cat-sort" v-model="sort">
          <option value="title">Titre</option>
          <option value="year">Année</option>
        </select>
      </div>
    </div>

    <h2 class="sr-only">Résultats</h2>
    <p v-if="!loading && !error" class="catalogue__count" role="status">
      {{ filtered.length }} livre{{ filtered.length > 1 ? 's' : '' }}
    </p>

    <div v-if="loading">
      <p class="sr-only" role="status">Chargement…</p>
      <BookListSkeleton />
    </div>
    <div v-else-if="error" role="alert" class="catalogue__message">
      <p>Impossible de charger le catalogue ({{ error }}).</p>
      <BaseButton type="button" @click="load">Réessayer</BaseButton>
    </div>
    <p v-else-if="!filtered.length" class="catalogue__message">Aucun résultat.</p>
    <template v-else>
      <BookList :books="visible" :favorites="favorites.ids" @toggle-favorite="favorites.toggle" />
      <nav v-if="pageCount > 1" class="pagination" aria-label="Pagination">
        <BaseButton variant="ghost" type="button" :disabled="page === 1" @click="page--">
          ← Précédent
        </BaseButton>
        <span aria-live="polite">Page {{ page }} / {{ pageCount }}</span>
        <BaseButton variant="ghost" type="button" :disabled="page === pageCount" @click="page++">
          Suivant →
        </BaseButton>
      </nav>
    </template>
  </div>
</template>

<style scoped>
.catalogue {
  padding-top: var(--space-8);
}
.catalogue__title {
  margin: 0 0 var(--space-6);
  font-size: var(--fs-800);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.filters__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1 1 12rem;
  font-size: var(--fs-200);
  font-weight: 600;
}
.filters__field--grow {
  flex: 3 1 16rem;
}
.filters input,
.filters select {
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-weight: 400;
}
.catalogue__count {
  margin: var(--space-4) 0;
  color: var(--color-text-muted);
}
.catalogue__message {
  padding: var(--space-6);
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-8);
}
</style>
