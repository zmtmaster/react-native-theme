import React, { memo, useContext } from 'react';
import { View } from 'react-native';

import ThemeContext from './context';
import { getComputedBoxProps, BoxProps } from './helpers';

function Box(props: BoxProps) {
  const $theme = useContext(ThemeContext);
  const $props = getComputedBoxProps(props, $theme);
  const { style = {}, children = null } = props;

  return (
    <View
      {...props}
      style={{
        ...$props,
        ...style,
      }}>
      {children}
    </View>
  );
}

export default memo(Box);
