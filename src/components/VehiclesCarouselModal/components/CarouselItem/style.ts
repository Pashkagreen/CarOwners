import { StyleSheet } from 'react-native';

import {
  CARD_LENGTH,
  SIDECARD_LENGTH,
  SPACING,
} from '../../../../core/constants';
import { screenHeight } from '../../../../core/theme';

const getStyles = (imageSize: any, index: number, length: number) =>
  StyleSheet.create({
    imageContainer: {
      height: imageSize.height,
      marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
      marginRight: index === length - 1 ? SIDECARD_LENGTH : SPACING,
      top: (screenHeight - imageSize.height) / 2,
      width: CARD_LENGTH,
      zIndex: 2,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    loaderContainer: {
      left: CARD_LENGTH / 2 - 50,
      position: 'absolute',
      top: imageSize.height / 2 - 50,
      zIndex: -2,
    },
    lottieLoader: {
      height: 100,
      width: 100,
    },
  });

export default getStyles;
