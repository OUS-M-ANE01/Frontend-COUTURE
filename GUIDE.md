# Guide de l'Application de Gestion de Couture

## 🎯 Vue d'ensemble

Cette application mobile a été conçue spécifiquement pour les couturiers sénégalais afin de digitaliser et moderniser la gestion de leur atelier.

## 📱 Écrans Principaux

### 1. Accueil (index.tsx)
**Fonctionnalités :**
- Tableau de bord avec statistiques en temps réel
- Cartes de statistiques : Commandes en cours, Prêtes, Total clients
- Carte des revenus du mois avec graphique
- Liste des commandes récentes (3 dernières)
- Actions rapides : Nouveau client, Nouvelle commande, Catalogue, QR Code

**Design inspiré de :** Insightlancer - Dashboard moderne avec cartes colorées

### 2. Clients (clients.tsx)
**Fonctionnalités :**
- Liste complète de tous les clients
- Barre de recherche (par nom ou téléphone)
- Affichage des informations : Avatar, Nom, Téléphone, Adresse
- Badge de genre (Homme/Femme)
- Bouton flottant pour ajouter un nouveau client

**Design inspiré de :** Liste de contacts moderne avec avatars colorés

### 3. Commandes (commandes.tsx)
**Fonctionnalités :**
- Filtres par statut : Toutes, En attente, En cours, Prêtes, Livrées
- Cartes de commandes avec :
  - Avatar et nom du client
  - Nom du modèle
  - Dates (commande et livraison)
  - Tissu utilisé
  - Prix total et reste à payer
  - Badge de statut coloré
- Bouton flottant pour nouvelle commande

