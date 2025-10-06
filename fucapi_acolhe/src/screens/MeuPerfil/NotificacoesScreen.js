// src/screens/MeuPerfil/NotificacoesScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch } from 'react-native';

// Componente para uma única linha de opção com um switch
const NotificationOption = ({ label, description, value, onValueChange }) => {
    return (
        <View style={styles.optionRow}>
            <View style={styles.textContainer}>
                <Text style={styles.optionLabel}>{label}</Text>
                <Text style={styles.optionDescription}>{description}</Text>
            </View>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={value ? "#005a9c" : "#f4f3f4"}
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );
};

export default function NotificacoesScreen() {
    // Estados para controlar cada switch
    const [lembretesAgenda, setLembretesAgenda] = useState(true);
    const [dicasBemEstar, setDicasBemEstar] = useState(true);
    const [recadosMural, setRecadosMural] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gerenciar Notificações</Text>
            </View>
            <NotificationOption
                label="Lembretes da Agenda"
                description="Receber alertas sobre suas aulas e tarefas."
                value={lembretesAgenda}
                onValueChange={setLembretesAgenda}
            />
            <NotificationOption
                label="Dicas de Bem-Estar"
                description="Receber sugestões e lembretes do Espaço Calma."
                value={dicasBemEstar}
                onValueChange={setDicasBemEstar}
            />
            <NotificationOption
                label="Avisos do Mural"
                description="Ser notificado sobre novos recados da instituição."
                value={recadosMural}
                onValueChange={setRecadosMural}
            />
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
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f4f7',
    },
    textContainer: {
        flex: 1,
        marginRight: 15,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    optionDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
});