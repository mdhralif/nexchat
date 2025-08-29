import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../config/constants';

const ContactRow = ({
  name,
  subtitle,
  onPress,
  style,
  onLongPress,
  selected,
  showForwardIcon = true,
  subtitle2,
  newMessageCount,
}) => (
  <TouchableOpacity style={[styles.row, style]} onPress={onPress} onLongPress={onLongPress}>
    <View style={styles.avatar}>
      <Text style={styles.avatarLabel}>
        {name
          .trim()
          .split(' ')
          .reduce((prev, current) => `${prev}${current[0]}`, '')}
      </Text>
    </View>

    <View style={styles.textsContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    <View style={styles.rightContainer}>
      <Text style={styles.subtitle2}>{subtitle2}</Text>

      {newMessageCount > 0 && (
        <View style={styles.newMessageBadge}>
          <Text style={styles.newMessageText}>{newMessageCount}</Text>
        </View>
      )}

      {selected && (
        <View style={styles.overlay}>
          <Ionicons name="checkmark-outline" size={16} color="white" />
        </View>
      )}

      {showForwardIcon && <Ionicons name="chevron-forward-outline" size={20} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    elevation: 3,
    height: 48,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    width: 48,
  },
  avatarLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  newMessageBadge: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    marginBottom: 4,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  newMessageText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    elevation: 3,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    top: 0,
    width: 24,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    marginVertical: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.1,
    marginTop: 3,
    maxWidth: 200,
  },
  subtitle2: {
    color: colors.textTertiary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  textsContainer: {
    flex: 1,
    marginStart: 16,
  },
});

ContactRow.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  onLongPress: PropTypes.func,
  selected: PropTypes.bool,
  showForwardIcon: PropTypes.bool,
  subtitle2: PropTypes.string,
  newMessageCount: PropTypes.number,
};

export default ContactRow;
