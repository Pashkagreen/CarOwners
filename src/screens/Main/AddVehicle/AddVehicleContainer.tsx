import { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Image as IImage } from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import * as yup from 'yup';

import { flashMessage } from '../../../core/utils';

import { vehiclesSchema } from '../../../core/validators';
import { MyGarageStackParams } from '../../../navigation/roots/my-garage';
import { useStore } from '../../../store';
import AddVehicleView from './AddVehicleView';

type TProps = StackScreenProps<MyGarageStackParams, 'AddVehicle'>;

export type FormData = yup.InferType<typeof vehiclesSchema>;

export interface IUploadedPhoto extends Partial<IImage> {
  uri: string;
  thumbnailUri: string;
  fullFileName: string;
  thumbnailFileName: string;
  id?: string;
}

/**
 * Type guard for uploaded photo
 */
export const isUploadedPhoto = (array: IUploadedPhoto[]): boolean =>
  array.every(el => el.id && el.uri && el.thumbnailUri);

const AddVehicleContainer: FC<TProps> = ({ navigation, route }) => {
  const isEdit = route.params?.isEdit;
  const vehicleInfo = route.params?.vehicleInfo;

  const {
    vehiclesStore: {
      createVehicle: createVehicleEntity,
      updateVehicle: updateVehicleEntity,
      state,
    },
  } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(vehiclesSchema),
  });

  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [photos, setPhotos] = useState<IUploadedPhoto[]>(
    vehicleInfo?.photos || [],
  );

  const onSubmit = (data: FormData): Promise<void> =>
    isEdit ? updateVehicle(data) : createVehicle(data);

  const onFinishLoadPhotos = (p: IUploadedPhoto[]): void => {
    setLoadingPhotos(false);

    setPhotos(
      p.map(el => ({
        id: uuid.v4() as string,
        uri: el.uri,
        thumbnailUri: el.thumbnailUri,
        fullFileName: el.fullFileName,
        thumbnailFileName: el.thumbnailFileName,
      })),
    );
  };

  const onUploadPhotos = (images: IImage[]): void | boolean =>
    images.length > 0 && setLoadingPhotos(true);

  const createVehicle = async (newData: FormData): Promise<void> => {
    if (!isUploadedPhoto(photos) || loadingPhotos) {
      flashMessage({
        type: 'warning',
        message: 'Oops!',
        description: 'Photos are not uploaded yet.',
      });

      return;
    }

    await createVehicleEntity({
      ...newData,
      photos: photos ?? [],
    });

    goBack();
  };

  const updateVehicle = async (newData: FormData) => {
    if (!isUploadedPhoto(photos) || loadingPhotos) {
      flashMessage({
        type: 'warning',
        message: 'Oops!',
        description: 'Photos are not uploaded yet.',
      });

      return;
    }

    await updateVehicleEntity(vehicleInfo?.id as string, {
      ...newData,
      photos: photos ?? [],
    });

    goBack();
  };

  const goBack = (): void => navigation.goBack();

  return (
    <AddVehicleView
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      isEdit={isEdit}
      loading={state}
      photos={photos}
      setLoadingPhotos={setLoadingPhotos}
      vehicleInfo={vehicleInfo}
      onFinishLoadPhotos={onFinishLoadPhotos}
      onSubmit={onSubmit}
      onUploadPhotos={onUploadPhotos}
    />
  );
};

export default AddVehicleContainer;
