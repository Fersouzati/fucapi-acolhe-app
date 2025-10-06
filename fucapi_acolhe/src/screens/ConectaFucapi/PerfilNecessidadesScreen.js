// src/screens/ConectaFucapi/PerfilNecessidadesScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

// Contatos com quem o perfil já foi "compartilhado" (simulação)
const DUMMY_SHARED_CONTACTS = [
    { id: '1', name: 'Prof. Adiane Fernandes' },
    { id: '2', name: 'Prof. Ricardo Gomes' },
];

export default function PerfilNecessidadesScreen({ navigation }) {
    const [profileText, setProfileText] = useState(
        'Exemplo:\n• Prefiro receber instruções por escrito, pois me ajuda a processar melhor a informação.\n• Em discussões em grupo, às vezes preciso de um momento extra para formular minha resposta.\n• Ambientes muito barulhentos podem me sobrecarregar.'
    );
    const [sharedWith, setSharedWith] = useState(DUMMY_SHARED_CONTACTS);

    const handleSave = () => {
        Alert.alert('Perfil Salvo', 'Suas informações foram salvas com sucesso!');
    };
    
    const handleStopSharing = (contactToRemove) => {
        Alert.alert(
            'Parar de Compartilhar?',
            `Você tem certeza que deseja parar de compartilhar seu perfil com ${contactToRemove.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Confirmar', 
                    onPress: () => {
                        setSharedWith(prevContacts => prevContacts.filter(contact => contact.id !== contactToRemove.id));
                    },
                    style: 'destructive' 
                },
            ]
        );
    };

    return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Meu Perfil de Necessidades</Text>
                <Text style={styles.subtitle}>
                    Este é um espaço privado e opcional. As informações aqui só serão compartilhadas com os professores que você escolher.
                </Text>
            </View>

            <TextInput
                style={styles.textInput}
                multiline
                value={profileText}
                onChangeText={setProfileText}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <View style={styles.sharingSection}>
                <Text style={styles.sharingTitle}>Compartilhado Com:</Text>
                {sharedWith.map(contact => (
                    <View key={contact.id} style={styles.sharedContactItem}>
                        <Text style={styles.sharedContactName}>{contact.name}</Text>
                        <TouchableOpacity onPress={() => handleStopSharing(contact)}>
                            <Text style={styles.stopSharingButton}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity 
                    style={styles.shareButton} 
                    onPress={() => alert('Em um app real, aqui abriria sua lista de contatos para você escolher com quem compartilhar.')}
                >
                    <Text style={styles.shareButtonText}>+ Compartilhar com um novo professor</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005a9c',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  textInput: {
    backgroundColor: '#ffffff',
    height: 200,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#005a9c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sharingSection: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  sharingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sharedContactItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sharedContactName: {
    fontSize: 16,
  },
  stopSharingButton: {
    color: '#c0392b', // Vermelho
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#eaf4ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  shareButtonText: {
    color: '#005a9c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});