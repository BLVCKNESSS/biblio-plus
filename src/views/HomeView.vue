<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import BaseButton from '@/components/BaseButton.vue'

const books = ref([])
const query = ref('')
const favorites = ref([])
const loading = ref(true)

// Recherche sur le titre ou l'auteur, 8 livres maximum
const featured = computed(() => {
  const q = query.value.trim().toLowerCase()
  return books.value
    .filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    .slice(0, 8)
})

// Exemples d'événements (à remplacer par ceux de la bibliothèque)
const events = [
  {
    id: 1,
    day: '06',
    month: 'déc.',
    title: 'Heure du conte pour les 4-7 ans',
    info: 'Samedi · 10h30 · Espace jeunesse',
  },
  {
    id: 2,
    day: '11',
    month: 'déc.',
    title: 'Club de lecture : romans classiques',
    info: 'Jeudi · 18h00 · Salle 1',
  },
  {
    id: 3,
    day: '17',
    month: 'déc.',
    title: 'Atelier numérique : réserver en ligne',
    info: 'Mercredi · 14h00 · Espace multimédia',
  },
]

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((f) => f !== id)
    : [...favorites.value, id]
}

onMounted(async () => {
  const res = await fetch(import.meta.env.BASE_URL + 'data/books.json')
  books.value = await res.json()
  loading.value = false
})
</script>

<template>
  <section class="hero">
    <div class="hero__inner container">
      <h1 class="hero__title">Bienvenue à la bibliothèque</h1>
      <p class="hero__text">Recherchez un livre et vérifiez tout de suite s'il est disponible.</p>
      <SearchBar v-model="query" />
    </div>
  </section>

  <div class="container home">
    <section aria-labelledby="coeur">
      <h2 id="coeur" class="home__title">Coups de cœur</h2>
      <p v-if="books.length && !featured.length" role="status">
        Aucun livre ne correspond à « {{ query }} ».
      </p>
      <!-- Emplacements réservés pendant le chargement : évite que la page « saute » -->
      <ul v-if="loading" class="skeleton" aria-hidden="true">
        <li v-for="n in 8" :key="n" class="skeleton__card"></li>
      </ul>
      <BookList v-else :books="featured" :favorites="favorites" @toggle-favorite="toggleFavorite" />
      <p class="home__more">
        <BaseButton to="/catalogue" variant="ghost">Voir tout le catalogue</BaseButton>
      </p>
    </section>

    <section aria-labelledby="agenda">
      <h2 id="agenda" class="home__title">Événements à venir</h2>
      <ul class="events">
        <li v-for="event in events" :key="event.id" class="events__item">
          <p class="events__date">
            <span class="events__day">{{ event.day }}</span> {{ event.month }}
          </p>
          <div>
            <h3 class="events__title">{{ event.title }}</h3>
            <p class="events__info">{{ event.info }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: var(--color-primary-soft);
  padding-block: var(--space-12);
}
.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}
.hero__title {
  margin: 0;
  font-size: var(--fs-800);
}
.hero__text {
  margin: 0;
  color: var(--color-text-muted);
}
.home {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  padding-top: var(--space-8);
}
.home__title {
  margin: 0 0 var(--space-4);
  font-size: var(--fs-600);
}
.home__more {
  margin: var(--space-6) 0 0;
  text-align: center;
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.events__item {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-6);
}
.events__item + .events__item {
  border-top: 1px solid var(--color-border);
}
.events__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 4rem;
  margin: 0;
  padding: var(--space-2);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  font-size: var(--fs-200);
}
.events__day {
  font-size: var(--fs-600);
  font-weight: 700;
  line-height: 1;
}
.events__title {
  margin: 0;
  font-size: var(--fs-400);
}
.events__info {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
  font-size: var(--fs-200);
}
.skeleton {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
}
.skeleton__card {
  aspect-ratio: 2 / 3;
  padding-bottom: 13rem;
  box-sizing: content-box;
  border-radius: var(--radius);
  background: var(--color-border);
  opacity: 0.4;
}
</style>
