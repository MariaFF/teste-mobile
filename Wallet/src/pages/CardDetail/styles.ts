import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #f7fafc;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px;
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

export const ContentModal = styled.View`
  padding: 16px;
  background: #1a202c;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin: 0;
  width: 100%;
  justify-content: flex-end;
`;

export const TitleModal = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const Separator = styled.View`
  height: 2px;
  background: #cbd5e0;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ButtonModal = styled(TouchableOpacity)`
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`;

export const ButtonModalText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
