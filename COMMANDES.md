# 🛠️ Commandes Utiles

## 📱 Développement

### Démarrer l'application
```bash
# Démarrer le serveur de développement
npm start

# Démarrer avec cache vidé
npm start -- --clear

# Démarrer en mode tunnel (pour tester hors réseau local)
npm start -- --tunnel
```

### Lancer sur différentes plateformes
```bash
# Android
npm run android

# iOS (Mac uniquement)
npm run ios

# Web
npm run web
```

## 🔍 Vérification du Code

### Linting
```bash
# Vérifier les erreurs ESLint
npm run lint

# Corriger automatiquement les erreurs
npm run lint -- --fix
```

### TypeScript
```bash
# Vérifier les erreurs TypeScript
npx tsc --noEmit
```

## 🧹 Nettoyage

### Nettoyer le cache
```bash
# Nettoyer le cache Metro
npx expo start --clear

# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
npm install
```

### Réinitialiser complètement
```bash
# Supprimer tous les caches et réinstaller
rm -rf node_modules
rm -rf .expo
rm -rf android/build
rm -rf ios/build
npm install
```

## 📦 Gestion des Dépendances

### Installer une nouvelle dépendance
```bash
# Dépendance de production
npm install <package-name>

# Dépendance de développement
npm install --save-dev <package-name>

# Exemple : installer axios
npm install axios
```

### Mettre à jour les dépendances
```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour toutes les dépendances
npm update

# Mettre à jour Expo SDK
npx expo install --fix
```

### Dépendances utiles à installer plus tard
```bash
# Pour les formulaires
npm install react-hook-form yup @hookform/resolvers

# Pour les requêtes API
npm install axios @tanstack/react-query

# Pour le state management
npm install zustand

# Pour les dates
npm install date-fns

# Pour les QR codes
npm install react-native-qrcode-svg

# Pour les graphiques
npm install react-native-chart-kit react-native-svg

# Pour les images
npm install expo-image-picker expo-image-manipulator

# Pour le stockage local
npm install @react-native-async-storage/async-storage

# Pour les notifications
npm install expo-notifications

# Pour Firebase
npm install firebase

# Pour Supabase
npm install @supabase/supabase-js
```

## 🏗️ Build & Déploiement

### Configuration EAS
```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à Expo
eas login

# Configurer EAS Build
eas build:configure
```

### Builds de développement
```bash
# Build Android (development)
eas build --profile development --platform android

# Build iOS (development)
eas build --profile development --platform ios

# Build pour les deux plateformes
eas build --profile development --platform all
```

### Builds de production
```bash
# Build Android (production)
eas build --profile production --platform android

# Build iOS (production)
eas build --profile production --platform ios

# Build pour les deux plateformes
eas build --profile production --platform all
```

### Soumettre aux stores
```bash
# Soumettre sur Google Play
eas submit --platform android

# Soumettre sur App Store
eas submit --platform ios
```

## 🧪 Tests

### Lancer les tests
```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm test -- --watch

# Lancer les tests avec couverture
npm test -- --coverage
```

## 📊 Analyse

### Analyser la taille du bundle
```bash
# Analyser le bundle
npx expo export --dump-sourcemap

# Analyser avec source-map-explorer
npm install -g source-map-explorer
source-map-explorer dist/bundles/*.js
```

## 🔧 Outils de Développement

### Ouvrir les DevTools
```bash
# Dans l'app, secouer le téléphone ou appuyer sur :
# - iOS : Cmd + D
# - Android : Cmd + M (Mac) ou Ctrl + M (Windows/Linux)
```

### Recharger l'application
```bash
# Dans le terminal Expo :
# - Appuyer sur 'r' pour recharger
# - Appuyer sur 'j' pour ouvrir le debugger
```

## 📱 Gestion des Appareils

### Lister les appareils connectés
```bash
# Android
adb devices

# iOS
xcrun simctl list devices
```

### Logs en temps réel
```bash
# Android
adb logcat

# iOS
xcrun simctl spawn booted log stream
```

## 🌐 Variables d'Environnement

### Créer un fichier .env
```bash
# Créer le fichier
touch .env

# Ajouter des variables
echo "API_URL=https://api.example.com" >> .env
echo "API_KEY=your-api-key" >> .env
```

### Utiliser les variables
```typescript
// Dans votre code
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## 🔐 Sécurité

### Vérifier les vulnérabilités
```bash
# Audit de sécurité
npm audit

# Corriger automatiquement
npm audit fix

# Corriger avec force (attention)
npm audit fix --force
```

## 📝 Git

### Commandes Git utiles
```bash
# Initialiser un repo
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Message de commit"

# Push vers GitHub
git push origin main

# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Fusionner une branche
git checkout main
git merge feature/nouvelle-fonctionnalite
```

## 🎨 Assets

### Générer les icônes et splash screens
```bash
# Avec Expo
npx expo prebuild

# Générer uniquement les icônes
npx expo-icon-generator
```

## 📚 Documentation

### Générer la documentation
```bash
# Installer TypeDoc
npm install --save-dev typedoc

# Générer la doc
npx typedoc --out docs src
```

## 🚀 Raccourcis Utiles

### Dans le terminal Expo
- `a` - Ouvrir sur Android
- `i` - Ouvrir sur iOS
- `w` - Ouvrir sur Web
- `r` - Recharger l'app
- `m` - Basculer le menu
- `j` - Ouvrir le debugger
- `c` - Afficher les logs
- `?` - Afficher l'aide

## 💻 Scripts Personnalisés

### Ajouter dans package.json
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf node_modules && npm install",
    "clean:cache": "expo start --clear"
  }
}
```

## 🔍 Debugging

### React Native Debugger
```bash
# Installer React Native Debugger
# Mac
brew install --cask react-native-debugger

# Windows/Linux
# Télécharger depuis GitHub
```

### Flipper
```bash
# Installer Flipper
# Mac
brew install --cask flipper

# Utiliser avec l'app
npx react-native doctor
```

## 📊 Performance

### Mesurer les performances
```bash
# Profiler React
# Dans l'app, ouvrir le menu dev et activer "Show Perf Monitor"

# Analyser le bundle
npx expo export --dump-sourcemap
```

## 🌍 Internationalisation

### Installer i18n
```bash
npm install i18next react-i18next
```

## 📱 Notifications Push

### Configurer les notifications
```bash
# Obtenir le token Expo Push
npx expo push:android:upload --api-key <your-api-key>
```

## 🎯 Conseils

### Avant de commencer à coder
1. `npm install` - Installer les dépendances
2. `npm start` - Démarrer le serveur
3. Scanner le QR code avec Expo Go

### Avant de commit
1. `npm run lint` - Vérifier le code
2. `npm run type-check` - Vérifier TypeScript
3. `npm test` - Lancer les tests

### Avant de déployer
1. `npm run lint` - Vérifier le code
2. `npm test` - Lancer tous les tests
3. `eas build` - Créer le build
4. Tester le build sur un vrai appareil

---

**Astuce :** Ajoutez ces commandes à vos favoris ou créez des alias dans votre terminal !
