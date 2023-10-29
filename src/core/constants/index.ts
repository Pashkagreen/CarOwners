import { screenWidth } from '@theme';
import { ResizeFormat } from 'react-native-image-resizer';

// ==== PUBLIC API KEY ===
export const ACCESS_KEY = '783f8483a7ab47749f8a8d35ad2402b5';

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
