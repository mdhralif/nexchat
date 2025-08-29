import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { signOut, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

import Cell from '../components/Cell';
import { colors } from '../config/constants';
import { auth, database } from '../config/firebase';

const Account = () => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  const deleteAccount = () => {
    deleteUser(auth?.currentUser).catch((error) => console.log('Error deleting: ', error));
    deleteDoc(doc(database, 'users', auth?.currentUser.email));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Cell
          title="Logout"
          icon="log-out-outline"
          iconColor={colors.textSecondary}
          onPress={() => {
            Alert.alert(
              'Logout?',
              'You will need to login again.',
              [
                { text: 'Logout', onPress: onSignOut },
                { text: 'Cancel', style: 'cancel' },
              ],
              { cancelable: true }
            );
          }}
          showForwardIcon={false}
        />

        <Cell
          title="Delete my account"
          icon="trash-outline"
          iconColor={colors.error}
          onPress={() => {
            Alert.alert(
              'Delete account?',
              'Deleting your account will erase your message history.',
              [
                { text: 'Delete my account', onPress: deleteAccount, style: 'destructive' },
                { text: 'Cancel', style: 'cancel' },
              ],
              { cancelable: true }
            );
          }}
          showForwardIcon={false}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
});

export default Account;
