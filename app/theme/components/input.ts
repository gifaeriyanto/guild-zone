import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { cuboid2D } from 'theme/clipPaths';

const helpers = createMultiStyleConfigHelpers(parts.keys);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const InputTheme = helpers.defineMultiStyleConfig({
  baseStyle: {
    field: {
      clipPath: cuboid2D,
    },
  },
  sizes: {},
  variants: {
    outline: {
      field: {
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
  },
  defaultProps: {},
});
