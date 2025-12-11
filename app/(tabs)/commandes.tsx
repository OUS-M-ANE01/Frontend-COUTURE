import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockCommandes, mockClients, mockModeles } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { OrderStatus } from '@/types';

export default function CommandesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all');

  const filteredCommandes = selectedFilter === 'all' 
    ? mockCommandes 
    : mockCommandes.filter(c => c.statut === selectedFilter);

  const getStatusColor = (statut: OrderStatus) => {
    switch (statut) {
      case 'en_attente': return colors.warning;
      case 'en_cours': return colors.accent;
      case 'prete': return colors.success;
      case 'livree': return colors.icon;
    }
  };

  const getStatusLabel = (statut: OrderStatus) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'prete': return 'Prête';
      case 'livree': return 'Livrée';
    }
  };

  const filters: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'Toutes' },
    { key: 'en_attente', label: 'En attente' },
    { key: 'en_cours', label: 'En cours' },
    { key: 'prete', label: 'Prêtes' },
    { key: 'livree', label: 'Livrées' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Commandes</Text>
        <Text style={styles.headerSubtitle}>{mockCommandes.length} commandes au total</Text>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterChip,
              { 
                backgroundColor: selectedFilter === filter.key ? colors.primary : colors.card,
                borderColor: colors.border,
              }
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === filter.key ? '#fff' : colors.text }
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredCommandes.map((commande) => {
          const client = mockClients.find(c => c.id === commande.clientId);
          const modele = mockModeles.find(m => m.id === commande.modeleId);
          
          return (
            <TouchableOpacity
              key={commande.id}
              style={[styles.orderCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderHeaderLeft}>
                  <View style={[styles.orderAvatar, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.orderAvatarText, { color: colors.primary }]}>
                      {client?.prenom[0]}{client?.nom[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.clientName, { color: colors.text }]}>
                      {client?.prenom} {client?.nom}
                    </Text>
                    <Text style={[styles.modeleName, { color: colors.icon }]}>
                      {modele?.nom || 'Modèle personnalisé'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(commande.statut) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(commande.statut) }]}>
                    {getStatusLabel(commande.statut)}
                  </Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.orderDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="calendar" size={16} color={colors.icon} />
                  <Text style={[styles.detailText, { color: colors.icon }]}>
                    Commande: {new Date(commande.date_commande).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="clock" size={16} color={colors.icon} />
                  <Text style={[styles.detailText, { color: colors.icon }]}>
                    Livraison: {new Date(commande.date_livraison_prevue).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                {commande.tissu && (
                  <View style={styles.detailRow}>
                    <IconSymbol name="scissors" size={16} color={colors.icon} />
                    <Text style={[styles.detailText, { color: colors.icon }]}>
                      {commande.tissu}
                    </Text>
                  </View>
                )}
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.orderFooter}>
                <View>
                  <Text style={[styles.priceLabel, { color: colors.icon }]}>Prix total</Text>
                  <Text style={[styles.priceValue, { color: colors.primary }]}>
                    {commande.prix.toLocaleString()} FCFA
                  </Text>
                </View>
                {commande.reste && commande.reste > 0 && (
                  <View style={[styles.resteBadge, { backgroundColor: colors.warning + '20' }]}>
                    <Text style={[styles.resteText, { color: colors.warning }]}>
                      Reste: {commande.reste.toLocaleString()} FCFA
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
        <IconSymbol name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  filtersContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  orderCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  modeleName: {
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
  divider: {
    height: 1,
    marginVertical: 12,
  },
  orderDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 13,
    marginLeft: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resteBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resteText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
