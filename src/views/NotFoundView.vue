<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="container not-found">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="not-found__title">Page introuvable</h1>
    <p>La page demandée n'existe pas ou a été déplacée.</p>
    <div class="not-found__actions">
      <BaseButton to="/">Retour à l'accueil</BaseButton>
      <BaseButton to="/catalogue" variant="ghost">Voir le catalogue</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  padding-block: var(--space-12);
  text-align: center;
}
.not-found__code {
  margin: 0;
  font-size: 6rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}
.not-found__title {
  margin: var(--space-4) 0;
  font-size: var(--fs-800);
}
.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
}
</style>
