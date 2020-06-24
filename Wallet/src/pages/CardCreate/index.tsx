import React, {useRef, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../service/api';
import {useAuth} from '../../hooks/auth';
import {useWallet} from '../../hooks/wallet';
import {Container, Content, BackTitle, Back} from './styles';
import getValidationsErrors from '../../utils/getValidationErros';

interface CardInFormData {
  date: string;
  card_number: number;
  card_name: string;
  cvc: number;
  due_date: string;
}

const CardCreate: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const cardNameInputRef = useRef<TextInput>(null);
  const dueDateInputRef = useRef<TextInput>(null);
  const cvcInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const handleSubmitCard = useCallback(
    async (data: CardInFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          card_number: Yup.number().required('Número do cartão obrigatório'),
          card_name: Yup.string().required('Nome obrigatório'),
          due_date: Yup.string().required('Validade obrigatória'),
          cvc: Yup.number().required('Cód obrigatório'),
        });

        await schema.validate(data, {abortEarly: false});

        await api.post('/wallets/', data, {
          headers: {
            user_id: user._id,
          },
        });
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao adicionar cartão, tente novamente',
        );
      }
    },
    [user, navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Container>
          <Back
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <Icon name="chevron-left" size={22} />
            <BackTitle>Adicionar Cartão</BackTitle>
          </Back>

          <Content>
            <Form ref={formRef} onSubmit={handleSubmitCard}>
              <Input
                name="card_number"
                icon="credit-card"
                placeholder="Número do cartão"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cardNameInputRef.current?.focus();
                }}
              />
              <Input
                ref={cardNameInputRef}
                name="card_name"
                icon="user"
                autoCorrect={false}
                placeholder="Nome impresso no cartão"
                returnKeyType="next"
                onSubmitEditing={() => {
                  dueDateInputRef.current?.focus();
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 5}}>
                  <Input
                    ref={dueDateInputRef}
                    name="due_date"
                    icon="calendar"
                    placeholder="Validade"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      cvcInputRef.current?.focus();
                    }}
                  />
                </View>
                <View style={{flex: 3, marginLeft: 16}}>
                  <Input
                    ref={cvcInputRef}
                    name="cvc"
                    icon="lock"
                    placeholder="CVC"
                    keyboardType="numeric"
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      formRef.current?.submitForm();
                    }}
                  />
                </View>
              </View>
            </Form>
          </Content>

          <Button
            style={{backgroundColor: '#1A202C'}}
            onPress={() => {
              formRef.current?.submitForm();
            }}>
            Adicionar Cartão
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card3: {
    height: 160,
    width: 260,
    borderRadius: 8,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginVertical: 16,
  },
});

export default CardCreate;
