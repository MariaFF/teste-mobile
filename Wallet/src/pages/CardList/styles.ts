import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px;
`;

export const CardInfo = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #718096;
  margin-top: 8px;
`;

export const AddCard = styled(TouchableOpacity)`
  margin-top: 16px;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const AddCardText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Separator = styled.View`
  background: #cbd5e0;
  width: 100%;
  height: 2px;
  margin: 16px 0 16px 0;
`;

export const TouchableItemList = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0 0 0;
`;

export const ItemListInfo = styled.Text`
  color: #2d3748;
  font-size: 18px;
`;

export const ItemListPrice = styled.Text`
  color: #4a5568;
  font-size: 16px;
`;

export const Transaction = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #2d3748;
  align-self: center;
`;
