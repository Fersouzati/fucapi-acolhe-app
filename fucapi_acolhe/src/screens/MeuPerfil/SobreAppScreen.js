// src/screens/MeuPerfil/SobreAppScreen.js

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function SobreAppScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>🤝</Text>
        <Text style={styles.appName}>Fucapi Acolhe</Text>
        <Text style={styles.version}>Versão 1.0.0</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossa Missão</Text>
          <Text style={styles.sectionText}>
            O Fucapi Acolhe é um projeto desenvolvido com o objetivo de criar um ambiente universitário mais inclusivo e acolhedor para estudantes neurodivergentes.
          </Text>
          <Text style={styles.sectionText}>
            Através de ferramentas personalizadas para organização, bem-estar, comunicação e autorregulação, buscamos oferecer um suporte prático que auxilie na jornada acadêmica e pessoal de cada aluno.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desenvolvimento</Text>
          <Text style={styles.sectionText}>
            Este aplicativo foi idealizado e desenvolvido como parte de um projeto acadêmico na FUCAPI.
          </Text>
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
  content: {
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005a9c',
  },
  version: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
});