import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  BackTitle,
  DeleteCard,
  Back,
  ContentModal,
  TitleModal,
  Separator,
  ButtonModal,
  ButtonModalText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {useNavigation} from '@react-navigation/native';
import {useWallet} from '../../hooks/wallet';
import getValidationsErrors from '../../utils/getValidationErros';
import api from '../../service/api';

interface Card {
  _id?: string;
  card_number: number;
  card_name: string;
  cvc: number;
  due_date: string;
}

const CardDetail: React.FC = (props) => {
  const navigation = useNavigation();
  const {finalNumbers} = useWallet();
  const formRef = useRef<FormHandles>(null);
  const cardNumberInputRef = useRef<TextInput>(null);
  const cardNameInputRef = useRef<TextInput>(null);
  const dueDateInputRef = useRef<TextInput>(null);
  const cvcInputRef = useRef<TextInput>(null);
  const {item} = props.route.params;
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleUpdateCard = useCallback(
    async (data: Card) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          card_number: Yup.number().required('Número do cartão obrigatório'),
          card_name: Yup.string().required('Nome obrigatório'),
          due_date: Yup.string().required('Validade obrigatória'),
          cvc: Yup.number().required('Cód obrigatório'),
        });

        await schema.validate(data, {abortEarly: false});

        await api.put(`/wallets/${data._id}`, data);
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao alterar cartão, tente novamente',
        );
      }
    },
    [navigation],
  );

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/wallets/${item._id}`, item);

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao excluir', 'Ocorreu um erro ao deletar carteira');
    }
  }, [item, navigation]);

  const openModal = useCallback(() => {
    setIsVisibleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  return (
    <>
      <Container>
        <Back
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <Icon name="chevron-left" size={22} />
          <BackTitle>Detalhes do Cartão</BackTitle>
        </Back>

        <View style={styles.card3}>
          <Text style={{color: '#fff', fontSize: 22, marginBottom: 16}}>
            {`****.****.****.${finalNumbers()}`}
          </Text>
        </View>

        <Form
          initialData={{
            card_number: item.card_number.toString(),
            card_name: item.card_name,
            due_date: item.due_date,
            cvc: item.cvc.toString(),
          }}
          ref={formRef}
          onSubmit={handleUpdateCard}>
          <Input
            ref={cardNumberInputRef}
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

        <Button style={{backgroundColor: '#1A202C'}} onPress={handleUpdateCard}>
          Confirmar Alteração
        </Button>
        <DeleteCard onPress={openModal}>Excluir Cartão</DeleteCard>
      </Container>
      <Modal
        isVisible={isVisibleModal}
        onBackdropPress={closeModal}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <ContentModal>
          <TitleModal>Tem certeza que deseja excluir o cartão ?</TitleModal>
          <Separator />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <ButtonModal onPress={closeModal} style={{width: 120}}>
              <ButtonModalText>Cancelar</ButtonModalText>
            </ButtonModal>
            <ButtonModal
              onPress={handleDelete}
              style={{backgroundColor: '#E53E3E', width: 120}}>
              <ButtonModalText>Excluir</ButtonModalText>
            </ButtonModal>
          </View>
        </ContentModal>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card3: {
    height: 160,
    width: 260,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginVertical: 16,
    backgroundColor: '#01579B',
  },
});

export default CardDetail;
