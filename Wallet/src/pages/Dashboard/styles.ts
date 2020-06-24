import styled from 'styled-components/native';

export const Container = styled.View`
  background: #2d3748;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserText = styled.Text`
  margin-right: 8px;
  color: #fff;
  font-size: 20px;
`;

export const UserAvatar = styled.View`
  background-color: #fff;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const UserAvatarText = styled.Text`
  color: #5a67d8;
  font-size: 28px;
  font-family: 'RobotoSlab-Regular';
`;

export const Content = styled.View`
  background: #fff;
  flex: 1;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  justify-content: center;
  align-items: center;
`;

export const CardInfo = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #718096;
  margin-top: 8px;
`;

export const AddCard = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #5a67d8;
  margin-top: 16px;
`;
