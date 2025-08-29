import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../config/constants';

const Button = ({ title, variant, onPress, disabled }) => {
  const getBackgroundColor = () => {
    if (variant === 'primary') {
      return disabled ? colors.textTertiary : colors.primary;
    }
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'primary') return 'white';
    if (variant === 'secondary') return colors.primary;
    return colors.text;
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: colors.primary,
          paddingHorizontal: variant === 'primary' || variant === 'secondary' ? 24 : 0,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonLabel, { color: getTextColor() }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  disabled: {
    elevation: 0,
    opacity: 0.6,
    shadowOpacity: 0,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
