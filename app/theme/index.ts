import { extendTheme } from '@chakra-ui/react';
import { ButtonTheme } from 'theme/components/button';
import { InputTheme } from 'theme/components/input';
import { ModalTheme } from 'theme/components/modal';

export const guildZoneTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  fonts: {
    body: 'Montserrat, sans-serif',
    heading: 'Montserrat, sans-serif',
  },
  colors: {
    brand: {
      100: '#E7CEFE',
      200: '#CC9EFD',
      300: '#AC6DFA',
      400: '#9049F6',
      500: '#630FF1',
      600: '#4C0ACF',
      700: '#3807AD',
      800: '#27048B',
      900: '#1a202c',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: ButtonTheme,
    Input: InputTheme,
    Modal: ModalTheme,
  },
});