**Codes couleur des statuts :**
- 🟡 En attente : Orange (#F59E0B)
- 🔵 En cours : Bleu (#6C7FE8)
- 🟢 Prête : Vert (#10B981)
- ⚪ Livrée : Gris

### 4. Catalogue (catalogue.tsx)
**Fonctionnalités :**
- Filtres par catégorie : Tous, Homme, Femme, Enfant
- Grille de modèles (2 colonnes)
- Cartes avec :
  - Photo du modèle
  - Nom
  - Badge de catégorie
  - Type de tissu
  - Prix indicatif
- Bouton QR Code dans le header
- Bouton flottant pour ajouter un modèle

**Design inspiré de :** Galerie e-commerce moderne

### 5. Profil (profil.tsx)
**Fonctionnalités :**
- En-tête avec avatar et nom de l'atelier
- Statistiques : Commandes du mois, Revenus
- Paramètres de notifications :
  - Toggle SMS
  - Toggle WhatsApp
- Menu de paramètres :
  - Informations du profil
  - Mon QR Code
  - Moyens de paiement
  - Statistiques détaillées
- Section Support :
  - Aide & FAQ
  - Nous contacter
- Bouton de déconnexion

## 🎨 Palette de Couleurs

```typescript
Primaire: #2E3A87    // Bleu profond - Actions principales
Secondaire: #4A5FC1  // Bleu royal - Éléments secondaires
Accent: #6C7FE8      // Bleu clair - Highlights
Succès: #10B981      // Vert - Statuts positifs
Attention: #F59E0B   // Orange - Alertes
Danger: #EF4444      // Rouge - Actions critiques
Carte: #FFFFFF       // Blanc - Fond des cartes
Fond: #F5F7FA        // Gris très clair - Fond général
Bordure: #E5E7EB     // Gris clair - Séparateurs
```

## 📊 Structure des Données

### Client
```typescript
{
  id: string
  prenom: string
  nom: string
  telephone: string
  whatsapp?: string
  sexe: 'homme' | 'femme' | 'enfant'
  adresse?: string
  mesures: {
    longueur?: number
    largeur_epaules?: number
    tour_poitrine?: number
    tour_taille?: number
    tour_hanches?: number
    longueur_manche?: number
    tour_bras?: number
    tour_cou?: number
    // Mesures pantalon
    longueur_pantalon?: number
    tour_cuisse?: number
    entrejambe?: number
  }
  createdAt: string
}
```

### Commande
```typescript
{
  id: string
  clientId: string
  modeleId?: string
  date_commande: string
  date_livraison_prevue: string
  statut: 'en_attente' | 'en_cours' | 'prete' | 'livree'
  prix: number
  avance?: number
  reste?: number
  tissu?: string
  couleur?: string
  notes?: string
  particularites?: string
}
```

### Modèle
```typescript
{
  id: string
  nom: string
  photo: string
  categorie: 'homme' | 'femme' | 'enfant'
  tissu?: string
  prix_indicatif: number
  description?: string
  occasion?: string
}
```

## 🚀 Prochaines Fonctionnalités à Implémenter

### Phase 1 - Formulaires
- [ ] Formulaire d'ajout de client
- [ ] Formulaire d'ajout de commande
- [ ] Formulaire d'ajout de modèle
- [ ] Écran de détail client (client-detail.tsx déjà créé)
- [ ] Écran de détail commande
- [ ] Écran de détail modèle

### Phase 2 - Fonctionnalités Avancées
- [ ] Génération de QR Code pour le catalogue
- [ ] Scanner de QR Code
- [ ] Système de notifications push
- [ ] Intégration SMS (via API Twilio ou similaire)
- [ ] Intégration WhatsApp Business API
- [ ] Gestion des photos (appareil photo + galerie)

### Phase 3 - Paiements
- [ ] Intégration Orange Money
- [ ] Intégration Wave
- [ ] Historique des paiements
- [ ] Reçus de paiement

### Phase 4 - Backend & Sync
- [ ] API REST ou GraphQL
- [ ] Authentification (Firebase Auth ou JWT)
- [ ] Base de données (Firebase, Supabase, ou PostgreSQL)
- [ ] Synchronisation hors ligne
- [ ] Backup automatique

### Phase 5 - Rapports & Analytics
- [ ] Graphiques de revenus
- [ ] Statistiques détaillées
- [ ] Export PDF des commandes
- [ ] Export Excel des données
- [ ] Rapports mensuels automatiques

## 🔧 Configuration Requise

### Dépendances Actuelles
- React Native 0.81.5
- Expo SDK 54
- TypeScript 5.9.2
- Expo Router 6.0.17

### Dépendances à Ajouter (Futures)
```bash
# Pour QR Code
npm install react-native-qrcode-svg

# Pour les graphiques
npm install react-native-chart-kit

# Pour les images
npm install expo-image-picker

# Pour le stockage local
npm install @react-native-async-storage/async-storage

# Pour les notifications
npm install expo-notifications

# Pour les SMS
npm install react-native-sms
```

## 📝 Notes de Développement

### Conventions de Code
- Utiliser TypeScript pour tous les nouveaux fichiers
- Nommer les composants en PascalCase
- Nommer les fichiers en kebab-case
- Utiliser les hooks React (useState, useEffect, etc.)
- Préférer les functional components

### Structure des Fichiers
```
app/
  (tabs)/           # Écrans principaux avec navigation
  [detail]/         # Écrans de détail
  _layout.tsx       # Layout racine
components/         # Composants réutilisables
constants/          # Constantes (thème, config)
data/              # Données mock
types/             # Types TypeScript
hooks/             # Hooks personnalisés
utils/             # Fonctions utilitaires
services/          # Services API (à créer)
```

### Bonnes Pratiques
1. Toujours typer les props des composants
2. Utiliser les couleurs du thème (Colors[colorScheme])
3. Gérer les états de chargement
4. Gérer les erreurs
5. Ajouter des messages de confirmation
6. Optimiser les images
7. Tester sur iOS et Android

## 🌍 Contexte Sénégalais

### Adaptations Locales
- Devise : FCFA (Franc CFA)
- Langues : Français (interface), Wolof (futur)
- Paiements mobiles : Orange Money, Wave
- Formats de téléphone : +221 XX XXX XX XX
- Tissus locaux : Bazin, Wax, Coton

### Occasions Typiques
- Tabaski (Aïd el-Kebir)
- Korité (Aïd el-Fitr)
- Mariages (Takk)
- Baptêmes (Nguenté)
- Cérémonies familiales

### Types de Vêtements
- Boubou (homme/femme)
- Kaftan
- Ensemble Mermoz
- Ensemble Tabaski
- Tenues de cérémonie

## 📞 Support

Pour toute question ou suggestion :
- Email : support@couture-app.sn
- WhatsApp : +221 XX XXX XX XX

---

**Dernière mise à jour :** Décembre 2024
