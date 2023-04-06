import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MyGarage, AddVehicle } from '../../screens/index';


type MyGarageStackParams = {
  MyGarage: undefined;
  AddVehicle: undefined;
};

const MyGarageStack = createNativeStackNavigator<MyGarageStackParams>()

const MyGarageStackScreens = (): JSX.Element => (
  <MyGarageStack.Navigator>
    <MyGarageStack.Screen name='MyGarage' component={MyGarage}/>
    <MyGarageStack.Screen name='AddVehicle' component={AddVehicle}/>
  </MyGarageStack.Navigator>
)

export default MyGarageStackScreens