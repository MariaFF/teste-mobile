import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 32px 8px;
`;

export const User = styled.View``;

export const Separator = styled.View`
  height: 1px;
  background: #cbd5e0;
  margin: 16px 0;
`;

export const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1a202c;
`;

export const UserEmail = styled.Text`
  font-size: 18px;
  color: #4a5568;
`;

export const SignOut = styled(TouchableOpacity)`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  bottom: 0;
  margin: 16px;
`;
