import { defineStyleConfig } from '@chakra-ui/react';
import { cuboid2D } from 'theme/clipPaths';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const ButtonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 0,
  },
  sizes: {
    md: {},
  },
  variants: {
    primary: {
      bgColor: 'brand.500',
      clipPath: cuboid2D,
      px: 8,
    },
    solid: {
      clipPath: cuboid2D,
      px: 8,
    },
    ghost: {
      _hover: {
        bgColor: 'inherit',
      },
      _active: {
        bgColor: 'inherit',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
});
