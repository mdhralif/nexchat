import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../config/constants';

const About = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <Ionicons name="chatbubbles" size={64} color={colors.primary} />
      </View>
      
      <Text style={styles.title}>NexChat</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          NexChat is a modern, real-time messaging application built with React Native and Firebase. 
          Connect with friends, family, and colleagues through instant messaging and group conversations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureList}>
          <Text style={styles.feature}>• Real-time messaging</Text>
          <Text style={styles.feature}>• Group conversations</Text>
          <Text style={styles.feature}>• Image sharing</Text>
          <Text style={styles.feature}>• User profiles</Text>
          <Text style={styles.feature}>• Cross-platform support</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Developer</Text>
        <Text style={styles.description}>
          Built with ❤️ using React Native and Firebase
        </Text>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  feature: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  featureList: {
    alignSelf: 'stretch',
  },
  iconContainer: {
    backgroundColor: colors.surface,
    borderRadius: 40,
    elevation: 3,
    height: 80,
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 80,
  },
  section: {
    marginBottom: 32,
    width: '100%',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  version: {
    color: colors.textTertiary,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 32,
  },
});

export default About;
