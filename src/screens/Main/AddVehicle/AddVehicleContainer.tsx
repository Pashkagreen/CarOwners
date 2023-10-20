import { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { Image as ImageProp } from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import * as yup from 'yup';

import { flashMessage } from '../../../core/utils';

import { vehiclesSchema } from '../../../core/validators';
import { MyGarageStackParams } from '../../../navigation/MyGarageStack';
import { useStore } from '../../../store';
import AddVehicleView from './AddVehicleView';

type TProps = StackScreenProps<MyGarageStackParams, 'AddVehicle'>;

export type FormData = yup.InferType<typeof vehiclesSchema>;

export interface SetPhotos {
  uri: string;
  thumbnailUri: string;
  fullFileName: string;
  thumbnailFileName: string;
  id?: string | number[];
}

//Type Guards for Photos
export const isLocalPhoto = (array: any[]): array is ImageProp[] =>
  array.every(el => el.path);

export const isUploadedPhoto = (array: any[]): array is SetPhotos[] =>
  array.every(el => el.id);

export type LocalPhotosState = SetPhotos | ImageProp;

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
  const [photos, setPhotos] = useState<LocalPhotosState[]>(
    vehicleInfo?.photos || [],
  );

  const onSubmit = (data: FormData): Promise<void> =>
    isEdit ? updateVehicle(data) : createVehicle(data);

  const onFinishLoadPhotos = (p: SetPhotos[]): void => {
    setLoadingPhotos(false);

    setPhotos(
      p.map(el => ({
        id: uuid.v4(),
        uri: el.uri,
        thumbnailUri: el.thumbnailUri,
        fullFileName: el.fullFileName,
        thumbnailFileName: el.thumbnailFileName,
      })),
    );
  };

  const onUploadPhotos = (p: SetPhotos[]): void | boolean =>
    p.length > 0 && setLoadingPhotos(true);

  const createVehicle = async (newData: FormData): Promise<void> => {
    let modifiedData = { ...newData };

    if (loadingPhotos) {
      flashMessage({
        type: 'warning',
        message: 'Oops!',
        description: 'Photos are not uploaded yet.',
      });
      return;
    }

    if (photos.length) {
      modifiedData.photos = photos;
    } else {
      modifiedData.photos = [];
    }

    await createVehicleEntity(modifiedData);

    goBack();
  };

  const updateVehicle = async (newData: FormData) => {
    let modifiedData = { ...newData };

    if (loadingPhotos) {
      flashMessage({
        type: 'warning',
        message: 'Oops!',
        description: 'Photos are not uploaded yet.',
      });
      return;
    }

    if (photos.length) {
      modifiedData.photos = photos;
    } else {
      modifiedData.photos = [];
    }

    await updateVehicleEntity(vehicleInfo?.id, modifiedData);

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
