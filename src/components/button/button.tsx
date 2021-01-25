import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, useTheme } from '~/theme';

const Button: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Box backgroundColor="dark" borderRadius="m" padding="m">
      <TouchableOpacity
        style={{
          borderBottomColor: theme.colors.warning,
          borderBottomWidth: 1,
        }}>
        {children}
      </TouchableOpacity>
    </Box>
  );
};

export default Button;
