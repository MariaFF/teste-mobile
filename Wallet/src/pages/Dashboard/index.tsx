import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Container, Content, CardInfo, AddCard} from './styles';

import CardList from '../CardList';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <CardList />
      </Content>
    </Container>
  );
};

export default Dashboard;
