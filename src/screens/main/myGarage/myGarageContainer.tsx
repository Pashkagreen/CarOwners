import { useStore } from '../../../store';
import MyGarageView from './myGarageView';
import { observer } from 'mobx-react-lite';

function MyGarageContainer (): JSX.Element {
  
  return <MyGarageView />;
};

export default observer(MyGarageContainer);