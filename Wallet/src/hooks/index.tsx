import React from 'react';

import {WalletProvider} from './wallet';
import {AuthProvider} from './auth';

const AppProvider: React.FC = ({children}) => {
  return (
    <AuthProvider>
      <WalletProvider>{children}</WalletProvider>
    </AuthProvider>
  );
};

export default AppProvider;
