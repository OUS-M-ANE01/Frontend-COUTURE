export type Gender = 'homme' | 'femme' | 'enfant';

export type OrderStatus = 'en_attente' | 'en_cours' | 'prete' | 'livree';

export type PaymentMethod = 'especes' | 'orange_money' | 'wave' | 'virement';

export interface Client {
  id: string;
  prenom: string;
  nom: string;
  telephone: string;
  whatsapp?: string;
  sexe: Gender;
  adresse?: string;
  mesures: Mesure;
  createdAt: string;
}

export interface Mesure {
  // Mesures communes
  longueur?: number;
  largeur_epaules?: number;
  tour_poitrine?: number;
  tour_taille?: number;
  tour_hanches?: number;
  longueur_manche?: number;
  tour_bras?: number;
  tour_cou?: number;
  // Mesures pantalon
  longueur_pantalon?: number;
  tour_cuisse?: number;
  entrejambe?: number;
  // Mesures personnalisées
  [key: string]: number | undefined;
}

export interface Modele {
  id: string;
  nom: string;
  photo: string;
  categorie: Gender;
  tissu?: string;
  prix_indicatif: number;
  description?: string;
  occasion?: string;
}

export interface Commande {
  id: string;
  clientId: string;
  modeleId?: string;
  date_commande: string;
  date_livraison_prevue: string;
  statut: OrderStatus;
  prix: number;
  avance?: number;
  reste?: number;
  tissu?: string;
  couleur?: string;
  notes?: string;
  particularites?: string;
}

export interface Notification {
  id: string;
  commandeId: string;
  type: 'sms' | 'whatsapp';
  message: string;
  envoyee: boolean;
  date: string;
}

export interface Statistique {
  mois: string;
  nombre_commandes: number;
  revenus: number;
  modeles_populaires: { modeleId: string; count: number }[];
}
