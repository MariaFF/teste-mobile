import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthState {
  user: object;
}

interface SignInCredentials {
  user: object;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signUp(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem('@Wallet:user');

      if (user) {
        setData({user: JSON.parse(user)});
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signUp = useCallback(async (user) => {
    await AsyncStorage.setItem('@Wallet:user', JSON.stringify(user));

    setData({user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@Wallet:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, loading, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
