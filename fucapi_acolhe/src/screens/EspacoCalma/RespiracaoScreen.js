// src/screens/EspacoCalma/RespiracaoScreen.js

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, SafeAreaView, TouchableOpacity } from 'react-native';

// Duração de cada fase da respiração em milissegundos
const BREATHE_IN_DURATION = 4000; // 4 segundos
const HOLD_DURATION = 2000;      // 2 segundos
const BREATHE_OUT_DURATION = 6000;// 6 segundos

export default function RespiracaoScreen() {
    const [instruction, setInstruction] = useState('Clique em Iniciar');
    const [isRunning, setIsRunning] = useState(false);
    // useRef é usado para guardar a animação para que ela não seja recriada a cada renderização
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const breathingAnimation = Animated.sequence([
        // Inspira (círculo cresce)
        Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: BREATHE_IN_DURATION,
            easing: Easing.easeInOut,
            useNativeDriver: true,
        }),
        // Segura (círculo parado)
        Animated.delay(HOLD_DURATION),
        // Expira (círculo diminui)
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: BREATHE_OUT_DURATION,
            easing: Easing.easeInOut,
            useNativeDriver: true,
        }),
    ]);

    const loopAnimation = Animated.loop(breathingAnimation);

    useEffect(() => {
        if (isRunning) {
            // Sincroniza o texto com a animação
            const animateText = () => {
                setInstruction('Inspire...');
                setTimeout(() => {
                    setInstruction('Segure');
                    setTimeout(() => {
                        setInstruction('Expire...');
                    }, HOLD_DURATION);
                }, BREATHE_IN_DURATION);
            };
            animateText(); // Roda a primeira vez
            const interval = setInterval(animateText, BREATHE_IN_DURATION + HOLD_DURATION + BREATHE_OUT_DURATION);
            loopAnimation.start();

            return () => {
                clearInterval(interval);
                loopAnimation.stop();
            };
        }
    }, [isRunning]);

    const handlePress = () => {
        if (isRunning) {
            loopAnimation.stop();
            setInstruction('Pausado');
        }
        setIsRunning(!isRunning);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.instructionText}>{instruction}</Text>
            <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]} />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>{isRunning ? 'Pausar' : 'Iniciar'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005a9c', // Fundo azul calmo
    },
    instructionText: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        top: '25%',
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        position: 'absolute',
        bottom: '20%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});