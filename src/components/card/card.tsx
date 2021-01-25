import React from 'react';

import { Box } from '~/theme';

const Card: React.FC = ({ children }) => {
  return (
    <Box backgroundColor="main" borderRadius="s" padding="s">
      {children}
    </Box>
  );
};

export default Card;
