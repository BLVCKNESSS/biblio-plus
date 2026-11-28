<script setup>
import { ref, computed } from 'vue'
import BookCard from '@/components/BookCard.vue'

const props = defineProps({ items: { type: Array, required: true } })

const index = ref(0)
const current = computed(() => props.items[index.value])
const next = () => (index.value = (index.value + 1) % props.items.length)
const prev = () => (index.value = (index.value - 1 + props.items.length) % props.items.length)
</script>

<template>
  <section
    class="carousel"
    aria-roledescription="carrousel"
    aria-label="Coups de cœur"
    @keydown.left="prev"
    @keydown.right="next"
  >
    <button class="carousel__btn" type="button" aria-label="Livre précédent" @click="prev">‹</button>
    <div class="carousel__stage">
      <Transition name="slide" mode="out-in">
        <BookCard v-if="current" :key="current.id" :book="current" />
      </Transition>
    </div>
    <button class="carousel__btn" type="button" aria-label="Livre suivant" @click="next">›</button>
    <p class="sr-only" aria-live="polite">Livre {{ index + 1 }} sur {{ items.length }}</p>
  </section>
</template>

<style scoped>
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}
.carousel__stage {
  width: 100%;
  max-width: 14rem;
}
.carousel__btn {
  min-width: 2.75rem;
  min-height: 2.75rem;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-primary);
  font-size: var(--fs-600);
  line-height: 1;
  cursor: pointer;
}
.carousel__btn:hover {
  background: var(--color-primary-soft);
}

.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
