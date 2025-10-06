// src/screens/MeuPerfil/AddContatoScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function AddContatoScreen({ navigation, route }) {
  const contactToEdit = route.params.contactToEdit;
  const isEditing = !!contactToEdit;

  const [name, setName] = useState(contactToEdit?.name || '');
  const [phone, setPhone] = useState(contactToEdit?.phone || '');

  const handleSave = () => {
    if (!name || !phone) {
      alert('Por favor, preencha o nome e o telefone.');
      return;
    }

    const contactData = {
      id: isEditing ? contactToEdit.id : Date.now().toString(),
      name,
      phone,
    };

    route.params.onSave(contactData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Editar Contato' : 'Adicionar Contato'}
          </Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mãe, Pai, Mentor"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(92) 99999-9999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Salvar Alterações' : 'Salvar Contato'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005a9c',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#005a9c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});