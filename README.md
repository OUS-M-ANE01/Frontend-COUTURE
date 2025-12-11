# Application de Gestion de Couture - Sénégal 🧵

Application mobile de gestion d'atelier de couture développée avec React Native et Expo, spécialement conçue pour les couturiers sénégalais.

## 📱 Fonctionnalités

### Gestion des Clients
- Création et gestion de fiches clients complètes
- Enregistrement des mesures physiques personnalisables
- Historique des commandes par client
- Recherche rapide de clients

### Gestion des Commandes
- Création de commandes avec détails complets
- Suivi du statut : En attente, En cours, Prête, Livrée
- Gestion des paiements (avance, reste à payer)
- Filtrage par statut
- Notifications automatiques

### Catalogue de Modèles
- Galerie de modèles avec photos
- Catégorisation par genre (Homme, Femme, Enfant)
- Prix indicatifs et détails des tissus
- QR Code pour partage du catalogue

### Statistiques
- Revenus mensuels
- Nombre de commandes
- Modèles les plus populaires
- Tableau de bord visuel

### Notifications
- Alertes SMS pour commandes prêtes
- Notifications WhatsApp
- Configuration personnalisable

## 🚀 Installation

1. Installer les dépendances

   ```bash
   npm install
   ```

2. Lancer l'application

   ```bash
   npx expo start
   ```

3. Scanner le QR code avec Expo Go (Android/iOS)

## 📂 Structure du Projet

```
COUTURE-APP/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Écran d'accueil
│   │   ├── clients.tsx        # Liste des clients
│   │   ├── commandes.tsx      # Gestion des commandes
│   │   ├── catalogue.tsx      # Catalogue de modèles
│   │   └── profil.tsx         # Profil et paramètres
│   ├── client-detail.tsx      # Détails d'un client
│   └── _layout.tsx            # Layout principal
├── components/                 # Composants réutilisables
├── constants/
│   └── theme.ts               # Thème et couleurs
├── data/
│   └── mockData.ts            # Données de test
├── types/
│   └── index.ts               # Types TypeScript
└── hooks/                     # Hooks personnalisés
```

## 🎨 Design

L'application utilise une palette de couleurs inspirée des designs modernes :
- **Primaire** : Bleu profond (#2E3A87)
- **Secondaire** : Bleu royal (#4A5FC1)
- **Accent** : Bleu clair (#6C7FE8)
- **Succès** : Vert (#10B981)
- **Attention** : Orange (#F59E0B)
- **Danger** : Rouge (#EF4444)

## 📊 Données Mock

L'application utilise actuellement des données de test (mockData) pour :
- 3 clients exemples
- 5 modèles de vêtements
- 3 commandes en cours
- Statistiques mensuelles

Ces données seront remplacées par une API backend dans les prochaines versions.

## 🔜 Prochaines Étapes

- [ ] Intégration API backend
- [ ] Génération de QR Code fonctionnel
- [ ] Envoi réel de SMS/WhatsApp
- [ ] Intégration Orange Money / Wave
- [ ] Mode hors ligne avec synchronisation
- [ ] Export de rapports PDF
- [ ] Multi-langue (Français, Wolof)

## 🛠️ Technologies

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **TypeScript** - Typage statique
- **Expo Router** - Navigation
- **React Native Reanimated** - Animations

## 📱 Compatibilité

- iOS 13+
- Android 6.0+
- Web (via Expo Web)

## 👨‍💻 Développement

Pour contribuer au projet :

1. Cloner le repository
2. Créer une branche feature
3. Faire vos modifications
4. Tester sur iOS et Android
5. Soumettre une Pull Request

## 📄 Licence

Ce projet est développé pour les couturiers sénégalais.

---

Développé avec ❤️ pour la communauté des couturiers du Sénégal
