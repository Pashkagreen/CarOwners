import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { userSchema } from '../../../core/validators';
import { useStore } from '../../../store';
import ProfileView from './profileView';

export type FormData = yup.InferType<typeof userSchema>;

const ProfileContainer = (): JSX.Element => {
  const { userStore } = useStore();
  const { vehiclesStore } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(userSchema),
  });

  const logOut = async (): Promise<void> => {
    vehiclesStore.clearVehicles();
    userStore.clearUser();
  };

  const updateInfo = async (userData: FormData): Promise<void> => {
    Keyboard.dismiss();

    const updateData = {
      uid: userStore.user.uid,
      phoneNumber: userStore.user.phoneNumber,
      username: userData.username,
      email: userData?.email,
    };

    await userStore.updateUser(updateData);
  };

  return (
    <ProfileView
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      loading={userStore.state}
      logOut={logOut}
      userData={userStore.user}
      onSubmit={updateInfo}
    />
  );
};

export default observer(ProfileContainer);
