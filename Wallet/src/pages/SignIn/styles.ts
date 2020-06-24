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

export const SubTitle = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-bottom: 16px;
`;

export const ForgotPasswordText = styled.Text`
  color: #5a67d8;
  font-size: 18px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
`;

export const CreateAccountButtonText = styled.Text`
  color: #5a67d8;
  font-size: 18px;
  margin-left: 8px;
`;

export const CreateAccountTextInfo = styled.Text`
  color: #2d3748;
  font-size: 18px;
`;
