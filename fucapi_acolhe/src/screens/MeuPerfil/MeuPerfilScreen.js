import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';

const ProfileOption = ({ icon, text, onPress, isDestructive = false }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
        <Text style={styles.optionIcon}>{icon}</Text>
        <Text style={[styles.optionText, isDestructive && styles.destructiveText]}>{text}</Text>
    </TouchableOpacity>
);

export default function MeuPerfilScreen({ navigation, onLogout }) {
    const handleLogout = () => {
        Alert.alert('Sair da Conta', 'Você tem certeza que deseja sair?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', onPress: onLogout, style: 'destructive' },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>U</Text>
                    </View>
                    <Text style={styles.userName}>Aluno</Text>
                    <Text style={styles.userCourse}>Técnico de Informática</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configurações do App</Text>
                    <ProfileOption 
                        icon="🚨" 
                        text="Contatos de Emergência" 
                        onPress={() => navigation.navigate('ContatosEmergencia')} 
                    />
                    <ProfileOption 
                        icon="🤝" 
                        text="Gerenciar Compartilhamento" 
                        onPress={() => navigation.navigate('PerfilNecessidades')} 
                    />
                    <ProfileOption 
                        icon="🔔" 
                        text="Notificações" 
                        onPress={() => navigation.navigate('Notificacoes')} 
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Geral</Text>
                    <ProfileOption 
                        icon="❓" 
                        text="Ajuda & Suporte" 
                        onPress={() => navigation.navigate('AjudaSuporte')} 
                    />
                    <ProfileOption 
                        icon="ℹ️" 
                        text="Sobre o Fucapi Acolhe" 
                        onPress={() => navigation.navigate('SobreApp')} 
                    />
                </View>
                
                <View style={styles.section}>
                    <ProfileOption 
                        icon="🚪" 
                        text="Sair" 
                        onPress={handleLogout}
                        isDestructive={true}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f7' },
    profileHeader: { alignItems: 'center', padding: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#005a9c', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    avatarText: { color: 'white', fontSize: 40, fontWeight: 'bold' },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    userCourse: { fontSize: 16, color: '#666', marginTop: 4 },
    section: { marginTop: 20 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#888', paddingHorizontal: 20, marginBottom: 10, textTransform: 'uppercase' },
    optionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f4f7' },
    optionIcon: { fontSize: 20, marginRight: 20 },
    optionText: { fontSize: 16, color: '#333' },
    destructiveText: { color: '#c0392b' },
});