// src/screens/EspacoCalma/SonsRelaxantesScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const SOUNDS = [
  { id: '1', title: 'Chuva Suave', icon: '🌧️', description: 'Para foco e relaxamento' },
  { id: '2', title: 'Sons da Floresta', icon: '🌳', description: 'Conecte-se com a natureza' },
  { id: '3', title: 'Ruído Branco', icon: '〰️', description: 'Bloqueie distrações externas' },
  { id: '4', title: 'Ondas do Mar', icon: '🌊', description: 'Um som calmante e constante' },
  { id: '5', title: 'Fogueira', icon: '🔥', description: 'Aconchegante e reconfortante' },
];

export default function SonsRelaxantesScreen() {
  const [playingSoundId, setPlayingSoundId] = useState(null);

  const handlePlayPause = (soundId) => {
    // Se o som clicado já estiver tocando, para a reprodução.
    if (playingSoundId === soundId) {
      setPlayingSoundId(null);
      // Aqui entraria a lógica para parar o áudio.
    } else {
      setPlayingSoundId(soundId);
      // Aqui entraria a lógica para tocar o novo áudio.
    }
  };

  const renderItem = ({ item }) => {
    const isPlaying = playingSoundId === item.id;
    return (
      <View style={styles.soundItem}>
        <Text style={styles.soundIcon}>{item.icon}</Text>
        <View style={styles.soundInfo}>
          <Text style={styles.soundTitle}>{item.title}</Text>
          <Text style={styles.soundDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={() => handlePlayPause(item.id)}>
          <Text style={styles.playButtonIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={SOUNDS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sons Relaxantes</Text>
            <Text style={styles.headerSubtitle}>Escolha um som para começar</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    padding: 20,
    paddingTop: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005a9c',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  soundItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  soundIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  soundInfo: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  soundDescription: {
    fontSize: 14,
    color: '#777',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#005a9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    color: 'white',
    fontSize: 20,
    // Pequeno ajuste para o ícone de 'play' parecer mais centralizado
    transform: [{ translateX: 1 }],
  },
});