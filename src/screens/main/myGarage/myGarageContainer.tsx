import {observer} from 'mobx-react-lite';

import MyGarageView from './myGarageView';

const MyGarageContainer = (): JSX.Element => <MyGarageView />;

export default observer(MyGarageContainer);
