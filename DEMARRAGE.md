# 🚀 Guide de Démarrage Rapide

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1. **Node.js** (version 18 ou supérieure)
   - Télécharger sur : https://nodejs.org/

2. **Expo Go** sur votre téléphone
   - iOS : https://apps.apple.com/app/expo-go/id982107779
   - Android : https://play.google.com/store/apps/details?id=host.exp.exponent

## Installation

### Étape 1 : Installer les dépendances

Ouvrez un terminal dans le dossier COUTURE-APP et exécutez :

```bash
npm install
```

Cette commande va installer toutes les dépendances nécessaires (React Native, Expo, etc.)

### Étape 2 : Lancer l'application

```bash
npx expo start
```

ou simplement :

```bash
npm start
```

## Tester l'Application

### Sur Téléphone (Recommandé)

1. Assurez-vous que votre téléphone et votre ordinateur sont sur le même réseau WiFi
2. Ouvrez l'application **Expo Go** sur votre téléphone
3. Scannez le QR code affiché dans le terminal :
   - **iOS** : Utilisez l'appareil photo natif
   - **Android** : Utilisez le scanner dans l'app Expo Go

### Sur Émulateur/Simulateur

#### Android (Windows/Mac/Linux)
```bash
npm run android
```
Nécessite Android Studio et un émulateur configuré.

#### iOS (Mac uniquement)
```bash
npm run ios
```
Nécessite Xcode et un simulateur iOS.

### Sur Navigateur Web
```bash
npm run web
```
L'application s'ouvrira dans votre navigateur (fonctionnalités limitées).

## Structure de Navigation

Une fois l'application lancée, vous verrez 5 onglets en bas :

1. **🏠 Accueil** - Tableau de bord avec statistiques
2. **👥 Clients** - Liste de vos clients
3. **📋 Commandes** - Gestion des commandes
4. **📸 Catalogue** - Vos modèles de vêtements
5. **👤 Profil** - Paramètres et statistiques

## Données de Test

L'application contient des données de démonstration :

### Clients (3)
- Fatou Diop (Femme) - Parcelles Assainies
- Moussa Ndiaye (Homme) - Médina
- Aminata Sow (Femme) - Almadies

### Modèles (5)
- Boubou Bazin Riche (Homme) - 45,000 FCFA
- Ensemble Tabaski (Homme) - 35,000 FCFA
- Robe Mermoz (Femme) - 25,000 FCFA
- Kaftan Brodé (Femme) - 55,000 FCFA
- Ensemble Enfant - 15,000 FCFA

### Commandes (3)
- Fatou Diop - Robe Mermoz (En cours)
- Moussa Ndiaye - Boubou Bazin (Prête)
- Aminata Sow - Kaftan Brodé (En attente)

## Fonctionnalités Actuelles

✅ **Disponibles :**
- Visualisation du tableau de bord
- Liste des clients avec recherche
- Liste des commandes avec filtres
- Catalogue de modèles avec filtres
- Profil avec paramètres de notifications
- Navigation fluide entre les écrans

⏳ **En développement :**
- Ajout de nouveaux clients
- Création de commandes
- Ajout de modèles
- Génération de QR Code
- Notifications SMS/WhatsApp
- Intégration paiements mobiles

## Commandes Utiles

### Développement
```bash
# Démarrer le serveur de développement
npm start

# Démarrer avec cache vidé
npm start -- --clear

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur Web
npm run web
```

### Vérification du Code
```bash
# Vérifier les erreurs ESLint
npm run lint
```

### Réinitialiser le Projet
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Vider le cache Expo
npx expo start --clear
```

## Résolution de Problèmes

### Problème : QR Code ne fonctionne pas
**Solution :**
- Vérifiez que téléphone et PC sont sur le même WiFi
- Essayez le mode Tunnel : `npx expo start --tunnel`
- Redémarrez Expo Go

### Problème : Erreur "Metro bundler"
**Solution :**
```bash
npx expo start --clear
```

### Problème : Module non trouvé
**Solution :**
```bash
rm -rf node_modules
npm install
```

### Problème : Port déjà utilisé
**Solution :**
- Fermez les autres instances d'Expo
- Ou changez de port : `npx expo start --port 8082`

## Raccourcis Clavier (Terminal)

Quand le serveur Expo est lancé :

- `a` - Ouvrir sur Android
- `i` - Ouvrir sur iOS
- `w` - Ouvrir sur Web
- `r` - Recharger l'app
- `m` - Basculer le menu
- `j` - Ouvrir le debugger
- `c` - Afficher les logs
- `?` - Afficher l'aide

## Prochaines Étapes

1. **Tester toutes les fonctionnalités** actuelles
2. **Identifier les bugs** ou améliorations
3. **Prioriser les fonctionnalités** à développer
4. **Configurer le backend** (Firebase, Supabase, ou API custom)
5. **Implémenter les formulaires** d'ajout/modification
6. **Intégrer les services** SMS et paiements

## Support

### Documentation Officielle
- Expo : https://docs.expo.dev/
- React Native : https://reactnative.dev/
- React Navigation : https://reactnavigation.org/

### Communauté
- Expo Discord : https://chat.expo.dev/
- Stack Overflow : Tag `expo` ou `react-native`

## Notes Importantes

⚠️ **Attention :**
- Les données sont actuellement en mémoire (mockData)
- Aucune donnée n'est sauvegardée entre les sessions
- Les notifications ne sont pas encore fonctionnelles
- Les paiements ne sont pas encore intégrés

✨ **Astuce :**
- Utilisez le rechargement à chaud (Hot Reload) pour voir vos modifications en temps réel
- Secouez votre téléphone pour ouvrir le menu développeur
- Utilisez les React DevTools pour déboguer

---

**Bon développement ! 🎉**

Si vous rencontrez des problèmes, consultez le fichier GUIDE.md pour plus de détails.
