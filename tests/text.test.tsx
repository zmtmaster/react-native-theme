import React from 'react';
import {
  render as reactTestingLibraryRender,
  RenderOptions,
} from '@testing-library/react-native';
import { Text as RNText } from 'react-native';
import { noop } from 'lodash/fp';

import ThemeProvider, { Text } from '~/theme';

const theme = {
  colors: {
    textColor: '#f00',
  },
  spacing: {
    s: 8,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    fail: {
      fontSize: 30,
      color: 'testColor',
      paddingHorizontal: 's',
    },
    success: {
      fontSize: 30,
      color: 'textColor',
      paddingHorizontal: 's',
    },
  },
};

const text = 'hello world';

const consoleError = console.error.bind(console);
const consoleInfo = console.info.bind(console);

function wrapper({ children = null }) {
  // @ts-expect-error theme used here is locally provided thus it does not contain all the colors and spacings.
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

function render(ui: React.ReactElement<any>, options: RenderOptions = {}) {
  return reactTestingLibraryRender(ui, { wrapper, ...options });
}

describe('should test use-cases of Theme Text', () => {
  it(`should render \`${text}\` with default theme properties`, () => {
    const rendered = render(<Text>{text}</Text>);
    const expected = reactTestingLibraryRender(<RNText>{text}</RNText>);

    expect(rendered.toJSON()).toEqual(expected.toJSON());
  });

  it(`should fail render \`${text}\` world with a broken variant`, () => {
    global.console.error = noop;

    const $catch = jest.fn();
    try {
      // @ts-expect-error variant here would throw TS error since it does not exist on
      // theme Type but does have it on the local theme
      render(<Text variant="fail">{text}</Text>);
    } catch (error) {
      $catch();
    } finally {
      expect($catch).toBeCalledTimes(1);
    }
    global.console.error = consoleError;
  });

  it(`should render \`${text}\` world with a working variant`, () => {
    // @ts-expect-error variant here would throw TS error since it does not exist on
    // theme Type but does have it on the local theme
    const rendered = render(<Text variant="success">{text}</Text>);
    const expected = reactTestingLibraryRender(
      <RNText
        style={{
          fontSize: 30,
          color: '#f00',
          paddingHorizontal: 8,
        }}>
        {text}
      </RNText>,
    );

    expect(rendered.toJSON()).toEqual(expected.toJSON());
  });

  it('should render hello world with inline style props', () => {
    const rendered = render(
      // @ts-expect-error variant here would throw TS error since it does not exist on
      // theme Type but does have it on the local theme
      <Text color="textColor" fontSize={15} fontWeight="bold">
        {text}
      </Text>,
    );
    const expected = reactTestingLibraryRender(
      <RNText
        style={{
          color: '#f00',
          fontSize: 15,
          fontWeight: 'bold',
        }}>
        {text}
      </RNText>,
    );
    expect(rendered.toJSON()).toEqual(expected.toJSON());
  });
});
