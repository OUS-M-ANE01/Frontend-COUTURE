import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockCommandes, mockClients, mockStatistiques } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const commandesEnCours = mockCommandes.filter(c => c.statut === 'en_cours').length;
  const commandesPrete = mockCommandes.filter(c => c.statut === 'prete').length;
  const totalClients = mockClients.length;
  const revenusMois = mockStatistiques[0]?.revenus || 0;

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return colors.warning;
      case 'en_cours': return colors.accent;
      case 'prete': return colors.success;
      case 'livree': return colors.icon;
      default: return colors.icon;
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'prete': return 'Prête';
      case 'livree': return 'Livrée';
      default: return statut;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View>
          <Text style={styles.greeting}>Bonjour!</Text>
          <Text style={styles.subtitle}>Bienvenue dans votre atelier</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <IconSymbol name="bell.fill" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: colors.accent + '20' }]}>
            <IconSymbol name="list.bullet.clipboard" size={24} color={colors.accent} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{commandesEnCours}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>En cours</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
            <IconSymbol name="checkmark.circle" size={24} color={colors.success} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{commandesPrete}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Prêtes</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
            <IconSymbol name="person.2" size={24} color={colors.primary} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{totalClients}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Clients</Text>
        </View>
      </View>

      {/* Revenue Card */}
      <View style={[styles.revenueCard, { backgroundColor: colors.primary }]}>
        <View style={styles.revenueHeader}>
          <Text style={styles.revenueTitle}>Revenus du mois</Text>
          <IconSymbol name="chart.line.uptrend.xyaxis" size={20} color="#fff" />
        </View>
        <Text style={styles.revenueAmount}>{revenusMois.toLocaleString()} FCFA</Text>
        <Text style={styles.revenueSubtitle}>
          {mockStatistiques[0]?.nombre_commandes} commandes ce mois
        </Text>
      </View>

      {/* Recent Orders */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Commandes récentes</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/commandes')}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {mockCommandes.slice(0, 3).map((commande) => {
          const client = mockClients.find(c => c.id === commande.clientId);
          return (
            <TouchableOpacity
              key={commande.id}
              style={[styles.orderCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.orderHeader}>
                <View>
                  <Text style={[styles.clientName, { color: colors.text }]}>
                    {client?.prenom} {client?.nom}
                  </Text>
                  <Text style={[styles.orderDate, { color: colors.icon }]}>
                    {new Date(commande.date_commande).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(commande.statut) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(commande.statut) }]}>
                    {getStatusLabel(commande.statut)}
                  </Text>
                </View>
              </View>
              <View style={styles.orderFooter}>
                <Text style={[styles.orderPrice, { color: colors.primary }]}>
                  {commande.prix.toLocaleString()} FCFA
                </Text>
                <Text style={[styles.orderDelivery, { color: colors.icon }]}>
                  Livraison: {new Date(commande.date_livraison_prevue).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card }]}
            onPress={() => router.push('/(tabs)/clients')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
              <IconSymbol name="person.badge.plus" size={28} color={colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Nouveau client</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card }]}
            onPress={() => router.push('/(tabs)/commandes')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.accent + '20' }]}>
              <IconSymbol name="plus.circle" size={28} color={colors.accent} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Nouvelle commande</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card }]}
            onPress={() => router.push('/(tabs)/catalogue')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.success + '20' }]}>
              <IconSymbol name="photo.on.rectangle" size={28} color={colors.success} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Catalogue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.card }]}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.warning + '20' }]}>
              <IconSymbol name="qrcode" size={28} color={colors.warning} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>Mon QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  revenueCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  revenueTitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  revenueSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDelivery: {
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginHorizontal: -6,
  },
  actionCard: {
    width: (width - 52) / 2,
    margin: 6,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
