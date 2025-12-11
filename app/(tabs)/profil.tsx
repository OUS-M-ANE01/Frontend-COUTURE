import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockStatistiques } from '@/data/mockData';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfilScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notificationsSMS, setNotificationsSMS] = React.useState(true);
  const [notificationsWhatsApp, setNotificationsWhatsApp] = React.useState(true);

  const stats = mockStatistiques[0];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Profile */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>AS</Text>
          </View>
          <Text style={styles.profileName}>Atelier Sénégalais</Text>
          <Text style={styles.profileSubtitle}>Couturier professionnel</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <View style={[styles.statBox, { backgroundColor: colors.card }]}>
          <IconSymbol name="chart.bar.fill" size={24} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stats.nombre_commandes}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Commandes ce mois</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.card }]}>
          <IconSymbol name="banknote" size={24} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {(stats.revenus / 1000).toFixed(0)}K
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Revenus (FCFA)</Text>
        </View>
      </View>

      {/* Notifications Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.accent + '20' }]}>
                <IconSymbol name="message.fill" size={20} color={colors.accent} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Notifications SMS
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                  Alertes par SMS
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsSMS}
              onValueChange={setNotificationsSMS}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.success + '20' }]}>
                <IconSymbol name="bubble.left.fill" size={20} color={colors.success} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Notifications WhatsApp
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                  Alertes via WhatsApp
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsWhatsApp}
              onValueChange={setNotificationsWhatsApp}
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Paramètres</Text>

        <TouchableOpacity style={[styles.menuCard, { backgroundColor: colors.card }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: colors.primary + '20' }]}>
              <IconSymbol name="person.circle" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              Informations du profil
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuCard, { backgroundColor: colors.card }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: colors.warning + '20' }]}>
              <IconSymbol name="qrcode" size={22} color={colors.warning} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              Mon QR Code
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuCard, { backgroundColor: colors.card }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: colors.accent + '20' }]}>
              <IconSymbol name="creditcard" size={22} color={colors.accent} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              Moyens de paiement
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuCard, { backgroundColor: colors.card }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: colors.success + '20' }]}>
              <IconSymbol name="chart.line.uptrend.xyaxis" size={22} color={colors.success} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              Statistiques détaillées
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>

        <TouchableOpacity style={[styles.menuCard, { backgroundColor: colors.card }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: colors.icon + '20' }]}>
              <IconSymbol name="questionmark.circle" size={22} color={colors.icon} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              Aide & FAQ
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuCard, { backgroundColor: colors.card }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIcon, { backgroundColor: colors.icon + '20' }]}>
              <IconSymbol name="envelope" size={22} color={colors.icon} />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              Nous contacter
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.danger + '10' }]}>
        <IconSymbol name="arrow.right.square" size={22} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>
          Se déconnecter
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarLargeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  menuCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
  },
});
