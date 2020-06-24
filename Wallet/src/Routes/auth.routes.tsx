import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createStackNavigator();

const Routes = () => {
  return (
    <AuthStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#f0f0f5',
        },
      }}>
      {/* <AuthStack.Screen name="SignIn" component={SignIn} /> */}
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default Routes;
