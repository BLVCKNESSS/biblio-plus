<template>
  <footer class="app-footer">
    <div class="app-footer__inner container">
      <div class="app-footer__col">
        <p class="app-footer__title">Biblio+</p>
        <p>Bibliothèque municipale</p>
        <p>[Adresse de la bibliothèque]</p>
      </div>
      <div class="app-footer__col">
        <p class="app-footer__title">Horaires</p>
        <p>Du mardi au samedi</p>
        <p>[Horaires d'ouverture]</p>
      </div>
      <div class="app-footer__col">
        <p class="app-footer__title">Nous écrire</p>
        <p><RouterLink to="/contact" class="app-footer__link">Formulaire de contact</RouterLink></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: var(--space-12);
  background: var(--color-text);
  color: var(--color-primary-contrast);
  font-size: var(--fs-200);
}
.app-footer__inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: var(--space-6);
  padding-block: var(--space-8);
}
.app-footer p {
  margin: 0 0 var(--space-1);
}
.app-footer__title {
  font-weight: 700;
}
.app-footer__link {
  color: inherit;
}
.app-footer :focus-visible {
  outline-color: var(--color-primary-contrast);
}
</style>
