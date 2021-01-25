import { omit, entries, assign, toString } from 'lodash/fp';
import {
  ScaledSize as Dimensions,
  TextStyle,
  TextProps as RNTextProps,
  ViewStyle,
  ViewProps,
} from 'react-native';
import { ReactNode } from 'react';

import { AmountType } from '~/@types/common.d.ts';

import { Theme, ThemeVariant, ThemeSpacing, ThemeColor } from './theme';

const properties = {
  spacing: 'spacing',
  colors: 'colors',
};
const sharedProps = {
  padding: {
    property: properties.spacing,
  },
  paddingEnd: {
    property: properties.spacing,
  },
  paddingStart: {
    property: properties.spacing,
  },
  paddingHorizontal: {
    property: properties.spacing,
  },
  paddingVertical: {
    property: properties.spacing,
  },
  paddingLeft: {
    property: properties.spacing,
  },
  paddingTop: {
    property: properties.spacing,
  },
  paddingRight: {
    property: properties.spacing,
  },
  paddingBottom: {
    property: properties.spacing,
  },
  margin: {
    property: properties.spacing,
  },
  marginEnd: {
    property: properties.spacing,
  },
  marginStart: {
    property: properties.spacing,
  },
  marginHorizontal: {
    property: properties.spacing,
  },
  marginVertical: {
    property: properties.spacing,
  },
  marginLeft: {
    property: properties.spacing,
  },
  marginTop: {
    property: properties.spacing,
  },
  marginRight: {
    property: properties.spacing,
  },
  marginBottom: {
    property: properties.spacing,
  },
  borderColor: {
    property: properties.colors,
  },
  borderLeftColor: {
    property: properties.colors,
  },
  borderTopColor: {
    property: properties.colors,
  },
  borderRightColor: {
    property: properties.colors,
  },
  borderBottomColor: {
    property: properties.colors,
  },
  borderRadius: {
    property: properties.spacing,
  },
  borderLeftRadius: {
    property: properties.spacing,
  },
  borderTopRadius: {
    property: properties.spacing,
  },
  borderRightRadius: {
    property: properties.spacing,
  },
  borderBottomRadius: {
    property: properties.spacing,
  },
  borderBottomLeftRadius: {
    property: properties.spacing,
  },
  borderBottomRightRadius: {
    property: properties.spacing,
  },
  borderTopLeftRadius: {
    property: properties.spacing,
  },
  borderTopRightRadius: {
    property: properties.spacing,
  },
  borderBottomStartRadius: {
    property: properties.spacing,
  },
  borderTopStartRadius: {
    property: properties.spacing,
  },
  borderBottomEndRadius: {
    property: properties.spacing,
  },
  borderTopEndRadius: {
    property: properties.spacing,
  },
  borderEndColor: {
    property: properties.colors,
  },
  borderStartColor: {
    property: properties.colors,
  },
};
const boxProps = {
  ...sharedProps,
  backgroundColor: {
    property: properties.colors,
  },
};
const textProps = {
  ...sharedProps,
  color: {
    property: properties.colors,
  },
};

export interface TextProps extends TextStyle {
  color?: ThemeColor;
  style?: TextStyle;
  children?: string;
  amount?: AmountType;
  variant?: ThemeVariant;
}

export interface BoxProps
  extends Omit<
    ViewStyle,
    | 'borderRadius'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius'
  > {
  borderColor?: ThemeColor;
  borderTopColor?: ThemeColor;
  borderBottomColor?: ThemeColor;
  borderLeftColor?: ThemeColor;
  borderRightColor?: ThemeColor;
  borderRadius?: number | ThemeSpacing;
  borderTopLeftRadius?: number | ThemeSpacing;
  borderTopRightRadius?: number | ThemeSpacing;
  borderBottomLeftRadius?: number | ThemeSpacing;
  borderBottomRightRadius?: number | ThemeSpacing;
  backgroundColor?: ThemeColor;
  padding?: ThemeSpacing;
  paddingBottom?: ThemeSpacing;
  paddingTop?: ThemeSpacing;
  paddingLeft?: ThemeSpacing;
  paddingRight?: ThemeSpacing;
  paddingHorizontal?: ThemeSpacing;
  paddingVertical?: ThemeSpacing;
  margin?: ThemeSpacing;
  marginBottom?: ThemeSpacing;
  marginTop?: ThemeSpacing;
  marginLeft?: ThemeSpacing;
  marginRight?: ThemeSpacing;
  marginHorizontal?: ThemeSpacing;
  marginVertical?: ThemeSpacing;
  style?: ViewStyle;
  children?: ReactNode | ReactNode[] | null;
}

