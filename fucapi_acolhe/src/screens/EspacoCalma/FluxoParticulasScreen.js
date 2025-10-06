// src/screens/EspacoCalma/FluxoParticulasScreen.js

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const NUM_PARTICLES = 70; // Quantidade de partículas na tela

// Componente para uma única partícula
const Particle = ({ direction }) => {
    // Posição inicial aleatória
    const position = useRef(new Animated.ValueXY({ x: Math.random() * width, y: Math.random() * height })).current;
    const size = useRef(2 + Math.random() * 4).current; // Tamanho aleatório

    const animateParticle = (fromReset = false) => {
        let toValue = {};
        let startValue = {};

        // Define o destino e o ponto de partida da animação com base na direção
        switch (direction) {
            case 'up':
                startValue = { x: Math.random() * width, y: height };
                toValue = { x: Math.random() * width, y: -size };
                break;
            case 'down':
                startValue = { x: Math.random() * width, y: -size };
                toValue = { x: Math.random() * width, y: height };
                break;
            case 'left':
                startValue = { x: width, y: Math.random() * height };
                toValue = { x: -size, y: Math.random() * height };
                break;
            default: // right
                startValue = { x: -size, y: Math.random() * height };
                toValue = { x: width, y: Math.random() * height };
                break;
        }
        
        // Se a animação está começando do zero, posiciona a partícula no ponto de partida
        if (fromReset) {
            position.setValue(startValue);
        }

        Animated.timing(position, {
            toValue,
            duration: 5000 + Math.random() * 5000, // Duração aleatória
            useNativeDriver: false,
        }).start(() => {
            // Quando a animação termina (partícula sai da tela), reinicia
            animateParticle(true);
        });
    };

    useEffect(() => {
        // Inicia a animação, mas reiniciando a posição da partícula
        animateParticle(true);
    }, [direction]); // Re-executa a animação se a direção mudar

    const particleStyle = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: `hsl(${180 + Math.random() * 60}, 100%, 80%)`, // Tons de azul/ciano
        opacity: 0.8,
        transform: position.getTranslateTransform(),
    };

    return <Animated.View style={particleStyle} />;
};

export default function FluxoParticulasScreen() {
    const [direction, setDirection] = useState('right'); // Direção inicial

    const handleGesture = (event) => {
        if (event.nativeEvent.state === State.END) {
            const { translationX, translationY } = event.nativeEvent;

            // Determina a direção do swipe com base no maior deslocamento
            if (Math.abs(translationX) > Math.abs(translationY)) {
                if (translationX > 0) setDirection('right');
                else setDirection('left');
            } else {
                if (translationY > 0) setDirection('down');
                else setDirection('up');
            }
        }
    };
    
    // Cria um array de partículas para renderizar
    const particles = Array.from({ length: NUM_PARTICLES }).map((_, index) => (
        <Particle key={index} direction={direction} />
    ));

    return (
        <PanGestureHandler onHandlerStateChange={handleGesture}>
            <View style={styles.container}>
                <Text style={styles.instructionText}>Deslize para mudar a direção</Text>
                {particles}
            </View>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c1a4c', // Azul bem escuro
    },
    instructionText: {
        color: 'rgba(255, 255, 255, 0.2)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: 50,
        width: '100%',
    },
});