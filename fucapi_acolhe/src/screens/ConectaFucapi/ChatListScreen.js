// src/screens/ConectaFucapi/ChatListScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// VERIFIQUE COMO ESTÁ SUA LISTA DE CONTATOS AQUI.
// Adicionei a Prof. Adiane Fernandes seguindo o padrão.
const DUMMY_CONTACTS = [
  { id: '1', name: 'Prof. Adiane Fernandes', department: 'Programação WEB' },
  { id: '2', name: 'Prof. Ricardo Gomes', department: 'Lógica de Programação' },
  { id: '3', name: 'Secretaria Acadêmica', department: 'Assuntos Gerais' },
  { id: '4', name: 'Coordenação de Curso', department: 'Técnico de Informática' },
  { id: '5', name: 'Biblioteca', department: 'Empréstimos e Devoluções' },
];

export default function ChatListScreen({ navigation }) {
  
  // ESTA É A FUNÇÃO QUE CRIA AS INICIAIS. VERIFIQUE SE A SUA ESTÁ IGUAL.
  const getInitials = (name) => {
    const names = name.split(' ');
    // Se o nome tiver mais de uma palavra (ex: "Prof. Ana Souza")
    if (names.length > 1) {
      // Pega a primeira letra da primeira palavra e da última
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    // Se for uma palavra só (ex: "Biblioteca")
    return name[0].toUpperCase();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => navigation.navigate('Chat', { contactId: item.id, contactName: item.name })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactDepartment}>{item.department}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DUMMY_CONTACTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.headerTitle}>Iniciar uma Conversa</Text>}
      />
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#005a9c', padding: 20 },
  contactItem: { backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 20, marginBottom: 1, borderBottomWidth: 1, borderBottomColor: '#f0f4f7' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#005a9c', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  contactDepartment: { fontSize: 14, color: '#666' },
});