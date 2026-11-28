<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '@/composables/useBooks'
import { useReservationsStore } from '@/stores/reservations'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()
const { books, loading, error, load } = useBooks()
const reservations = useReservationsStore()
const book = computed(() => books.value.find((b) => b.id === Number(props.id)))

onMounted(async () => {
  await load()
  if (error.value) return
  if (!book.value) {
    router.replace({ name: 'not-found', params: { pathMatch: ['livres', props.id] } })
    return
  }
  document.title = `${book.value.title} · Biblio+`
})

// --- Réservation (modale + formulaire validé) ---
const open = ref(false)
const sent = ref(false)
const today = new Date().toISOString().slice(0, 10)

const form = reactive({ name: '', email: '', pickup: '' })
const touched = reactive({ name: false, email: false, pickup: false })

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Votre nom est requis.' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Adresse e-mail invalide.',
  pickup: !form.pickup
    ? 'Choisissez une date de retrait.'
    : form.pickup < today
      ? 'La date ne peut pas être dans le passé.'
      : '',
}))
const isValid = computed(() => Object.values(errors.value).every((e) => !e))

function openModal() {
  sent.value = false
  open.value = true
}

function submit() {
  Object.keys(touched).forEach((k) => (touched[k] = true))
  if (!isValid.value) return
  reservations.add({
    bookId: book.value.id,
    title: book.value.title,
    name: form.name.trim(),
    email: form.email.trim(),
    pickup: form.pickup,
  })
  sent.value = true
  form.name = ''
  form.email = ''
  form.pickup = ''
  Object.keys(touched).forEach((k) => (touched[k] = false))
}
</script>

<template>
  <div class="container detail">
    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>Impossible de charger ce livre ({{ error }}).</p>
      <BaseButton type="button" @click="load">Réessayer</BaseButton>
    </div>
    <article v-else-if="book" class="detail__book">
      <img
        class="detail__cover"
        :src="book.cover"
        width="200"
        height="300"
        :alt="'Couverture de ' + book.title"
      />
      <div class="detail__body">
        <h1 class="detail__title">{{ book.title }}</h1>
        <p class="detail__meta">{{ book.author }} · {{ book.year }} · {{ book.category }}</p>
        <p class="detail__status" :class="{ 'detail__status--off': !book.available }">
          {{ book.available ? 'Disponible' : 'Emprunté' }}
        </p>
        <p class="detail__summary">{{ book.summary }}</p>
        <div class="detail__actions">
          <BaseButton type="button" :disabled="!book.available" @click="openModal">
            Réserver
          </BaseButton>
          <BaseButton to="/catalogue" variant="ghost">← Retour au catalogue</BaseButton>
        </div>
      </div>
    </article>

    <BaseModal :open="open" title="Réserver ce livre" @close="open = false">
      <p v-if="sent" class="reserve__ok" role="status">
        Merci, votre réservation est enregistrée.
      </p>
      <form v-else novalidate @submit.prevent="submit">
        <div class="field">
          <label for="res-name">Nom</label>
          <input
            id="res-name"
            v-model="form.name"
            autocomplete="name"
            :aria-invalid="touched.name && !!errors.name"
            aria-describedby="res-name-err"
            @blur="touched.name = true"
          />
          <p v-if="touched.name && errors.name" id="res-name-err" class="field__error">
            {{ errors.name }}
          </p>
        </div>

        <div class="field">
          <label for="res-email">E-mail</label>
          <input
            id="res-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            :aria-invalid="touched.email && !!errors.email"
            aria-describedby="res-email-err"
            @blur="touched.email = true"
          />
          <p v-if="touched.email && errors.email" id="res-email-err" class="field__error">
            {{ errors.email }}
          </p>
        </div>

        <div class="field">
          <label for="res-pickup">Date de retrait</label>
          <input
            id="res-pickup"
            v-model="form.pickup"
            type="date"
            :min="today"
            :aria-invalid="touched.pickup && !!errors.pickup"
            aria-describedby="res-pickup-err"
            @blur="touched.pickup = true"
          />
          <p v-if="touched.pickup && errors.pickup" id="res-pickup-err" class="field__error">
            {{ errors.pickup }}
          </p>
        </div>

        <BaseButton type="submit">Confirmer</BaseButton>
      </form>
    </BaseModal>
  </div>
</template>

<style scoped>
.detail {
  padding-top: var(--space-8);
}
.detail__book {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.detail__cover {
  width: 14rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
}
.detail__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  flex: 1 1 18rem;
}
.detail__title {
  margin: 0;
  font-size: var(--fs-800);
}
.detail__meta {
  margin: 0;
  color: var(--color-text-muted);
}
.detail__status {
  margin: 0;
  padding: var(--space-1) var(--space-3);
  border: 1px solid currentColor;
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
}
.detail__status--off {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}
.detail__summary {
  margin: 0;
  max-width: 40rem;
}
.detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

/* Formulaire de la modale (le contenu du slot reçoit les styles de cette vue) */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
  font-weight: 600;
}
.field input {
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-weight: 400;
}
.field input[aria-invalid='true'] {
  border-color: var(--color-danger);
}
.field__error {
  margin: 0;
  color: var(--color-danger);
  font-size: var(--fs-200);
  font-weight: 400;
}
.reserve__ok {
  margin: 0;
  color: var(--color-primary);
  font-weight: 600;
}
</style>
