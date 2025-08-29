import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import Cell from '../components/Cell';
import { auth } from '../config/firebase';
import { colors } from '../config/constants';

const Profile = () => {
  const handleChangeProfilePicture = () => {
    Alert.alert('Change Profile Picture', 'This feature is coming soon.');
  };

  const handleShowProfilePicture = () => {
    Alert.alert('Show Profile Picture', 'This feature is coming soon.');
  };

  const initials = auth?.currentUser?.displayName
    ? auth.currentUser.displayName
        .split(' ')
        .map((name) => name[0])
        .join('')
    : auth?.currentUser?.email?.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatar} onPress={handleShowProfilePicture}>
          <Text style={styles.avatarLabel}>{initials}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraIcon} onPress={handleChangeProfilePicture}>
          <Ionicons name="camera-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* User Info Cells */}
      <View style={styles.infoContainer}>
        <Cell
          title="Name"
          icon="person-outline"
          iconColor={colors.text}
          tintColor={colors.background}
          subtitle={auth?.currentUser?.displayName || 'No name set'}
          style={styles.cell}
        />

        <Cell
          title="Email"
          subtitle={auth?.currentUser?.email}
          icon="mail-outline"
          iconColor={colors.text}
          tintColor={colors.background}
          style={styles.cell}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 60,
    elevation: 4,
    height: 120,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: 120,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
    position: 'relative',
  },
  avatarLabel: {
    color: 'white',
    fontSize: 36,
    fontWeight: '600',
  },
  cameraIcon: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderColor: colors.surface,
    borderRadius: 20,
    borderWidth: 3,
    bottom: 8,
    elevation: 5,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 40,
  },
  cell: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
  },
  infoContainer: {
    marginTop: 40,
    width: '92%',
  },
});

export default Profile;
