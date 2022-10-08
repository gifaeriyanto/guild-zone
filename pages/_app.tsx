import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { guildZoneTheme } from 'theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={guildZoneTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
