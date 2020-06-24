import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Content = styled.View`
  padding: 16px;
  background: #fff;
  border-radius: 2px;
`;

export const Title = styled.Text`
  color: #2d3748;
  font-size: 20px;
`;

export const Separator = styled.View`
  height: 2px;
  background: #cbd5e0;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ButtonSubmit = styled(TouchableOpacity)`
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`;

export const ButtonSubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
