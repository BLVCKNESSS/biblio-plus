# Rapport d'audit — Séance 2 (page d'accueil)

Conditions : `npm run build` puis `npm run preview` (http://localhost:4173), Lighthouse en mode Navigation, appareil Mobile.

| Catégorie | Avant corrections | Après corrections |
|---|---|---|
| Performance | 84 | 100 |
| Accessibilité | 100 | 100 |
| Bonnes pratiques | 100 | 100 |
| SEO | 92 | 100 |

## axe DevTools

- Violations au premier scan : [à noter après ton scan]
- Détail des trois premières : [règle — élément concerné]

## Corrections apportées

1. **Décalage de mise en page (CLS 0,37 → 0)** : les cartes arrivaient après le chargement de books.json et poussaient la section Événements vers le bas. Ajout d'emplacements réservés (squelettes) pendant le chargement.
2. **robots.txt absent (SEO)** : ajout de `public/robots.txt`.
3. **Langue et titre de la page** : `lang="fr"`, un vrai `<title>` et une meta description dans `index.html`.
4. **Images** : couvertures avec un `alt` (« Couverture de … »), `width`/`height` et `loading="lazy"`.
5. **Clavier** : lien d'évitement « Aller au contenu », focus visible (contour bleu de 3px) et zones cliquables d'au moins 44px.

## Corrections restant à apporter

- [ ] Remplacer les couvertures provisoires par les vraies (WebP de préférence).
- [ ] Remplacer les textes provisoires du pied de page (adresse, horaires).
- [ ] Créer les pages Catalogue et Contact (séance 3) : les liens du menu ne mènent encore nulle part.
