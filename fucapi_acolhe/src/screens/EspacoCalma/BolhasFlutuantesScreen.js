// src/screens/EspacoCalma/BolhasFlutuantesScreen.js

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Dimensions, Easing } from 'react-native';

const { height } = Dimensions.get('window');

// --- Componente Bubble com Animação Corrigida ---
const Bubble = ({ x, y, onComplete }) => {
    // Usamos valores separados para cada animação
    const opacityAnim = useRef(new Animated.Value(0.9)).current;
    const translateYAnim = useRef(new Animated.Value(0)).current; // Animação de subida começa em 0
    const scaleAnim = useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        // As animações agora rodam em paralelo
        Animated.parallel([
            // Animação para a bolha subir
            Animated.timing(translateYAnim, {
                toValue: -height, // Move a bolha para cima por toda a altura da tela
                duration: 4000 + Math.random() * 2000, // Duração aleatória entre 4s e 6s
                easing: Easing.out(Easing.ease), // Começa mais rápido e desacelera
                useNativeDriver: true, // Usamos o driver nativo para melhor performance
            }),
            // Animação para a bolha desaparecer
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 4000 + Math.random() * 2000,
                useNativeDriver: true,
            }),
        ]).start(onComplete); // Chama a função para remover a bolha quando a animação termina
    }, []);

    const bubbleStyle = {
        position: 'absolute',
        top: y - 25, // Posição inicial Y (onde o usuário tocou)
        left: x - 25, // Posição inicial X
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 85%)`,
        opacity: opacityAnim,
        // O 'transform' aplica a animação de subida a partir da posição inicial
        transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
    };

    return <Animated.View style={bubbleStyle} />;
};


export default function BolhasFlutuantesScreen() {
    const [bubbles, setBubbles] = useState([]);
    const bubbleId = useRef(0);

    const handlePress = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        
        const newBubble = {
            id: bubbleId.current++,
            x: locationX,
            y: locationY,
        };

        setBubbles(currentBubbles => [...currentBubbles, newBubble]);
    };
    
    const removeBubble = (id) => {
        setBubbles(currentBubbles => currentBubbles.filter(bubble => bubble.id !== id));
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {bubbles.map(bubble => (
                <Bubble 
                    key={bubble.id} 
                    x={bubble.x} 
                    y={bubble.y} 
                    onComplete={() => removeBubble(bubble.id)}
                />
            ))}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf4ff',
    },
});