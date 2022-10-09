import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { MainLayout } from 'layout/main';
import { AppProps } from 'next/app';
import { guildZoneTheme } from 'theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={guildZoneTheme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
};

export default App;
