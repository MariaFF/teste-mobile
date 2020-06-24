import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  AddCard,
  Separator,
  TouchableItemList,
  ItemListInfo,
  ItemListPrice,
  Transaction,
  CardInfo,
  AddCardText,
} from './styles';
import cards from '../../assets/cards.png';
import TransactionCreate from '../../pages/TransactionCreate';
import {useNavigation} from '@react-navigation/native';
import api from '../../service/api';

import {useAuth} from '../../hooks/auth';
import {useWallet} from '../../hooks/wallet';

interface Card {
  date: string;
  card_number: number;
  card_name: string;
  cvc: number;
  due_date: string;
  numberToString: string;
  displacement: number;
  color: string;
}

interface Transaction {
  date: string;
  description: string;
  value_transaction: string;
}

const CardList: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const {wallet, setCurrentWallet, finalNumbers} = useWallet();
  const [wallets, setWallets] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [currentWalletIndex, setCurrentWalletIndex] = useState(1);

  // Carrega as transações
  useEffect(() => {
    async function loadTransactions() {
      // 5eee55f7d14c880021922d15
      try {
        const response = await api.get('/transaction', {
          headers: {
            user_id: user._id,
            wallet_id: wallet._id,
          },
        });

        setTransactions(response.data);
      } catch (error) {}
    }
    loadTransactions();
  }, [user, wallets, wallet, isVisibleModal]);

  // Carrega os cartões
  useEffect(() => {
    async function loadWallets() {
      try {
        const response = await api.get('/wallets', {
          headers: {
            user_id: user._id,
          },
        });
        setCurrentWallet(response.data[0]);
        setWallets(response.data);
        setLoading(false);
      } catch (error) {}
    }
    loadWallets();
  }, [user, navigation, setCurrentWallet]);

  const openModal = useCallback(() => {
    setIsVisibleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  // Não muda o estado quando volta
  const changeCard = useCallback(
    (change) => {
      if (currentWalletIndex >= wallets.length && change > 0) {
        return;
      }
      if (
        (currentWalletIndex === wallets.length && change < 0) ||
        (currentWalletIndex < wallets.length && change > 0) ||
        (currentWalletIndex < wallets.length && change < 0)
      ) {
        setCurrentWalletIndex(currentWalletIndex + change);
        setCurrentWallet(wallets[currentWalletIndex]);
        console.log('currentWalletIndex if antes', wallets[currentWalletIndex]);
      }
    },
    [currentWalletIndex, wallets, setCurrentWallet],
  );

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#5A67D8" />
      ) : (
        <>
          {wallets.length > 0 ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => changeCard(-1)}
                  name="chevron-left"
                  size={30}
                  style={{alignSelf: 'center'}}
                />
                <View>
                  <View style={styles.card1} />
                  <View style={styles.card2} />
                  <TouchableOpacity
                    style={styles.card3}
                    onPress={() =>
                      navigation.navigate('CardDetail', {
                        item: wallet,
                      })
                    }>
                    <Text style={{color: '#fff', fontSize: 22}}>
                      {`****.****.****.${finalNumbers()}`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Icon
                  onPress={() => changeCard(+1)}
                  name="chevron-right"
                  size={30}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <AddCard onPress={() => navigation.navigate('CardCreate')}>
                <Icon name="plus-square" size={22} color="#5a67d8" />
                <AddCardText style={{color: '#5a67d8', marginLeft: 8}}>
                  Adicionar novo cartão
                </AddCardText>
              </AddCard>
              <AddCard onPress={openModal}>
                <Icon name="plus-square" size={22} color="#2D3748" />
                <AddCardText style={{color: '#2D3748', marginLeft: 8}}>
                  Adicionar transação
                </AddCardText>
              </AddCard>
              <Separator />
              <Transaction>Transaçoes recentes</Transaction>
              <FlatList
                data={transactions}
                style={{width: '100%'}}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({item}) => (
                  <TouchableItemList
                    activeOpacity={0.5}
                    key={item._id}
                    onPress={() => {}}>
                    <View>
                      <ItemListInfo>{item.description}</ItemListInfo>
                      <ItemListInfo>{`R$: ${item.value_transaction}`}</ItemListInfo>
                    </View>

                    <ItemListPrice>10/06</ItemListPrice>
                  </TouchableItemList>
                )}
              />
            </>
          ) : (
            <>
              <Image source={cards} />
              <CardInfo>Nenhum cartão cadastrado</CardInfo>
              <AddCard onPress={() => navigation.navigate('CardCreate')}>
                <Icon name="plus-square" size={22} color="#5a67d8" />
                <AddCardText style={{color: '#5a67d8', marginLeft: 8}}>
                  Adicionar novo cartão
                </AddCardText>
              </AddCard>
            </>
          )}
          <TransactionCreate
            isVisible={isVisibleModal}
            closeModal={closeModal}
          />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  card1: {
    height: 180,
    width: 280,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  card2: {
    position: 'absolute',
    height: 180,
    width: 280,
    bottom: 10,
    right: 10,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  card3: {
    position: 'absolute',
    height: 180,
    width: 280,
    bottom: 20,
    right: 20,
    borderRadius: 8,
    backgroundColor: 'red',

    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
});

export default CardList;
