import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockModeles } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Gender } from '@/types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function CatalogueScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState<Gender | 'all'>('all');

  const filteredModeles = selectedCategory === 'all'
    ? mockModeles
    : mockModeles.filter(m => m.categorie === selectedCategory);

  const categories: { key: Gender | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'Tous', icon: 'square.grid.2x2' },
    { key: 'homme', label: 'Homme', icon: 'person.fill' },
    { key: 'femme', label: 'Femme', icon: 'person.fill' },
    { key: 'enfant', label: 'Enfant', icon: 'figure.2.and.child.holdinghands' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View>
          <Text style={styles.headerTitle}>Catalogue</Text>
          <Text style={styles.headerSubtitle}>{mockModeles.length} modèles disponibles</Text>
        </View>
        <TouchableOpacity style={styles.qrButton}>
          <IconSymbol name="qrcode" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryChip,
              {
                backgroundColor: selectedCategory === category.key ? colors.primary : colors.card,
                borderColor: colors.border,
              }
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <IconSymbol
              name={category.icon as any}
              size={18}
              color={selectedCategory === category.key ? '#fff' : colors.icon}
            />
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === category.key ? '#fff' : colors.text }
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Models Grid */}
      <ScrollView
        style={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
      >
        {filteredModeles.map((modele) => (
          <TouchableOpacity
            key={modele.id}
            style={[styles.modelCard, { backgroundColor: colors.card, width: cardWidth }]}
          >
            <Image
              source={{ uri: modele.photo }}
              style={styles.modelImage}
              resizeMode="cover"
            />
            <View style={styles.modelInfo}>
              <Text style={[styles.modelName, { color: colors.text }]} numberOfLines={1}>
                {modele.nom}
              </Text>
              <View style={styles.modelMeta}>
                <View style={[styles.categoryBadge, { backgroundColor: colors.accent + '20' }]}>
                  <Text style={[styles.categoryBadgeText, { color: colors.accent }]}>
                    {modele.categorie}
                  </Text>
                </View>
              </View>
              {modele.tissu && (
                <View style={styles.tissuRow}>
                  <IconSymbol name="scissors" size={12} color={colors.icon} />
                  <Text style={[styles.tissuText, { color: colors.icon }]} numberOfLines={1}>
                    {modele.tissu}
                  </Text>
                </View>
              )}
              <Text style={[styles.modelPrice, { color: colors.primary }]}>
                {modele.prix_indicatif.toLocaleString()} FCFA
              </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  qrButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  gridContainer: {
    flex: 1,
  },
  gridContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modelCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  modelImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E7EB',
  },
  modelInfo: {
    padding: 12,
  },
  modelName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  modelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tissuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tissuText: {
    fontSize: 12,
    marginLeft: 4,
  },
  modelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
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
