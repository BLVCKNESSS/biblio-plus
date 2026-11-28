<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import NavDropdown from '@/components/NavDropdown.vue'

const favorites = useFavoritesStore()
const route = useRoute()
const menuOpen = ref(false)

// Le menu mobile se referme après chaque navigation
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)
</script>

<template>
  <header class="app-header" @keydown.esc="menuOpen = false">
    <div class="app-header__inner container">
      <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>

      <button
        class="app-header__toggle"
        type="button"
        aria-controls="main-nav"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        Menu
      </button>

      <nav
        id="main-nav"
        class="app-header__menu"
        :class="{ 'is-open': menuOpen }"
        aria-label="Navigation principale"
      >
        <ul class="app-header__nav">
          <li><RouterLink to="/" class="app-header__link">Accueil</RouterLink></li>
          <li><RouterLink to="/catalogue" class="app-header__link">Catalogue</RouterLink></li>
          <li>
            <RouterLink to="/favoris" class="app-header__link">
              Favoris
              <span class="app-header__badge">
                {{ favorites.count }}<span class="sr-only"> favori(s)</span>
              </span>
            </RouterLink>
          </li>
          <li><RouterLink to="/contact" class="app-header__link">Contact</RouterLink></li>
          <NavDropdown />
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Mobile-first : logo + bouton « Menu » sur une ligne, menu replié dessous */
.app-header {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.app-header__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  padding-block: var(--space-2);
}
.app-header a {
  color: inherit;
  text-decoration: none;
}
.app-header__logo {
  font-size: var(--fs-600);
  font-weight: 700;
}
.app-header__toggle {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-4);
  border: 2px solid currentColor;
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.app-header__menu {
  display: none;
  flex-basis: 100%;
}
.app-header__menu.is-open {
  display: block;
}
.app-header__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0 0 var(--space-2);
}
.app-header__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  border-bottom: 2px solid transparent;
}
.app-header__link:hover {
  border-bottom-color: currentColor;
}
.app-header__nav a.router-link-active {
  font-weight: 700;
  border-bottom: 2px solid currentColor;
}
.app-header__badge {
  display: inline-block;
  min-width: 1.5rem;
  margin-left: var(--space-1);
  padding: 0 var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-primary-contrast);
  color: var(--color-primary);
  font-size: var(--fs-200);
  font-weight: 700;
  text-align: center;
}
.app-header :focus-visible {
  outline-color: var(--color-primary-contrast);
}

/* Ordinateur : le bouton disparaît, le menu est toujours visible */
@media (min-width: 64em) {
  .app-header__inner {
    padding-block: var(--space-4);
  }
  .app-header__toggle {
    display: none;
  }
  .app-header__menu {
    display: block;
    flex-basis: auto;
  }
  .app-header__nav {
    flex-direction: row;
    align-items: center;
    gap: var(--space-6);
    padding: 0;
  }
}
</style>
