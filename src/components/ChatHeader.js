import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../config/constants';

const ChatHeader = ({ chatName, chatId }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ChatInfo', { chatId, chatName })}
    >
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => navigation.navigate('ChatInfo', { chatId, chatName })}
      >
        <View>
          <Text style={styles.avatarLabel}>
            {chatName.split(' ').reduce((prev, current) => `${prev}${current[0]}`, '')}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.chatName}>{chatName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    elevation: 2,
    height: 36,
    justifyContent: 'center',
    marginLeft: -30,
    marginRight: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 36,
  },
  avatarLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chatName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

ChatHeader.propTypes = {
  chatName: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
};

export default ChatHeader;
