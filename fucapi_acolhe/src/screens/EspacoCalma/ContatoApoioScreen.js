// src/screens/EspacoCalma/ContatoApoioScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

export default function ContatoApoioScreen() {

  const handleCall = () => {
    Alert.alert(
      'Simulando Ligação...',
      'Em um aplicativo real, isso iniciaria uma chamada para o número do Núcleo de Apoio.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>📞</Text>
        <Text style={styles.title}>Núcleo de Apoio Psicopedagógico</Text>
        <Text style={styles.description}>
          Se você precisar conversar ou de qualquer tipo de suporte, não hesite em nos contatar. Estamos aqui para ajudar.
        </Text>
        <Text style={styles.info}>Horário de Atendimento: 08:00 - 18:00</Text>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callButtonText}>Ligar Agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    fontSize: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005a9c',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  callButton: {
    backgroundColor: '#2e7d32', // Um verde de "ação"
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  callButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});