/* Following functions are a setup for break-points will be provided as follows
  `const theme = {
    colors: {
      ...
      light: pallette.white,
      dark: pallette.black,
    }
    spacing ...
    breakpoints: { // by Width of device
      phone: 0,
      tablet: 768,
    },
  };`
  and used as such `<Box backgroundColor={{ phone: 'light', tablet: 'dark' }} />`
  When implementing, remove ESLINT disable
*/

/**
 * @private
 * @name getBreakpointForScreenSize
 * Used to get the correct break point based on the number from theme schema
 *
 * returns the break point required
 */
function getBreakpointForScreenSize({
  themeContent,
  dimensions,
}: {
  themeContent: Theme;
  dimensions: Dimensions;
}): string | null {
  const sortedBreakpoints = entries(themeContent.breakpoints ?? {}).sort(
    ([, valA], [, valB]) => {
      return valA - valB;
    },
  );

  return sortedBreakpoints.reduce<null | string>(
    (accumulator, [breakpoint, minWidth]) => {
      if (dimensions.width >= minWidth) {
        return breakpoint;
      }

      return accumulator;
    },
    null,
  );
}

/**
 * @private
 * @name getResponsiveValue
 * Used to return the value from the theme schema based on the breakpoint
 * return the value required based on the value provided, if value was an break point object
 * the returned value will be an object containing all properties, otherwise return the primitive value
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
function getResponsiveValue({
  value,
  dimensions,
  themeContent,
}: {
  value: number | string | Record<string, string | number>;
  dimensions: Dimensions;
  themeContent: Theme;
}): number | string | Record<string, string | number> {
  if (typeof value === 'object') {
    return value[getBreakpointForScreenSize({ themeContent, dimensions })];
  }

  return value;
}
/* eslint-enable-next-line @typescript-eslint/no-unused-vars-experimental */

export function getComputedBoxProps(
  props: BoxProps,
  themeContext: Theme,
): ViewProps {
  return entries(props).reduce((accumulator, [key, value]) => {
    if (boxProps[key]) {
      const { property } = boxProps[key];

      const computed = themeContext[property][value];

      if (__DEV__ && !computed) {
        throw new Error(
          `Tried to use value="${value}" but not found in theme.${property}.\nCheck theme`,
        );
      }

      return assign({ [key]: computed }, accumulator);
    }

    return assign({ [key]: value }, accumulator);
  }, {});
}

function getTextVariantProps(
  themeContent: Theme,
  variant: ThemeVariant = null,
) {
  if (!variant) {
    return {};
  }

  return themeContent?.textVariants[variant] ?? {};
}

interface ComputedTextProps extends RNTextProps {
  variant?: ThemeVariant;
}

export function getComputedTextProps(
  props: ComputedTextProps,
  themeContext: Theme,
): TextStyle {
  const $props = omit(['variant', 'children', 'style'], {
    ...getTextVariantProps(themeContext, props.variant),
    ...props,
  });

  return entries($props).reduce((accumulator, [key, value]) => {
    if (textProps[key]) {
      const { property } = textProps[key];
      const computed = themeContext[property][value];

      if (__DEV__ && !computed) {
        throw new Error(
          `Tried to use value="${toString(
            value,
          )}" but not found in theme.${property}.\nCheck theme`,
        );
      }

      return assign({ [key]: computed }, accumulator);
    }

    return assign({ [key]: value }, accumulator);
  }, {});
}
