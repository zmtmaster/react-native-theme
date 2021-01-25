import React from 'react';
import Provider, { Box, Text } from '~/theme';

import Button from '~/components/button';
import Card from '~/components/card';

function Route() {
  return (
    <Provider>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Card>
          <Text color="heading" fontWeight="bold">
            Card
          </Text>
          <Box paddingVertical="m">
            <Button>
              <Text variant="button">Button</Text>
            </Button>
          </Box>
        </Card>
      </Box>
    </Provider>
  );
}

export default Route;
