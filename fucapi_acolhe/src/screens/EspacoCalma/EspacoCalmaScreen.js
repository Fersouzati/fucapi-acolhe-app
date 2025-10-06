// src/screens/EspacoCalma/EspacoCalmaScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Conteúdo para o novo card da técnica 5-4-3-2-1
const groundingSteps = [
    { emoji: '👀', text: 'Observe 5 coisas que você pode ver.' },
    { emoji: '🖐️', text: 'Sinta 4 coisas que você pode tocar.' },
    { emoji: '👂', text: 'Ouça 3 sons diferentes.' },
    { emoji: '👃', text: 'Cheire 2 aromas perto de você.' },
    { emoji: '👅', text: 'Perceba 1 sabor (ou sua própria saliva).' },
];

export default function EspacoCalmaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
            {/* O TÍTULO FOI REMOVIDO DAQUI */}
            <Text style={styles.subtitle}>
                Ferramentas para o seu bem-estar e descompressão.
            </Text>
        </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Respiracao')}
            >
            <Text style={styles.menuIcon}>🧘</Text>
            <View>
                <Text style={styles.menuText}>Respiração Guiada</Text>
                <Text style={styles.menuDescription}>Exercícios para acalmar a mente</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('SonsRelaxantes')}
            >
            <Text style={styles.menuIcon}>🎧</Text>
            <View>
                <Text style={styles.menuText}>Sons Relaxantes</Text>
                <Text style={styles.menuDescription}>Ruído branco e sons da natureza</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EstimulosVisuais')}
            >
            <Text style={styles.menuIcon}>✨</Text>
            <View>
                <Text style={styles.menuText}>Estímulos Visuais</Text>
                <Text style={styles.menuDescription}>Interações simples para relaxar</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.menuItem, styles.apoioButton]}
            onPress={() => navigation.navigate('ContatoApoio')}
            >
            <Text style={styles.menuIcon}>🆘</Text>
            <View>
                <Text style={[styles.menuText, styles.apoioButtonText]}>Contato de Apoio Rápido</Text>
                <Text style={[styles.menuDescription, styles.apoioButtonText]}>Converse com o núcleo de apoio</Text>
            </View>
            </TouchableOpacity>
        </View>

        {/* --- NOVO CARD DA TÉCNICA 5-4-3-2-1 ADICIONADO AQUI --- */}
        <View style={styles.widgetContainer}>
            <View style={styles.widgetCard}>
                <Text style={styles.widgetTitle}>Precisa se Acalmar Agora? Tente isto:</Text>
                {groundingSteps.map(step => (
                    <Text key={step.emoji} style={styles.groundingStep}>{step.emoji} {step.text}</Text>
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
  scrollContainer: {
    paddingBottom: 20, // Garante um respiro no final
  },
  header: {
    padding: 20,
    backgroundColor: '#005a9c',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  menuContainer: {
    padding: 20,
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
  apoioButton: {
    backgroundColor: '#c0392b',
  },
  apoioButtonText: {
    color: '#ffffff',
  },
  // Estilos para o novo card
  widgetContainer: {
    paddingHorizontal: 20,
  },
  widgetCard: {
    backgroundColor: '#eaf4ff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cae3ff',
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005a9c',
    marginBottom: 15,
  },
  groundingStep: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24, // Espaçamento entre as linhas
    marginBottom: 5,
  },
});