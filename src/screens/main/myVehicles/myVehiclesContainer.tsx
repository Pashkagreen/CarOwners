import {observer} from 'mobx-react-lite';

import MyGarageView from './myVehiclesView';

const MyGarageContainer = (): JSX.Element => <MyGarageView />;

export default observer(MyGarageContainer);
