// src/screens/GestorDeFocoScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Vibration } from 'react-native';

const FOCUS_TIME = 25 * 60; // 25 minutos em segundos
const SHORT_BREAK_TIME = 5 * 60; // 5 minutos
const LONG_BREAK_TIME = 15 * 60; // 15 minutos

export default function GestorDeFocoScreen() {
  const [mode, setMode] = useState('foco'); // 'foco', 'pausaCurta', 'pausaLonga'
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  // useEffect é o "cérebro" do nosso cronômetro.
  // Ele executa o código sempre que 'isActive' ou 'timeRemaining' mudam.
  useEffect(() => {
    let interval = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Quando o tempo acaba, vibra o celular para notificar
      Vibration.vibrate([500, 500, 500]);
      handleTimerEnd();
    }

    // Limpa o intervalo quando o componente é desmontado ou o timer para.
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);
  
  const handleTimerEnd = () => {
    setIsActive(false);
    if (mode === 'foco') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        // A cada 4 ciclos, uma pausa longa. Senão, pausa curta.
        if (newCycles % 4 === 0) {
            setMode('pausaLonga');
            setTimeRemaining(LONG_BREAK_TIME);
        } else {
            setMode('pausaCurta');
            setTimeRemaining(SHORT_BREAK_TIME);
        }
    } else { // Se estava em pausa, volta pro foco
        setMode('foco');
        setTimeRemaining(FOCUS_TIME);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    // Reinicia para o tempo do modo atual
    if (mode === 'foco') setTimeRemaining(FOCUS_TIME);
    else if (mode === 'pausaCurta') setTimeRemaining(SHORT_BREAK_TIME);
    else setTimeRemaining(LONG_BREAK_TIME);
  };

  // Formata os segundos para o formato MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const modeTexts = {
      foco: { title: "Hora de Focar!", color: "#005a9c" },
      pausaCurta: { title: "Pausa Curta", color: "#2e7d32" },
      pausaLonga: { title: "Pausa Longa", color: "#4a90e2" }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: modeTexts[mode].color }]}>
      <Text style={styles.modeTitle}>{modeTexts[mode].title}</Text>
      
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.cyclesText}>Ciclos Completos: {cycles}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      position: 'absolute',
      top: '15%',
  },
  timerContainer: {
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 72,
    color: 'white',
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cyclesText: {
      fontSize: 18,
      color: 'white',
      position: 'absolute',
      bottom: '10%',
  }
});