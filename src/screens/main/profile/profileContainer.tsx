import {useState} from 'react';
import {Keyboard} from 'react-native';

import {observer} from 'mobx-react-lite';

import UserService from '../../../services/user';

import {flashMessage} from '../../../core/utils';

import {useStore} from '../../../store';
import ProfileView from './profileView';

const ProfileContainer = (): JSX.Element => {
  const {userStore} = useStore();

  const [username, setUsername] = useState(userStore.user.username);
  const [email, setEmail] = useState(userStore.user.email);

  const [loading, setLoading] = useState(false);

  const logOut = async (): Promise<void> => {
    userStore.clearUser();
  };

  const updateInfo = async (): Promise<void> => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      const updateData = {
        uid: userStore.user.uid,
        phoneNumber: userStore.user.phoneNumber,
        username: username,
        email: email,
      };
      const {data} = await UserService.updateUser(updateData);

      if (data) {
        userStore.updateUser(data);
        flashMessage({
          message: 'Success!',
          type: 'success',
          description: 'Your profile information was updated.',
        });
      }
    } catch (err) {
      flashMessage({
        message: 'Error!',
        type: 'danger',
        description: 'Unknown error occured.',
      });
    }
    setLoading(false);
  };

  return (
    <ProfileView
      email={email}
      loading={loading}
      logOut={logOut}
      setEmail={setEmail}
      setUsername={setUsername}
      updateInfo={updateInfo}
      userData={userStore.user}
      username={username}
    />
  );
};

export default observer(ProfileContainer);
