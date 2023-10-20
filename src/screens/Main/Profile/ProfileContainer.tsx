import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { userSchema } from '../../../core/validators';
import { useStore } from '../../../store';
import ProfileView from './ProfileView';

export type FormData = yup.InferType<typeof userSchema>;

const ProfileContainer = () => {
  const {
    userStore: { user, state, updateUser, clearUser },
  } = useStore();
  const {
    vehiclesStore: { clearVehicles },
  } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(userSchema),
  });

  const logOut = (): void => {
    clearVehicles();
    clearUser();
  };

  const updateInfo = async (userData: FormData): Promise<void> => {
    Keyboard.dismiss();

    const updateData = {
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      username: userData.username,
      email: userData?.email,
    };

    await updateUser(updateData);
  };

  return (
    <ProfileView
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      loading={state}
      logOut={logOut}
      userData={user}
      onSubmit={updateInfo}
    />
  );
};

export default observer(ProfileContainer);
