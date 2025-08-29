import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { doc, query, where, setDoc, orderBy, collection, onSnapshot } from 'firebase/firestore';

import Cell from '../components/Cell';
import { colors } from '../config/constants';
import ContactRow from '../components/ContactRow';
import { auth, database } from '../config/firebase';

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [existingChats, setExistingChats] = useState([]);

  useEffect(() => {
    const collectionUserRef = collection(database, 'users');
    const q = query(collectionUserRef, orderBy('name', 'asc'));
    const unsubscribeUsers = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs);
    });

    // Get existing chats to avoid creating duplicate chats
    const collectionChatsRef = collection(database, 'chats');
    const q2 = query(
      collectionChatsRef,
      where('users', 'array-contains', {
        email: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        deletedFromChat: false,
      }),
      where('groupName', '==', '')
    );
    const unsubscribeChats = onSnapshot(q2, (snapshot) => {
      const existing = snapshot.docs.map((existingChat) => ({
        chatId: existingChat.id,
        userEmails: existingChat.data().users,
      }));
      setExistingChats(existing);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeChats();
    };
  }, []);


  const handleName = useCallback((user) => {
    const { name } = user.data();
    const { email } = user.data();
    if (name) {
      return email === auth?.currentUser?.email ? `${name}*(You)` : name;
    }
    return email || '~ No Name or Email ~';
  }, []);

  const handleNewGroup = useCallback(() => {
    navigation.navigate('Group');
  }, [navigation]);

  const handleNavigate = useCallback(
    (user) => {
      let navigationChatID = '';
      let messageYourselfChatID = '';

      existingChats.forEach((existingChat) => {
        const isCurrentUserInTheChat = existingChat.userEmails.some(
          (e) => e.email === auth?.currentUser?.email
        );
        const isMessageYourselfExists = existingChat.userEmails.filter(
          (e) => e.email === user.data().email
        ).length;

        if (
          isCurrentUserInTheChat &&
          existingChat.userEmails.some((e) => e.email === user.data().email)
        ) {
          navigationChatID = existingChat.chatId;
        }

        if (isMessageYourselfExists === 2) {
          messageYourselfChatID = existingChat.chatId;
        }

        if (auth?.currentUser?.email === user.data().email) {
          navigationChatID = '';
        }
      });

      if (messageYourselfChatID) {
        navigation.navigate('Chat', { id: messageYourselfChatID, chatName: handleName(user) });
      } else if (navigationChatID) {
        navigation.navigate('Chat', { id: navigationChatID, chatName: handleName(user) });
      } else {
        // Creates new chat
        const newRef = doc(collection(database, 'chats'));
        setDoc(newRef, {
          lastUpdated: Date.now(),
          groupName: '', // It is not a group chat
          users: [
            {
              email: auth?.currentUser?.email,
              name: auth?.currentUser?.displayName,
              deletedFromChat: false,
            },
            { email: user.data().email, name: user.data().name, deletedFromChat: false },
          ],
          lastAccess: [
            { email: auth?.currentUser?.email, date: Date.now() },
            { email: user.data().email, date: '' },
          ],
          messages: [],
        }).then(() => {
          navigation.navigate('Chat', { id: newRef.id, chatName: handleName(user) });
        });
      }
    },
    [existingChats, handleName, navigation]
  );

  const handleSubtitle = useCallback(
    (user) => (user.data().email === auth?.currentUser?.email ? 'Message yourself' : 'User status'),
    []
  );



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.actionsContainer}>
        <Cell
          title="New group"
          icon="people"
          iconColor={colors.textSecondary}
          showIconBackground={false}
          onPress={handleNewGroup}
          style={styles.actionCell}
        />
      </View>

      {users.length === 0 ? (
        <View style={styles.blankContainer}>
          <Text style={styles.textContainer}>No registered users yet</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Registered users</Text>
          </View>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <ContactRow
                name={handleName(user)}
                subtitle={handleSubtitle(user)}
                onPress={() => handleNavigate(user)}
                showForwardIcon={false}
              />
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionCell: {
    marginVertical: 4,
  },
  actionsContainer: {
    backgroundColor: colors.surface,
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    elevation: 1,
    paddingVertical: 8,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  blankContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  textContainer: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Users;
