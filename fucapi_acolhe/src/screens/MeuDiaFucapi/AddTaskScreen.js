// src/screens/AddTaskScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const taskTypes = [
  { key: 'aula', label: 'Aula', color: '#005a9c' },
  { key: 'trabalho', label: 'Trabalho', color: '#f5a623' },
  { key: 'pausa', label: 'Pausa', color: '#4a90e2' },
];

export default function AddTaskScreen({ navigation, route }) {
  // Verifica se estamos editando uma tarefa ou criando uma nova
  const taskToEdit = route.params.taskToEdit;
  const isEditing = !!taskToEdit;

  // Preenche o estado inicial com os dados da tarefa a ser editada, ou vazio se for nova
  const [time, setTime] = useState(taskToEdit?.time || '');
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [selectedType, setSelectedType] = useState(taskToEdit?.type || 'aula');

  const handleSaveTask = () => {
    if (!time || !title) {
      alert('Por favor, preencha pelo menos o horário e o título.');
      return;
    }

    const taskData = {
      // Mantém o ID original se estiver editando, ou cria um novo se estiver adicionando
      id: isEditing ? taskToEdit.id : Date.now().toString(),
      time,
      title,
      description,
      type: selectedType,
    };

    route.params.onSaveTask(taskData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Editar Tarefa' : 'Adicionar Tarefa'}
          </Text>

          <Text style={styles.label}>Horário (ex: 09:30)</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
            maxLength={5}
          />

          <Text style={styles.label}>Título da Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Aula de Redes"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descrição (Opcional)</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Ex: Sala C-105"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Tipo de Tarefa</Text>
          <View style={styles.typeSelector}>
            {taskTypes.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.typeButton,
                  { backgroundColor: type.color },
                  selectedType === type.key && styles.selectedType,
                ]}
                onPress={() => setSelectedType(type.key)}
              >
                <Text style={styles.typeButtonText}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Salvar Alterações' : 'Salvar Tarefa'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos continuam os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005a9c',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedType: {
    borderWidth: 3,
    borderColor: '#333',
  },
  typeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#005a9c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});