// src/screens/MeuDiaFucapi/MeuDiaFucapiScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

const checklistItems = [
    { key: 'materiais', icon: '✅', text: 'Material de Estudo' },
    { key: 'fones', icon: '✅', text: 'Fones de Ouvido' },
    { key: 'agua', icon: '✅', text: 'Garrafa de Água' },
    { key: 'documentos', icon: '✅', text: 'Chaves e Carteirinha' },
];

export default function MeuDiaFucapiScreen({ navigation }) {
  const [dailyGoal, setDailyGoal] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
            {/* O TÍTULO FOI REMOVIDO DESTA LINHA */}
            <Text style={styles.subtitle}>
                Organize sua rotina e encontre seu foco.
            </Text>
        </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Agenda')}
            >
                <Text style={styles.menuIcon}>🗓️</Text>
                <Text style={styles.menuText}>Agenda Visual</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('MapaSensorial')}
            >
                <Text style={styles.menuIcon}>🗺️</Text>
                <Text style={styles.menuText}>Mapa Sensorial do Campus</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('GestorDeFoco')}
            >
                <Text style={styles.menuIcon}>⏱️</Text>
                <Text style={styles.menuText}>Gestor de Tarefas com Foco</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.widgetsContainer}>
            <View style={styles.widgetCard}>
                <Text style={styles.widgetIcon}>🎯</Text>
                <View style={styles.widgetTextContainer}>
                    <Text style={styles.widgetTitle}>Minha Meta Principal do Dia</Text>
                    <TextInput
                        style={styles.goalInput}
                        placeholder="Escreva seu objetivo principal..."
                        value={dailyGoal}
                        onChangeText={setDailyGoal}
                    />
                </View>
            </View>

            <View style={styles.widgetCard}>
                <Text style={styles.widgetIcon}>🎒</Text>
                <View style={styles.widgetTextContainer}>
                    <Text style={styles.widgetTitle}>Checklist para o Campus</Text>
                    {checklistItems.map(item => (
                        <Text key={item.key} style={styles.checklistItem}>{item.icon} {item.text}</Text>
                    ))}
                </View>
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
  header: {
    padding: 20,
    backgroundColor: '#005a9c',
  },
  // O estilo 'title' não é mais necessário aqui, mas não há problema em mantê-lo
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  // ESTILO DO SUBTÍTULO FOI AJUSTADO
  subtitle: {
    fontSize: 18, // Aumentamos um pouco a fonte
    color: '#e0e0e0',
    textAlign: 'center', // Centralizamos
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontSize: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  widgetsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  widgetIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  widgetTextContainer: {
    flex: 1,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  widgetDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  checklistItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  goalInput: {
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#333',
    minHeight: 40,
  },
});