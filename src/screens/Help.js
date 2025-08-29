import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';

import Cell from '../components/Cell';
import { colors } from '../config/constants';

const Help = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Ionicons name="help-circle" size={56} color={colors.primary} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {/* Settings-like section */}
      <View style={styles.section}>
        <Cell
          title="Contact Support"
          subtitle="Get help from our support team"
          icon="people-outline"
          tintColor={colors.primary}
          iconColor="white"
          onPress={() => {
            Alert.alert(
              'Contact Support',
              'For support, please email us at:\nsupport@nexchat.com.',
              [{ text: 'OK' }]
            );
          }}
          showForwardIcon={false}
        />

        <Cell
          title="App Information"
          subtitle="Version and development details"
          icon="information-circle-outline"
          tintColor={colors.warning}
          iconColor="white"
          onPress={() => {
            Alert.alert(
              'NexChat',
              'Version: 1.0.0\n\nA modern messaging app built with React Native and Firebase.\n\nDeveloped by MD H R ALIF',
              [{ text: 'OK' }],
              { cancelable: true }
            );
          }}
          showForwardIcon={false}
          style={{ marginTop: 8 }}
        />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});

export default Help;
