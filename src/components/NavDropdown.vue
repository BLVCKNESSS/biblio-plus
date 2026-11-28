<script setup>
import { ref } from 'vue'

const open = ref(false)

// Le survol ne concerne que la souris ; au toucher et au clavier, on passe par le clic
const hoverOpen = (e) => {
  if (e.pointerType === 'mouse') open.value = true
}
const hoverClose = (e) => {
  if (e.pointerType === 'mouse') open.value = false
}
</script>

<template>
  <li
    class="nav-dropdown"
    @pointerenter="hoverOpen"
    @pointerleave="hoverClose"
    @keydown.esc="open = false"
  >
    <button
      class="nav-dropdown__btn"
      type="button"
      aria-haspopup="true"
      :aria-expanded="open"
      @click="open = !open"
    >
      Services
    </button>
    <Transition name="fade">
      <ul v-if="open" class="nav-dropdown__submenu">
        <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
        <li><RouterLink to="/favoris">Favoris</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.nav-dropdown {
  position: relative;
}
.nav-dropdown__btn {
  min-height: 2.75rem;
  padding: var(--space-2) 0;
  border: 0;
  border-bottom: 2px solid transparent;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.nav-dropdown__btn:hover {
  border-bottom-color: currentColor;
}
/* Mobile : le sous-menu s'insère dans le menu, sans flotter */
.nav-dropdown__submenu {
  margin: 0;
  padding: 0 0 0 var(--space-4);
  list-style: none;
}
.nav-dropdown__submenu a {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  color: inherit;
  text-decoration: none;
}

/* Ordinateur : sous-menu flottant sous le bouton */
@media (min-width: 64em) {
  .nav-dropdown__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 20;
    min-width: 12rem;
    padding: var(--space-2);
    background: var(--color-surface);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow);
  }
  .nav-dropdown__submenu a {
    padding: var(--space-2) var(--space-3);
    color: var(--color-text);
  }
  .nav-dropdown__submenu a:hover {
    background: var(--color-primary-soft);
  }
  .nav-dropdown__submenu :focus-visible {
    outline-color: var(--color-focus);
  }
}
</style>
