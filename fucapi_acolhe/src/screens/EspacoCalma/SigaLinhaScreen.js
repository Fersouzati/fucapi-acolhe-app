// src/screens/EspacoCalma/SigaLinhaScreen.js

import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Text, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

// --- NOVA LISTA DE CAMINHOS COMPLEXOS ---
const PATHS = [
    `M 20,${height * 0.2} C ${width * 0.4},${height * 0.1} ${width * 0.6},${height * 0.9} ${width - 20},${height * 0.8}`,
    `M ${width - 20},${height * 0.5} C ${width * 0.8},${height * 0.9} ${width * 0.1},${height * 0.8} ${width * 0.5},${height * 0.1}`,
    `M 50,${height - 50} S ${width * 0.2},50 ${width * 0.5},${height * 0.5} S ${width - 50},${height - 50} ${width - 100},${height * 0.3}`,
    `M ${width * 0.1},${height * 0.1} C ${width},0 ${width * 0.2},${height} ${width * 0.9},${height * 0.9}`,
];

export default function SigaLinhaScreen() {
    const animation = useRef(new Animated.Value(0)).current;
    const [pathIndex, setPathIndex] = useState(0); // Estado para controlar qual caminho usar

    const startAnimation = () => {
        // Vai para o próximo caminho na lista, ou volta para o primeiro
        setPathIndex(prevIndex => (prevIndex + 1) % PATHS.length);
        animation.setValue(0); // Reseta a animação
        Animated.timing(animation, {
            toValue: 1,
            duration: 30000, // Duração aumentada para 30 segundos
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };
    
    useEffect(() => {
        startAnimation();
    }, []);

    // Aumentamos o comprimento para cobrir os novos caminhos
    const length = 3000; 
    const strokeDashoffset = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [length, 0],
    });

    return (
        <View style={styles.container}>
            <Svg width={width} height={height}>
                <AnimatedPath
                    d={PATHS[pathIndex]} // Usa o caminho atual da lista
                    stroke="white"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={length}
                    strokeDashoffset={strokeDashoffset}
                />
            </Svg>
            <TouchableOpacity style={styles.button} onPress={startAnimation}>
                <Text style={styles.buttonText}>Novo Caminho</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#192a56',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});