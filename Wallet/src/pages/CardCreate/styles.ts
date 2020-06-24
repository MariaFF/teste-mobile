import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #f7fafc;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px;
`;

export const Content = styled.View`
  justify-content: center;
  margin-top: 16px;
`;

export const BackTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1a202c;
`;

export const DeleteCard = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #e53e3e;
  margin-top: 8px;
  align-self: center;
`;

export const Back = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;
