import React from 'react';
import {View} from 'react-native';

import {
  Container,
  UserContainer,
  UserText,
  UserAvatar,
  UserAvatarText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/auth';

const Header: React.FC = ({navigation}) => {
  const {user} = useAuth();

  return (
    <Container>
      <Icon
        onPress={() => navigation.openDrawer()}
        name="menu"
        size={28}
        color="#fff"
      />

      <UserContainer>
        {/* api não retorna nome */}
        <UserText>{`Olá, ${user.nome}`}</UserText>
        <UserAvatar>
          <UserAvatarText>{user.email[0]}</UserAvatarText>
        </UserAvatar>
      </UserContainer>
    </Container>
  );
};

export default Header;
