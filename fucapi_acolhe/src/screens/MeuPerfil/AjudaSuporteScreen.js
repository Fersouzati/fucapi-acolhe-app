// src/screens/MeuPerfil/AjudaSuporteScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';

// Habilita LayoutAnimation no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Dados com as perguntas e respostas
const FAQ_DATA = [
    {
        question: 'Como eu adiciono uma tarefa na Agenda Visual?',
        answer: 'Na tela "Agenda Visual", toque no botão azul com o sinal "+" no canto inferior direito. Preencha os detalhes da sua tarefa e clique em "Salvar".'
    },
    {
        question: 'Para que serve o Mapa Sensorial?',
        answer: 'O Mapa Sensorial é uma ferramenta para te ajudar a navegar pelo campus evitando sobrecarga. Ele mostra locais calmos (verde), de alerta médio (laranja) e barulhentos/com muitos estímulos (vermelho).'
    },
    {
        question: 'Como funciona o Diário de Emoções?',
        answer: 'O Diário é um espaço privado para você registrar como está se sentindo. Você pode selecionar um ou mais sentimentos, adicionar influências (gatilhos) e escrever em um diário. Com sua permissão, esses dados podem ajudar a equipe pedagógica a te apoiar melhor.'
    },
    {
        question: 'O que é o Perfil de Necessidades?',
        answer: 'É um espaço opcional e privado onde você pode descrever suas necessidades específicas (ex: "prefiro instruções por escrito"). Você pode escolher compartilhar seletivamente este perfil com professores de sua confiança.'
    },
];

// Componente para um item da lista de perguntas
const FaqItem = ({ question, answer }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.faqItem}>
            <TouchableOpacity onPress={toggleExpand}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question}</Text>
                    <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
                </View>
            </TouchableOpacity>
            {isExpanded && (
                <Text style={styles.answerText}>{answer}</Text>
            )}
        </View>
    );
};


export default function AjudaSuporteScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ajuda & Suporte</Text>
                    <Text style={styles.headerSubtitle}>Encontre respostas para as perguntas mais comuns.</Text>
                </View>
                {FAQ_DATA.map((item, index) => (
                    <FaqItem key={index} question={item.question} answer={item.answer} />
                ))}
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
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    faqItem: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        padding: 20,
        overflow: 'hidden', // Necessário para o LayoutAnimation
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#005a9c',
        flex: 1, // Permite que o texto quebre a linha
    },
    arrow: {
        fontSize: 16,
        color: '#005a9c',
        marginLeft: 10,
    },
    answerText: {
        marginTop: 15,
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
});