// src/screens/EspacoCalma/LavaLampScreen.js

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Componente para uma única "bolha" da lâmpada de lava
const Blob = ({ color, size, initialPosition }) => {
    const position = useRef(new Animated.ValueXY(initialPosition)).current;

    const animateBlob = () => {
        // Gera novas coordenadas aleatórias dentro da tela
        const newX = Math.random() * (width - size);
        const newY = Math.random() * (height - size);

        Animated.timing(position, {
            toValue: { x: newX, y: newY },
            duration: 8000 + Math.random() * 4000, // Duração longa e aleatória (8 a 12s)
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start(() => {
            // Quando a animação termina, chama a si mesma para continuar o movimento
            animateBlob();
        });
    };

    useEffect(() => {
        // Inicia o loop de animação quando o componente é montado
        animateBlob();
    }, []);

    const blobStyle = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: 0.7,
        transform: position.getTranslateTransform(),
    };

    return <Animated.View style={blobStyle} />;
};


export default function LavaLampScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1e3799', '#0c1a4c']} // Gradiente de azul escuro
                style={styles.gradient}
            />
            {/* Renderizamos várias bolhas com tamanhos e cores diferentes */}
            <Blob color="#f368e0" size={200} initialPosition={{ x: 50, y: 100 }} />
            <Blob color="#ff9f43" size={150} initialPosition={{ x: 200, y: 400 }} />
            <Blob color="#00d2d3" size={180} initialPosition={{ x: 100, y: 600 }} />
            <Blob color="#feca57" size={120} initialPosition={{ x: 250, y: 0 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject, // Preenche toda a tela
    },
});