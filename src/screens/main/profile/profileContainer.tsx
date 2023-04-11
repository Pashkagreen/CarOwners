import {useRef, useState} from 'react';
import {Keyboard} from 'react-native';

import {observer} from 'mobx-react-lite';

import {Account} from '../../../services/account';
import UserService from '../../../services/user';

import {flashMessage} from '../../../core/utils';

import {useStore} from '../../../store';
import ProfileView from './profileView';

const ProfileContainer = (): JSX.Element => {
  const {userStore} = useStore();

  const [username, setUsername] = useState(userStore.user.username);
  const [email, setEmail] = useState(userStore.user.email || '-');

  const flashRef = useRef();

  const [loading, setLoading] = useState(false);

  const logOut = async (): Promise<void> => {
    userStore.clearUser();
    await Account.removeAccessToken();
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
      } else {
        flashMessage({
          message: 'Error!',
          type: 'danger',
          description: 'Unknown error occured.',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileView
      email={email}
      flashRef={flashRef}
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
