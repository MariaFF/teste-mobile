import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

export const Separator = styled.View`
  background: #cbd5e0;
  height: 2px;
  margin: 16px 0 16px 0;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`;

export const BackToSignIn = styled.TouchableOpacity`
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackToSignInText = styled.Text`
  color: #000;
  font-size: 18px;
  margin-left: 16px;
`;
