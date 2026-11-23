<script setup>
import { reactive, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const form = reactive({ name: '', email: '', message: '' })
const touched = reactive({ name: false, email: false, message: false })
const sent = ref(false)

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Votre nom est requis.' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Adresse e-mail invalide.',
  message: form.message.trim().length < 10 ? '10 caractères minimum.' : '',
}))
const isValid = computed(() => Object.values(errors.value).every((e) => !e))

function submit() {
  Object.keys(touched).forEach((k) => (touched[k] = true))
  if (!isValid.value) {
    // place le focus sur le premier champ en erreur
    const first = Object.keys(errors.value).find((k) => errors.value[k])
    document.getElementById(first)?.focus()
    return
  }
  sent.value = true // simulation : aucun back-end dans ce projet
}

function reset() {
  Object.assign(form, { name: '', email: '', message: '' })
  Object.assign(touched, { name: false, email: false, message: false })
  sent.value = false
}
</script>

<template>
  <div class="container contact">
    <h1 class="contact__title">Contact</h1>
    <p class="contact__intro">
      Une question sur un livre, un événement ou votre inscription ? Écrivez-nous.
    </p>

    <div class="contact__layout">
      <div v-if="sent" class="contact__panel contact__success" role="status">
        <p>Merci, votre message a bien été envoyé.</p>
        <BaseButton type="button" variant="ghost" @click="reset"
          >Envoyer un autre message</BaseButton
        >
      </div>

      <form v-else class="contact__panel" novalidate @submit.prevent="submit">
        <div class="field">
          <label for="name" class="field__label">Nom</label>
          <input
            id="name"
            v-model="form.name"
            class="field__input"
            autocomplete="name"
            :aria-invalid="touched.name && !!errors.name"
            aria-describedby="name-err"
            @blur="touched.name = true"
          />
          <p v-if="touched.name && errors.name" id="name-err" class="field__error">
            {{ errors.name }}
          </p>
        </div>

        <div class="field">
          <label for="email" class="field__label">E-mail</label>
          <input
            id="email"
            v-model="form.email"
            class="field__input"
            type="email"
            autocomplete="email"
            :aria-invalid="touched.email && !!errors.email"
            aria-describedby="email-err"
            @blur="touched.email = true"
          />
          <p v-if="touched.email && errors.email" id="email-err" class="field__error">
            {{ errors.email }}
          </p>
        </div>

        <div class="field">
          <label for="message" class="field__label">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            class="field__input"
            rows="6"
            :aria-invalid="touched.message && !!errors.message"
            aria-describedby="message-err"
            @blur="touched.message = true"
          ></textarea>
          <p v-if="touched.message && errors.message" id="message-err" class="field__error">
            {{ errors.message }}
          </p>
        </div>

        <BaseButton type="submit">Envoyer</BaseButton>
      </form>

      <aside class="contact__panel contact__infos" aria-labelledby="infos">
        <h2 id="infos" class="contact__subtitle">Infos pratiques</h2>
        <p><strong>Adresse</strong><br />[Adresse de la bibliothèque]</p>
        <p><strong>Horaires</strong><br />Du mardi au samedi · [Horaires]</p>
        <p><strong>Téléphone</strong><br />[Téléphone]</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.contact {
  padding-top: var(--space-8);
}
.contact__title {
  margin: 0;
  font-size: var(--fs-800);
}
.contact__intro {
  margin: var(--space-2) 0 var(--space-6);
  color: var(--color-text-muted);
}
.contact__layout {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--space-6);
}
.contact__panel {
  flex: 2 1 22rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.contact__infos {
  flex: 1 1 16rem;
  gap: var(--space-2);
}
.contact__infos p {
  margin: 0;
}
.contact__subtitle {
  margin: 0 0 var(--space-2);
  font-size: var(--fs-600);
}
.contact__success {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
}
.field__label {
  font-weight: 600;
}
.field__input {
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
}
.field__input[aria-invalid='true'] {
  border: 2px solid var(--color-danger);
}
.field__error {
  margin: 0;
  color: var(--color-danger);
  font-size: var(--fs-200);
}
</style>
