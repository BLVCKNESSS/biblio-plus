<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost
  to: { type: [String, Object], default: null }, // lien interne si renseigné
})
</script>

<template>
  <component :is="to ? 'RouterLink' : 'button'" :to="to" :class="['btn', 'btn--' + variant]">
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem; /* 44px : cible tactile confortable */
  padding: var(--space-2) var(--space-6);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font: inherit;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
.btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.btn--primary:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}
.btn--ghost {
  background: transparent;
  color: var(--color-primary);
}
.btn--ghost:hover {
  background: var(--color-primary-soft);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
