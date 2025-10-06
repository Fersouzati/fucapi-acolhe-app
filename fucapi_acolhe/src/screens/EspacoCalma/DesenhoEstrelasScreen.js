// src/screens/EspacoCalma/DesenhoEstrelasScreen.js
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// Componente para uma partícula de "estrela"
const Particle = ({ x, y, onComplete }) => {
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
        ]).start(onComplete);
    }, []);

    const particleStyle = {
        position: 'absolute',
        left: x,
        top: y,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 85%)`, // Cor pastel aleatória
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }],
    };

    return <Animated.View style={particleStyle} />;
};

export default function DesenhoEstrelasScreen() {
    const [particles, setParticles] = useState([]);
    const particleId = useRef(0);

    const onGestureEvent = (event) => {
        const { x, y } = event.nativeEvent;
        
        const newParticle = {
            id: particleId.current++,
            x: x - 5, // centraliza a partícula
            y: y - 5,
        };
        // Adiciona uma nova partícula a cada movimento do dedo
        setParticles(current => [...current, newParticle]);
    };

    const removeParticle = (id) => {
        setParticles(current => current.filter(p => p.id !== id));
    };

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <View style={styles.container}>
                <Text style={styles.instructionText}>Deslize o dedo pela tela</Text>
                {particles.map(p => (
                    <Particle key={p.id} x={p.x} y={p.y} onComplete={() => removeParticle(p.id)} />
                ))}
            </View>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#192a56', // Azul escuro
    },
    instructionText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 100,
        position: 'absolute',
        width: '100%',
    },
});