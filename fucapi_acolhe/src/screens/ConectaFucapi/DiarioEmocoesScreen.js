// src/screens/ConectaFucapi/DiarioEmocoesScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

// A MUDANÇA FOI FEITA AQUI NESTA LISTA DE EMOÇÕES
const MOODS = [
  { key: 'feliz', emoji: '😊', label: 'Feliz' },
  { key: 'calmo', emoji: '😌', label: 'Calmo' },
  { key: 'neutro', emoji: '😐', label: 'Neutro' },
  { key: 'ansioso', emoji: '😟', label: 'Ansioso' },
  { key: 'triste', emoji: '😢', label: 'Triste' }, // Alterado
  { key: 'raiva', emoji: '😠', label: 'Raiva' },  // Adicionado
];

const TRIGGERS = [
  { key: 'provas', label: 'Provas/Trabalhos' },
  { key: 'social', label: 'Interação Social' },
  { key: 'barulho', label: 'Barulho/Ambiente' },
  { key: 'rotina', label: 'Mudança na Rotina' },
  { key: 'cansaco', label: 'Cansaço' },
];

export default function DiarioEmocoesScreen() {
  const [selectedMoods, setSelectedMoods] = useState([]); 
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [journalText, setJournalText] = useState(''); 

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleSelectMood = (moodKey) => {
    if (selectedMoods.includes(moodKey)) {
      setSelectedMoods(prev => prev.filter(m => m !== moodKey));
    } else {
      setSelectedMoods(prev => [...prev, moodKey]);
    }
  };

  const handleSelectTrigger = (triggerKey) => {
    if (selectedTriggers.includes(triggerKey)) {
      setSelectedTriggers(prev => prev.filter(t => t !== triggerKey));
    } else {
      setSelectedTriggers(prev => [...prev, triggerKey]);
    }
  };

  const handleSave = () => {
    if (selectedMoods.length === 0) {
      Alert.alert('Ops!', 'Por favor, selecione pelo menos um sentimento.');
      return;
    }
    Alert.alert(
      'Registro Salvo!',
      'Seu registro foi salvo com sucesso e, com sua permissão, poderá ser visualizado pela equipe pedagógica.',
      [{ text: 'OK', onPress: () => {
          setSelectedMoods([]);
          setSelectedTriggers([]);
          setJournalText('');
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Como você está se sentindo?</Text>
          <Text style={styles.subtitle}>(Você pode escolher mais de uma opção)</Text>
          <View style={styles.optionsGrid}>
            {MOODS.map(mood => (
              <TouchableOpacity
                key={mood.key}
                style={[ styles.moodOption, selectedMoods.includes(mood.key) && styles.selectedOption ]}
                onPress={() => handleSelectMood(mood.key)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>O que pode estar influenciando?</Text>
          <Text style={styles.subtitle}>(Opcional, pode escolher mais de um)</Text>
          <View style={styles.optionsGrid}>
            {TRIGGERS.map(trigger => (
              <TouchableOpacity
                key={trigger.key}
                style={[ styles.triggerOption, selectedTriggers.includes(trigger.key) && styles.selectedOption ]}
                onPress={() => handleSelectTrigger(trigger.key)}
              >
                <Text style={styles.triggerLabel}>{trigger.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Diário do Dia</Text>
          <Text style={styles.subtitle}>(Opcional)</Text>
          <TextInput
              style={styles.journalInput}
              multiline
              placeholder="Escreva aqui sobre o seu dia, pensamentos ou sentimentos..."
              value={journalText}
              onChangeText={setJournalText}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Registro de Hoje</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// O Style foi ajustado para comportar 6 emoções
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  scrollContainer: { padding: 20, paddingBottom: 50 },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 5 },
  subtitle: { textAlign: 'center', fontSize: 14, color: '#666', marginBottom: 15 },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  moodOption: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 10, 
    margin: 8, 
    alignItems: 'center', 
    width: 80, // Largura fixa para melhor alinhamento
    height: 80, // Altura fixa
    justifyContent: 'center', 
    borderWidth: 2, 
    borderColor: 'transparent' 
  },
  moodEmoji: { fontSize: 32 },
  moodLabel: { fontSize: 14, marginTop: 5, color: '#333' },
  triggerOption: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 15, margin: 5, borderWidth: 2, borderColor: 'transparent' },
  triggerLabel: { fontSize: 14, color: '#333' },
  selectedOption: { borderColor: '#005a9c', backgroundColor: '#eaf4ff' },
  journalInput: {
    backgroundColor: '#ffffff',
    height: 150,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: { backgroundColor: '#005a9c', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});