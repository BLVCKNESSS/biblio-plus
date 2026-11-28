<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({ open: Boolean, title: String })
const emit = defineEmits(['close'])

const dialog = ref(null)

// À l'ouverture, la fenêtre prend le focus (pour que Échap fonctionne)
watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      dialog.value?.focus()
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="modal" @click.self="emit('close')" @keydown.esc="emit('close')">
        <div
          ref="dialog"
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
        >
          <h2 id="modal-title" class="modal__title">{{ title }}</h2>
          <slot />
          <button class="modal__close" type="button" @click="emit('close')">Fermer</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<!-- Styles globaux : la transition "fade" est aussi utilisée par NavDropdown -->
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.modal__dialog {
  width: 90%;
  max-width: 28rem;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius);
}
.modal__dialog:focus {
  outline: none; /* la fenêtre reçoit le focus par code, elle n'est pas interactive */
}
.modal__title {
  margin: 0 0 var(--space-4);
  font-size: var(--fs-600);
}
.modal__close {
  margin-top: var(--space-4);
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-6);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-primary);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.modal__close:hover {
  background: var(--color-primary-soft);
}
</style>
