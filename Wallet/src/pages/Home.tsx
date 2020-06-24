import React from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContent,
} from '@react-navigation/drawer';
import AppRoute from '../Routes/app.routes';

import {
  Container,
  Separator,
  User,
  UserEmail,
  UserName,
  SignOut,
} from '../pages/styles';
import Icon from 'react-native-vector-icons/Feather';
import {useAuth} from '../hooks/auth';

const Drawer = createDrawerNavigator();

const Home = () => {
  const {signOut, user} = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <Container>
            <UserName>{user.nome}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <Separator />
            <DrawerItem
              label="Meus Cartões"
              labelStyle={{fontSize: 18}}
              icon={() => <Icon name="credit-card" size={22} />}
              onPress={() => console.log('teste')}
              {...props}
            />
            <DrawerItem
              label="Editar perfil"
              labelStyle={{fontSize: 18}}
              icon={() => <Icon name="user" size={22} />}
              onPress={() => console.log('teste')}
              {...props}
            />
            <DrawerItem
              label="Configurações"
              labelStyle={{fontSize: 18}}
              icon={() => <Icon name="settings" size={22} />}
              onPress={() => console.log('teste')}
              {...props}
            />
          </Container>
          <SignOut onPress={signOut}>
            <Icon name="log-out" size={22} />
            <Text style={{fontSize: 18, marginLeft: 8}}>Sair</Text>
          </SignOut>
        </>
      )}>
      <Drawer.Screen name="AppRoute" component={AppRoute} />
    </Drawer.Navigator>
  );
};

export default Home;
