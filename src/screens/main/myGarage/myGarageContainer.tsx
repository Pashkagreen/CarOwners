import MyGarageView from './myGarageView';
import {observer} from 'mobx-react-lite';

const MyGarageContainer = (): JSX.Element => {
  return <MyGarageView />;
};

export default observer(MyGarageContainer);
