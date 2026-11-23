// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Accueil' } },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('@/views/CatalogueView.vue'), // lazy loading
      meta: { title: 'Catalogue' },
    },
    {
      path: '/livres/:id',
      name: 'book',
      props: true,
      component: () => import('@/views/BookView.vue'),
      meta: { title: 'Détail du livre' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Contact' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page introuvable' },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Pour aller plus loin : titre de l'onglet mis à jour à chaque navigation
router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Biblio+'} · Biblio+`
})

export default router
