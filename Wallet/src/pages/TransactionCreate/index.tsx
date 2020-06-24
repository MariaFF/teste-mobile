import React, {useRef, useCallback} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';

import {
  Content,
  Title,
  Separator,
  ButtonSubmit,
  ButtonSubmitText,
} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';
import getValidationsErrors from '../../utils/getValidationErros';
import api from '../../service/api';
import {useAuth} from '../../hooks/auth';
import {useWallet} from '../../hooks/wallet';

interface TransactionInFormData {
  date: string;
  description: string;
  value_transaction: string;
}

const TransactionCreate: React.FC = ({isVisible, closeModal}) => {
  const navigation = useNavigation();

  const dateInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const {user} = useAuth();
  const {wallet} = useWallet();

  const handleSubmitTransaction = useCallback(
    async (data: TransactionInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição obrigatória'),
          date: Yup.string().required('Data obrigatória'),
          value_transaction: Yup.string().required('Valor obrigatória'),
        });

        await schema.validate(data, {abortEarly: false});

        await api.post(`/transaction/${wallet._id}`, data, {
          headers: {
            user_id: user._id,
            wallet_id: wallet._id,
          },
        });

        closeModal();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao adicionar transação, tente novamente',
        );
      }
    },
    [navigation, user, wallet, isVisible],
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal}>
      <Content>
        <Title>Informe os dados da transação</Title>
        <Separator />
        <Form ref={formRef} onSubmit={handleSubmitTransaction}>
          <Input
            name="description"
            icon="file-text"
            placeholder="Descrição"
            returnKeyType="next"
            onSubmitEditing={() => {
              dateInputRef.current?.focus();
            }}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 5}}>
              <Input
                ref={dateInputRef}
                name="date"
                icon="calendar"
                placeholder="Data"
                returnKeyType="next"
                onSubmitEditing={() => {
                  valueInputRef.current?.focus();
                }}
              />
            </View>
            <View style={{flex: 3, marginLeft: 16}}>
              <Input
                ref={valueInputRef}
                name="value_transaction"
                icon="dollar-sign"
                placeholder="Valor"
                keyboardType="numeric"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </View>
          </View>
        </Form>
        <ButtonSubmit
          onPress={() => {
            formRef.current?.submitForm();
          }}
          style={{backgroundColor: '#1A202C'}}>
          <ButtonSubmitText>Adicionar Transação</ButtonSubmitText>
        </ButtonSubmit>
      </Content>
    </Modal>
  );
};

export default TransactionCreate;
