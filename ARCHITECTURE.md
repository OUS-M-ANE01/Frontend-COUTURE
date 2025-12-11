# Architecture de l'Application

## 📐 Vue d'ensemble

L'application suit une architecture moderne basée sur React Native avec Expo, utilisant le système de routing file-based d'Expo Router.

## 🏗️ Structure des Dossiers

```
COUTURE-APP/
│
├── app/                          # Écrans et navigation (Expo Router)
│   ├── (tabs)/                   # Groupe de navigation par onglets
│   │   ├── index.tsx            # 🏠 Écran d'accueil
│   │   ├── clients.tsx          # 👥 Liste des clients
│   │   ├── commandes.tsx        # 📋 Gestion des commandes
│   │   ├── catalogue.tsx        # 📸 Catalogue de modèles
│   │   ├── profil.tsx           # 👤 Profil et paramètres
│   │   └── _layout.tsx          # Configuration des onglets
│   │
│   ├── client-detail.tsx        # Détails d'un client
│   ├── commande-detail.tsx      # Détails d'une commande (à créer)
│   ├── modele-detail.tsx        # Détails d'un modèle (à créer)
│   ├── modal.tsx                # Écran modal exemple
│   └── _layout.tsx              # Layout racine avec Stack Navigator
│
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI de base
│   │   ├── icon-symbol.tsx      # Icônes système
│   │   └── collapsible.tsx      # Composant pliable
│   ├── external-link.tsx        # Liens externes
│   ├── haptic-tab.tsx           # Onglets avec retour haptique
│   ├── hello-wave.tsx           # Animation de bienvenue
│   ├── parallax-scroll-view.tsx # ScrollView avec parallaxe
│   ├── themed-text.tsx          # Texte avec thème
│   └── themed-view.tsx          # Vue avec thème
│
├── constants/                    # Constantes de l'application
│   └── theme.ts                 # Thème (couleurs, polices)
│
├── data/                        # Données et état
│   └── mockData.ts              # Données de test
│
├── types/                       # Types TypeScript
│   └── index.ts                 # Types globaux
│
├── hooks/                       # Hooks React personnalisés
│   ├── use-color-scheme.ts      # Hook pour le thème
│   ├── use-color-scheme.web.ts  # Version web
│   └── use-theme-color.ts       # Hook pour les couleurs
│
├── services/                    # Services (à créer)
│   ├── api/                     # Appels API
│   ├── storage/                 # Stockage local
│   └── notifications/           # Gestion des notifications
│
├── utils/                       # Fonctions utilitaires (à créer)
│   ├── formatters.ts            # Formatage (dates, prix, etc.)
│   ├── validators.ts            # Validation de formulaires
│   └── helpers.ts               # Fonctions d'aide
│
└── assets/                      # Ressources statiques
    └── images/                  # Images et icônes
```

## 🔄 Flux de Données

### Architecture Actuelle (Mock Data)

```
┌─────────────┐
│   Écrans    │
│  (Views)    │
└──────┬──────┘
       │
       │ import
       ▼
┌─────────────┐
│  mockData   │
│  (data/)    │
└─────────────┘
```

### Architecture Future (avec Backend)

```
┌─────────────┐
│   Écrans    │
│  (Views)    │
└──────┬──────┘
       │
       │ useQuery/useMutation
       ▼
┌─────────────┐
│   Hooks     │
│  (hooks/)   │
└──────┬──────┘
       │
       │ fetch/axios
       ▼
┌─────────────┐
│  Services   │
│ (services/) │
└──────┬──────┘
       │
       │ HTTP/REST
       ▼
┌─────────────┐
│  Backend    │
│   API       │
└─────────────┘
```

## 🎨 Système de Thème

### Structure du Thème

```typescript
Colors = {
  light: {
    // Couleurs de base
    text: '#11181C',
    background: '#F5F7FA',
    
    // Couleurs de marque
    primary: '#2E3A87',
    secondary: '#4A5FC1',
    accent: '#6C7FE8',
    
    // Couleurs sémantiques
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    
    // Couleurs UI
    card: '#FFFFFF',
    border: '#E5E7EB',
    lightGray: '#F3F4F6',
    icon: '#687076',
  },
  dark: {
    // Version sombre (à implémenter)
  }
}
```

### Utilisation

```typescript
const colorScheme = useColorScheme();
const colors = Colors[colorScheme ?? 'light'];

<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Hello</Text>
</View>
```

## 🧩 Composants Principaux

### 1. Écrans (Screens)

**Responsabilités :**
- Afficher l'interface utilisateur
- Gérer l'état local (useState)
- Appeler les hooks de données
- Gérer la navigation

**Exemple :**
```typescript
export default function ClientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredClients = mockClients.filter(...);
  
  return (
    <View>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <ClientList clients={filteredClients} />
    </View>
  );
}
```

### 2. Composants UI

