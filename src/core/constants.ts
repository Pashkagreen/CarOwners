import { ResizeFormat } from 'react-native-image-resizer';

import { screenWidth } from './theme';

// ==== PUBLIC API KEY ===
export const ACCESS_KEY = 'bcf8028e033e2094a6cebda23275f95b';

// ==== IMAGE PICKER ====
export const resizePhotoParams = {
  width: 256,
  height: 256,
  format: 'JPEG' as ResizeFormat,
  quality: 20,
  rotation: 0,
};

// ==== IMAGE CAROUSEL ======

export const CARD_LENGTH = screenWidth * 0.8;
export const SPACING = screenWidth * 0.02;
export const SIDECARD_LENGTH = (screenWidth * 0.18) / 2;
export const SNAP_INTERVAL = CARD_LENGTH + SPACING * 2;
