import { defineStyleConfig } from '@chakra-ui/react';
import { cuboid2D } from 'theme/clipPaths';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const TextareaTheme = defineStyleConfig({
  baseStyle: {
    clipPath: cuboid2D,
  },
  sizes: {},
  variants: {
    outline: {
      borderRadius: 0,
      border: 0,
      bgColor: 'brand.900',
      outline: 'none',
      _focus: {
        boxShadow: 'none',
        borderBottom: '2px solid',
        borderColor: 'brand.400',
      },
    },
  },
  defaultProps: {},
});
