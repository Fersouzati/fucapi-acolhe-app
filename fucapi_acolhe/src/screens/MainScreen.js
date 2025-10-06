// src/screens/MainScreen.js
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const actions = [
    { key: 'meuDia', title: 'Meu Dia Fucapi', icon: '🗓️', description: 'Agenda, mapa sensorial e foco', route: 'MeuDiaFucapi' },
    { key: 'conecta', title: 'Conecta Fucapi', icon: '🤝', description: 'Comunicação, perfil e diário', route: 'ConectaFucapi' },
    { key: 'calma', title: 'Espaço Calma', icon: '🧘', description: 'Ferramentas de bem-estar', route: 'EspacoCalma' },
    // A MUDANÇA ESTÁ AQUI: definimos a rota para o Perfil
    { key: 'perfil', title: 'Meu Perfil', icon: '👤', description: 'Configurações e informações', route: 'MeuPerfil' },
];

export default function MainScreen({ navigation }) {
  const userName = 'Aluno';

  // A função handlePress agora não precisa mais do 'else'
  const handlePress = (route) => {
    if (route) {
        navigation.navigate(route);
    }
  }

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={{paddingBottom: 20}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá, {userName}!</Text>
        <Text style={styles.headerSubtitle}>Como você está se sentindo?</Text>
      </View>
      <View style={styles.statusCard}>
        <Text style={styles.statusCardTitle}>SEU ESTADO ATUAL</Text>
        <Text style={styles.statusText}>Tranquilo</Text>
        <Text style={styles.statusDescription}>Sua frequência cardíaca está estável.</Text>
      </View>
      <Text style={styles.actionsTitle}>Ações Rápidas</Text>
      {actions.map(action => (
        <TouchableOpacity key={action.key} style={styles.actionCard} onPress={() => handlePress(action.route)}>
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <View style={styles.actionTextContainer}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Estilos (sem alteração)
const styles = StyleSheet.create({ mainContainer: { flex: 1, backgroundColor: '#f0f4f7' }, header: { padding: 20, paddingBottom: 10 }, headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#005a9c' }, headerSubtitle: { fontSize: 16, color: '#666' }, statusCard: { backgroundColor: '#ffffff', borderRadius: 15, padding: 20, alignItems: 'center', marginHorizontal: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 4 }, statusCardTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', letterSpacing: 1, marginBottom: 10 }, statusText: { fontSize: 32, fontWeight: 'bold', color: '#2e7d32', marginBottom: 5 }, statusDescription: { fontSize: 14, color: '#666' }, actionsTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, paddingHorizontal: 20 }, actionCard: { backgroundColor: '#ffffff', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 }, actionIcon: { fontSize: 30, marginRight: 20, backgroundColor: '#eaf4ff', padding: 10, borderRadius: 25 }, actionTextContainer: { flex: 1 }, actionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' }, actionDescription: { fontSize: 14, color: '#777', marginTop: 2 } });