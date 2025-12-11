import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockClients } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ClientsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = mockClients.filter(client =>
    `${client.prenom} ${client.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.telephone.includes(searchQuery)
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Mes Clients</Text>
        <Text style={styles.headerSubtitle}>{mockClients.length} clients enregistrés</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Rechercher un client..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Clients List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredClients.map((client) => (
          <TouchableOpacity
            key={client.id}
            style={[styles.clientCard, { backgroundColor: colors.card }]}
          >
            <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>
                {client.prenom[0]}{client.nom[0]}
              </Text>
            </View>
            
            <View style={styles.clientInfo}>
              <Text style={[styles.clientName, { color: colors.text }]}>
                {client.prenom} {client.nom}
              </Text>
              <View style={styles.clientDetails}>
                <IconSymbol name="phone.fill" size={14} color={colors.icon} />
                <Text style={[styles.clientPhone, { color: colors.icon }]}>
                  {client.telephone}
                </Text>
              </View>
              <View style={styles.clientDetails}>
                <IconSymbol name="mappin.circle.fill" size={14} color={colors.icon} />
                <Text style={[styles.clientAddress, { color: colors.icon }]}>
                  {client.adresse}
                </Text>
              </View>
            </View>

            <View style={[styles.genderBadge, { 
              backgroundColor: client.sexe === 'homme' ? colors.accent + '20' : '#EC4899' + '20' 
            }]}>
              <IconSymbol 
                name={client.sexe === 'homme' ? 'person.fill' : 'person.fill'} 
                size={16} 
                color={client.sexe === 'homme' ? colors.accent : '#EC4899'} 
              />
            </View>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  clientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  clientPhone: {
    fontSize: 13,
    marginLeft: 6,
  },
  clientAddress: {
    fontSize: 12,
    marginLeft: 6,
  },
  genderBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
