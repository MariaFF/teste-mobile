import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useAuth} from './auth';
import api from '../service/api';

interface WalletState {
  wallet: object;
}

interface CardData {
  _id?: string;
  date: string;
  card_number: number;
  card_name: string;
  cvc: number;
  due_date: string;
}

interface WalletContextData {
  wallet: object;
  setCurrentWallet(data: CardData): Promise<void>;
  finalNumbers(): Promise<string>;
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData);

const WalletProvider: React.FC = ({children}) => {
  const [data, setData] = useState<WalletState>({} as WalletState);
  const {user} = useAuth();

  const setCurrentWallet = useCallback((card) => {
    setData({wallet: card});
  }, []);

  const finalNumbers = useCallback(() => {
    const cardNumbertoString = data.wallet.card_number.toString();
    return cardNumbertoString.slice(12);
  }, [data]);

  return (
    <WalletContext.Provider
      value={{wallet: data.wallet, setCurrentWallet, finalNumbers}}>
      {children}
    </WalletContext.Provider>
  );
};

function useWallet(): WalletContextData {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within an WalletProvider');
  }

  return context;
}

export {WalletProvider, useWallet};
