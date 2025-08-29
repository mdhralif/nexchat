import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Cell from '../components/Cell';
import ContactRow from '../components/ContactRow';
import { auth } from '../config/firebase';
import { colors } from '../config/constants';

const Settings = ({ navigation }) => (
  <View style={styles.container}>
    {/* Profile row */}
    <View style={styles.section}>
      <ContactRow
        name={auth?.currentUser?.displayName ?? 'No name'}
        subtitle={auth?.currentUser?.email}
        style={styles.contactRow}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
    </View>

    {/* Settings options */}
    <View style={styles.section}>
      <Cell
        title="Account"
        subtitle="Privacy, logout, delete account"
        icon="key-outline"
        iconColor={colors.textSecondary}
        showIconBackground={false}
        onPress={() => {
          navigation.navigate('Account');
        }}
      />

      <Cell
        title="Help"
        subtitle="Contact us, app info"
        icon="help-circle-outline"
        iconColor={colors.textSecondary}
        showIconBackground={false}
        style={styles.cellSpacing}
        onPress={() => {
          navigation.navigate('Help');
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  cellSpacing: {
    marginTop: 8,
  },
  contactRow: {
    borderRadius: 12,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
