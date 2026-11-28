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

---

# Séance 3 — Audit des nouvelles pages (Lighthouse mobile, `npm run preview`)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| /catalogue | ~80 | 100 (98 avant correction) | 100 | 100 |
| /livres/3 | ~83 | 100 | 100 | 100 |
| /contact | ~82 | 100 | 100 | 100 |

Correction : ajout d'un `<h2>` (masqué visuellement) sur le catalogue, pour que l'ordre des titres ne saute pas du h1 au h3.

À traiter en séance 5 : la performance des pages chargées à la demande (~80) vient du chargement en cascade (fichier JS de la page, puis books.json). Pistes : précharger books.json, convertir les couvertures en WebP.

---

# Séance 5 · Mesures avant / après optimisation

| Page | Catégorie | Avant | Après |
|---|---|---|---|
| Accueil | Performance | … | … |
| Accueil | Accessibilité | … | … |
| Accueil | Bonnes pratiques | … | … |
| Accueil | SEO | … | … |
| Catalogue | Performance | … | … |
| Catalogue | Accessibilité | … | … |
| Catalogue | Bonnes pratiques | … | … |
| Catalogue | SEO | … | … |

## Corrections apportées

1. … (ex. couvertures converties en WebP : XX Mo → XX Ko)
2. …
3. …

## Écarts restants et justification

…