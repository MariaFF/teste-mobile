import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #2d3748;
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
