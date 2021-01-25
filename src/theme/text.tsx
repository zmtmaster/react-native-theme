import React, { memo, useContext } from 'react';
import { Text as RNText } from 'react-native';
import { getComputedTextProps, TextProps } from './helpers';
import ThemeContext from './context';

function Text(props: TextProps) {
  const $theme = useContext(ThemeContext);
  const $props = getComputedTextProps(props, $theme);
  const { style = {}, children = null } = props;

  return (
    <RNText
      {...props}
      style={{
        ...$props,
        ...style,
      }}>
      {children}
    </RNText>
  );
}

export default memo(Text);
