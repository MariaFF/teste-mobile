import React, {useRef, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  SubTitle,
  CreateAccountTextInfo,
  Separator,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErros';
// import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  // const {signIn} = useAuth();

  passwordInputRef.current?.focus();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {abortEarly: false});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Title>Bem vindo,</Title>
            <SubTitle>Faça login para continuar</SubTitle>

            <Separator />

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="senha"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <ForgotPassword onPress={() => {}}>
                <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
              </ForgotPassword>

              <Button
                style={{backgroundColor: '#5A67D8'}}
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>
            </Form>

            <CreateAccountButton onPress={() => navigation.navigate('Home')}>
              <CreateAccountTextInfo>Ainda não é membro?</CreateAccountTextInfo>
              <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
