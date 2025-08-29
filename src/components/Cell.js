import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../config/constants';

const Cell = ({
  title,
  icon,
  iconColor = colors.text,
  tintColor,
  style,
  onPress,
  secondIcon,
  subtitle,
  showForwardIcon = true,
  showIconBackground = true,
}) => (
  <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
    {showIconBackground ? (
      <View style={[styles.iconContainer, { backgroundColor: tintColor }]}>
        <Ionicons name={icon} size={24} marginStart={4} color={iconColor} />
      </View>
    ) : (
      <View style={styles.plainIconContainer}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
    )}

    <View style={styles.textsContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {showForwardIcon && <Ionicons name={secondIcon ?? 'chevron-forward-outline'} size={20} color={colors.textSecondary} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconContainer: {
    alignContent: 'center',
    borderRadius: 8,
    elevation: 1,
    height: 36,
    justifyContent: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 36,
  },
  plainIconContainer: {
    alignContent: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.1,
    marginTop: 2,
  },
  textsContainer: {
    flex: 1,
    marginStart: 12,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

Cell.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  tintColor: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func,
  secondIcon: PropTypes.string,
  subtitle: PropTypes.string,
  showForwardIcon: PropTypes.bool,
  showIconBackground: PropTypes.bool,
};

export default Cell;
