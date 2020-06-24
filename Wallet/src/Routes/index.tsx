import React from 'react';
import {View} from 'react-native';
import Home from '../pages/Home';
import AuthRoutes from '../Routes/auth.routes';

import {useAuth} from '../hooks/auth';
import {ActivityIndicator} from 'react-native';

const Routes: React.FC = () => {
  const {user, loading} = useAuth();
  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#5A67D8" />
        </View>
      ) : user ? (
        <Home />
      ) : (
        <AuthRoutes />
      )}
    </>
  );
};

export default Routes;
