import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockClients, mockCommandes } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ClientDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const client = mockClients.find(c => c.id === id);
  const clientCommandes = mockCommandes.filter(c => c.clientId === id);

  if (!client) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text>Client non trouvé</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails Client</Text>
        <TouchableOpacity style={styles.editButton}>
          <IconSymbol name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Client Info Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={[styles.avatarLarge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {client.prenom[0]}{client.nom[0]}
            </Text>
          </View>
          <Text style={[styles.clientName, { color: colors.text }]}>
            {client.prenom} {client.nom}
          </Text>
          
          <View style={styles.infoRow}>
            <IconSymbol name="phone.fill" size={18} color={colors.icon} />
            <Text style={[styles.infoText, { color: colors.text }]}>{client.telephone}</Text>
          </View>
          
          {client.whatsapp && (
            <View style={styles.infoRow}>
              <IconSymbol name="bubble.left.fill" size={18} color={colors.success} />
              <Text style={[styles.infoText, { color: colors.text }]}>{client.whatsapp}</Text>
            </View>
          )}
          
          {client.adresse && (
            <View style={styles.infoRow}>
              <IconSymbol name="mappin.circle.fill" size={18} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.text }]}>{client.adresse}</Text>
            </View>
          )}
        </View>

        {/* Mesures */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Mesures</Text>
          <View style={styles.mesuresGrid}>
            {Object.entries(client.mesures).map(([key, value]) => (
              <View key={key} style={[styles.mesureItem, { backgroundColor: colors.lightGray }]}>
                <Text style={[styles.mesureLabel, { color: colors.icon }]}>
                  {key.replace(/_/g, ' ')}
                </Text>
                <Text style={[styles.mesureValue, { color: colors.text }]}>
                  {value} cm
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Commandes */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Commandes ({clientCommandes.length})
            </Text>
            <TouchableOpacity>
              <Text style={[styles.addText, { color: colors.primary }]}>+ Nouvelle</Text>
            </TouchableOpacity>
          </View>
          
          {clientCommandes.map((commande) => (
            <View key={commande.id} style={[styles.commandeItem, { borderBottomColor: colors.border }]}>
              <View style={styles.commandeLeft}>
                <Text style={[styles.commandeDate, { color: colors.text }]}>
                  {new Date(commande.date_commande).toLocaleDateString('fr-FR')}
                </Text>
                <Text style={[styles.commandePrice, { color: colors.primary }]}>
                  {commande.prix.toLocaleString()} FCFA
                </Text>
              </View>
              <View style={[styles.statusBadge, { 
                backgroundColor: commande.statut === 'prete' ? colors.success + '20' : colors.accent + '20' 
              }]}>
                <Text style={[styles.statusText, { 
                  color: commande.statut === 'prete' ? colors.success : colors.accent 
                }]}>
                  {commande.statut}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  clientName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mesuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  mesureItem: {
    width: '48%',
    margin: '1%',
    padding: 12,
    borderRadius: 12,
  },
  mesureLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  mesureValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commandeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commandeLeft: {
    flex: 1,
  },
  commandeDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  commandePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
