<script setup>
defineProps({ count: { type: Number, default: 8 } })
</script>

<template>
  <!-- Emplacements réservés pendant le chargement : évite que la page « saute » -->
  <ul class="skeleton" aria-hidden="true">
    <li v-for="n in count" :key="n" class="skeleton__card"></li>
  </ul>
</template>

<style scoped>
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
