// src/screens/MeuDiaFucapi/MapaSensorialScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';

const sensoryPoints = [
  {
    id: '1',
    title: 'Biblioteca',
    description: 'Ambiente calmo, com luz baixa e pouco movimento.',
    type: 'alto',
    position: { top: '65%', left: '25%' },
  },
  {
    id: '2',
    title: 'Bloco D',
    description: 'Local das aulas',
    type: 'baixo',
    position: { top: '30%', left: '15%' },
  },
  {
    id: '3',
    title: 'Cantina',
    description: 'Local barulhento entre 09h40 - 10h00.',
    type: 'medio',
    position: { top: '50%', left: '60%' },
  },
  {
    id: '4',
    title: 'Jardim Interno',
    description: 'Área externa, calma, com sons da natureza.',
    type: 'baixo',
    position: { top: '20%', left: '70%' },
  },
];

const markerColors = {
  alto: 'rgba(0, 128, 0, 0.7)',
  medio: 'rgba(255, 0, 0, 0.7)',
  baixo: 'rgba(0, 128, 0, 0.7)',
};

export default function MapaSensorialScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* CORREÇÃO AQUI: O caminho agora é ../../../ para subir 3 níveis de pasta */}
      <ImageBackground
        source={require('../../../assets/mapa_campus.png.png')}
        style={styles.mapImage}
        resizeMode="cover"
      >
        {sensoryPoints.map(point => (
          <TouchableOpacity
            key={point.id}
            style={[
              styles.marker,
              { 
                top: point.position.top, 
                left: point.position.left,
                backgroundColor: markerColors[point.type] || 'gray'
              }
            ]}
            onPress={() => handleMarkerPress(point)}
          >
             <View style={styles.markerPulse} />
          </TouchableOpacity>
        ))}
      </ImageBackground>

      {selectedPoint && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedPoint.title}</Text>
              <Text style={styles.modalDescription}>{selectedPoint.description}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// Estilos continuam os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  mapImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  marker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
   markerPulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#005a9c',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});