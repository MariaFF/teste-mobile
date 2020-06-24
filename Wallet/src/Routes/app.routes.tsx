import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../components/Header';
import CardList from '../pages/CardList';
import CardDetail from '../pages/CardDetail';
import CardCreate from '../pages/CardCreate';

const AppStack = createStackNavigator();

const AppRoute: React.FC = (props) => {
  return (
    <AppStack.Navigator
      headerMode="screen"
      screenOptions={{
        header: () => <Header {...props} />,
        cardStyle: {
          backgroundColor: '#2d3748',
        },
      }}>
      <AppStack.Screen name="CardList" component={CardList} />
      <AppStack.Screen name="CardDetail" component={CardDetail} />
      <AppStack.Screen name="CardCreate" component={CardCreate} />
    </AppStack.Navigator>
  );
};

export default AppRoute;
