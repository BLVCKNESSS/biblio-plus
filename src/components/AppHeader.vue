<script setup>
import { useFavoritesStore } from '@/stores/favorites'
import NavDropdown from '@/components/NavDropdown.vue'

const favorites = useFavoritesStore()
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner container">
      <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>
      <nav aria-label="Navigation principale">
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
.app-header {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.app-header__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  padding-block: var(--space-4);
}
.app-header a {
  color: inherit;
  text-decoration: none;
}
.app-header__logo {
  font-size: var(--fs-600);
  font-weight: 700;
}
.app-header__nav {
  display: flex;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}
.app-header__link {
  display: inline-block;
  padding-block: var(--space-2);
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
</style>
