// src/screens/EspacoCalma/EstimulosVisuaisScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function EstimulosVisuaisScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estímulos Visuais</Text>
        <Text style={styles.subtitle}>Escolha uma atividade interativa para relaxar.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DesenhoEstrelas')}>
          <Text style={styles.menuIcon}>✨</Text>
          <View>
            <Text style={styles.menuText}>Desenhar com Estrelas</Text>
            <Text style={styles.menuDescription}>Deslize o dedo e crie um rastro de luz</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BolhasFlutuantes')}>
          <Text style={styles.menuIcon}>💧</Text>
          <View>
            <Text style={styles.menuText}>Bolhas Flutuantes</Text>
            <Text style={styles.menuDescription}>Toque para criar bolhas que sobem</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LavaLamp')}>
          <Text style={styles.menuIcon}>🔮</Text>
          <View>
            <Text style={styles.menuText}>Lâmpada de Lava Digital</Text>
            <Text style={styles.menuDescription}>Observe as formas se moverem</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FluxoParticulas')}>
          <Text style={styles.menuIcon}>🌬️</Text>
          <View>
            <Text style={styles.menuText}>Fluxo de Partículas</Text>
            <Text style={styles.menuDescription}>Guie o fluxo com um deslizar do dedo</Text>
          </View>
        </TouchableOpacity>

        {/* A MUDANÇA ESTÁ AQUI */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SigaLinha')}>
          <Text style={styles.menuIcon}>〰️</Text>
          <View>
            <Text style={styles.menuText}>Siga a Linha</Text>
            <Text style={styles.menuDescription}>Exercite o foco e a atenção plena</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos (sem alteração)
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#f0f4f7' }, header: { padding: 20, backgroundColor: '#005a9c' }, title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' }, subtitle: { fontSize: 16, color: '#e0e0e0', marginTop: 4 }, menuContainer: { padding: 20 }, menuItem: { backgroundColor: '#ffffff', padding: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 3 }, menuIcon: { fontSize: 32, marginRight: 20 }, menuText: { fontSize: 16, fontWeight: '600', color: '#333' }, menuDescription: { fontSize: 14, color: '#666', marginTop: 2 } });