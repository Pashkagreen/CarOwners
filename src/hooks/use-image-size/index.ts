import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { screenWidth } from '@theme';

export interface IImageSize {
  width: number;
  height: number;
}

const useImageSize = (uri: string) => {
  const [imageSize, setImageSize] = useState<IImageSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      // use aspect ratio to set the size of the image relative to react-native pixels.
      setImageSize({
        width: screenWidth,
        height: (height / width) * screenWidth,
      });
    });
  }, []);

  return imageSize;
};

export default useImageSize;
