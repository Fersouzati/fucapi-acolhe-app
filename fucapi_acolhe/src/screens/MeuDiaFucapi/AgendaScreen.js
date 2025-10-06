// src/screens/AgendaScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert, // Importando o componente de Alerta
} from 'react-native';

const DUMMY_DATA = [
  {
    id: '1',
    time: '08:00',
    title: 'Aula de Programação Web',
    type: 'aula',
    description: 'Sala D-02',
  },
  {
    id: '2',
    time: '09:40',
    title: 'Pausa para Lanchar',
    type: 'pausa',
    description: 'Ir até a cantina',
  },
];

const typeColors = {
  aula: '#005a9c',
  trabalho: '#f5a623',
  pausa: '#4a90e2',
  default: '#888',
};

export default function AgendaScreen({ navigation }) {
  const [tasks, setTasks] = useState(DUMMY_DATA);

  // Função que ordena as tarefas por horário
  const sortTasks = (tasksList) => {
    return tasksList.sort((a, b) => (a.time > b.time ? 1 : -1));
  };

  // Função para adicionar ou ATUALIZAR uma tarefa
  const handleSaveTask = (taskToSave) => {
    // Verifica se a tarefa já existe (pelo id)
    const existingTaskIndex = tasks.findIndex(task => task.id === taskToSave.id);

    if (existingTaskIndex >= 0) {
      // Se existe, atualiza a tarefa na lista (EDITAR)
      const updatedTasks = [...tasks];
      updatedTasks[existingTaskIndex] = taskToSave;
      setTasks(sortTasks(updatedTasks));
    } else {
      // Se não existe, adiciona a nova tarefa (ADICIONAR)
      setTasks(currentTasks => sortTasks([...currentTasks, taskToSave]));
    }
  };
  
  // Função para deletar uma tarefa
  const handleDeleteTask = (taskId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: () => {
            setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
          },
          style: "destructive"
        },
      ]
    );
  };


  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskInfo}>
        <View
          style={[styles.taskTypeIndicator, { backgroundColor: typeColors[item.type] || typeColors.default }]}
        />
        <Text style={styles.taskTime}>{item.time}</Text>
        <View style={styles.taskDetails}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => navigation.navigate('AddTask', { onSaveTask: handleSaveTask, taskToEdit: item })}>
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Agenda de Hoje</Text>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask', { onSaveTask: handleSaveTask })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#005a9c',
    margin: 20,
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para separar informações das ações
    paddingVertical: 15,
    paddingLeft: 0, // Removido para o indicador de cor preencher
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskTypeIndicator: {
    width: 6,
    height: '110%', // Um pouco maior para preencher a altura
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  taskTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 70,
    textAlign: 'center',
  },
  taskDetails: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#eee',
    paddingLeft: 15,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  taskActions: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  actionIcon: {
    fontSize: 22,
    marginLeft: 15,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#005a9c',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
    lineHeight: 32,
  },
});