**Responsabilités :**
- Affichage réutilisable
- Props typées
- Pas de logique métier

**Exemple :**
```typescript
interface ClientCardProps {
  client: Client;
  onPress: () => void;
}

export function ClientCard({ client, onPress }: ClientCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{client.nom}</Text>
    </TouchableOpacity>
  );
}
```

### 3. Hooks Personnalisés

**Responsabilités :**
- Logique réutilisable
- Gestion d'état complexe
- Appels API

**Exemple (futur) :**
```typescript
export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchClients().then(setClients).finally(() => setLoading(false));
  }, []);
  
  return { clients, loading };
}
```

## 📱 Navigation

### Structure de Navigation

```
Stack Navigator (Root)
│
├── Tabs Navigator
│   ├── Accueil (index)
│   ├── Clients
│   ├── Commandes
│   ├── Catalogue
│   └── Profil
│
├── Client Detail (Modal)
├── Commande Detail (Modal)
└── Modele Detail (Modal)
```

### Navigation Programmatique

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigation simple
router.push('/client-detail');

// Avec paramètres
router.push({
  pathname: '/client-detail',
  params: { id: '123' }
});

// Retour
router.back();
```

## 🔐 Gestion de l'État

### État Actuel (Local)

Chaque écran gère son propre état avec `useState`:

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [selectedFilter, setSelectedFilter] = useState('all');
```

### État Futur (Global)

Options à considérer :

1. **Context API** (React natif)
```typescript
const { user, setUser } = useAuth();
```

2. **Zustand** (Recommandé - léger)
```typescript
const clients = useStore(state => state.clients);
```

3. **Redux Toolkit** (Pour apps complexes)
```typescript
const clients = useSelector(state => state.clients);
```

## 🌐 Intégration Backend (Futur)

### Architecture API

```
Frontend (React Native)
    ↓
Services Layer (services/api/)
    ↓
HTTP Client (axios/fetch)
    ↓
Backend API (REST/GraphQL)
    ↓
Database (PostgreSQL/MongoDB)
```

### Structure des Services

```typescript
// services/api/clients.ts
export const clientsApi = {
  getAll: () => fetch('/api/clients'),
  getById: (id: string) => fetch(`/api/clients/${id}`),
  create: (data: ClientInput) => fetch('/api/clients', { method: 'POST', body: data }),
  update: (id: string, data: ClientInput) => fetch(`/api/clients/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => fetch(`/api/clients/${id}`, { method: 'DELETE' }),
};
```

## 📦 Gestion des Dépendances

### Dépendances Principales

```json
{
  "expo": "~54.0.27",              // Framework
  "react": "19.1.0",               // UI Library
  "react-native": "0.81.5",        // Mobile Framework
  "expo-router": "~6.0.17",        // Navigation
  "typescript": "~5.9.2"           // Type Safety
}
```

### Dépendances Futures

```json
{
  "axios": "^1.6.0",               // HTTP Client
  "zustand": "^4.4.0",             // State Management
  "react-query": "^5.0.0",         // Data Fetching
  "yup": "^1.3.0",                 // Validation
  "date-fns": "^3.0.0"             // Date Utilities
}
```

## 🧪 Tests (À Implémenter)

### Structure des Tests

```
__tests__/
├── components/
│   └── ClientCard.test.tsx
├── screens/
│   └── ClientsScreen.test.tsx
├── hooks/
│   └── useClients.test.ts
└── utils/
    └── formatters.test.ts
```

### Outils de Test

- **Jest** - Framework de test
- **React Native Testing Library** - Tests de composants
- **MSW** - Mock des API

## 🚀 Performance

### Optimisations Actuelles

1. **Mémoïsation** avec `useMemo` et `useCallback`
2. **Lazy Loading** des images
3. **FlatList** pour les listes longues

### Optimisations Futures

1. **Code Splitting** par route
2. **Image Optimization** avec Expo Image
3. **Caching** avec React Query
4. **Offline First** avec AsyncStorage

## 📊 Monitoring (Futur)

### Outils Recommandés

- **Sentry** - Error tracking
- **Firebase Analytics** - Usage analytics
- **Expo Analytics** - App metrics

## 🔒 Sécurité

### Bonnes Pratiques

1. **Validation** des entrées utilisateur
2. **Sanitization** des données
3. **HTTPS** pour toutes les API
4. **JWT** pour l'authentification
5. **Secrets** dans variables d'environnement

### Variables d'Environnement

```typescript
// .env
API_URL=https://api.couture-app.sn
SENTRY_DSN=...
FIREBASE_API_KEY=...
```

## 📱 Build & Déploiement

### Développement
```bash
npx expo start
```

### Preview Build
```bash
eas build --profile preview --platform android
```

### Production Build
```bash
eas build --profile production --platform all
```

### Publication
```bash
eas submit --platform android
eas submit --platform ios
```

---

**Dernière mise à jour :** Décembre 2024
