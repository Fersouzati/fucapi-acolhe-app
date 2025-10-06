// src/screens/ConectaFucapi/ConectaFucapiScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const recados = [
    { id: '1', text: 'Lembrete: A biblioteca funcionará em horário estendido durante a semana de provas.' },
    { id: '2', text: 'Dica de bem-estar: Não se esqueça de se hidratar! Uma boa hidratação ajuda na concentração.' },
];

export default function ConectaFucapiScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        {/* A BARRA AZUL FOI ADICIONADA DE VOLTA AQUI, APENAS COM O SUBTÍTULO */}
        <View style={styles.header}>
            <Text style={styles.subtitle}>
                Comunicação, perfil e autoconhecimento.
            </Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.menuContainer}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('ChatList')}
            >
                <Text style={styles.menuIcon}>💬</Text>
                <View>
                    <Text style={styles.menuText}>Canal de Comunicação</Text>
                    <Text style={styles.menuDescription}>Contate professores e setores</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('PerfilNecessidades')}
            >
                <Text style={styles.menuIcon}>📝</Text>
                <View>
                    <Text style={styles.menuText}>Meu Perfil de Necessidades</Text>
                    <Text style={styles.menuDescription}>Descreva e compartilhe.</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('DiarioEmocoes')}
            >
                <Text style={styles.menuIcon}>😊</Text>
                <View>
                    <Text style={styles.menuText}>Diário de Emoções</Text>
                    <Text style={styles.menuDescription}>Registre como você se sente</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.muralContainer}>
            <View style={styles.muralCard}>
                <Text style={styles.muralTitle}>📌 Mural de Recados</Text>
                {recados.map((recado, index) => (
                    <Text key={recado.id} style={[styles.muralText, index > 0 && styles.muralDivider]}>
                        {recado.text}
                    </Text>
                ))}
            </View>
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
  // ESTILOS DO HEADER E SUBTÍTULO ADICIONADOS DE VOLTA
  header: {
    padding: 20,
    backgroundColor: '#005a9c',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginRight: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  muralContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  muralCard: {
    backgroundColor: '#eaf4ff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cae3ff',
  },
  muralTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005a9c',
    marginBottom: 15,
  },
  muralText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 21,
  },
  muralDivider: {
    borderTopWidth: 1,
    borderTopColor: '#cae3ff',
    marginTop: 10,
    paddingTop: 10,
  }
});