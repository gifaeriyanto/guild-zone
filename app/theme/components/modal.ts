import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { cuboid2D } from 'theme/clipPaths';

const helpers = createMultiStyleConfigHelpers(parts.keys);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const ModalTheme = helpers.defineMultiStyleConfig({
  baseStyle: {
    dialog: {
      borderRadius: 0,
      clipPath: cuboid2D,
    },
    footer: {
      py: 6,
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
});
