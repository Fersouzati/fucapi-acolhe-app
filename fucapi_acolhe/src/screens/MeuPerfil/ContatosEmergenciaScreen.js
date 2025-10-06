import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert, Linking } from 'react-native';

const DUMMY_CONTACTS = [
    { id: '1', name: 'Mãe', phone: '(92) 99999-0001' },
    { id: '2', name: 'Mentor Acadêmico', phone: '(92) 99999-0002' },
];

export default function ContatosEmergenciaScreen({ navigation }) {
    const [contacts, setContacts] = useState(DUMMY_CONTACTS);

    const handleSaveContact = (contactToSave) => {
        const existingIndex = contacts.findIndex(c => c.id === contactToSave.id);
        if (existingIndex >= 0) {
            const updatedContacts = [...contacts];
            updatedContacts[existingIndex] = contactToSave;
            setContacts(updatedContacts);
        } else {
            setContacts(prev => [...prev, contactToSave]);
        }
    };

    const handleCall = (phone) => {
        Linking.openURL(`tel:${phone}`).catch(() => Alert.alert('Erro', 'Não foi possível iniciar a chamada.'));
    };

    const handleDelete = (contactToDelete) => {
        Alert.alert('Excluir Contato', `Tem certeza que deseja excluir "${contactToDelete.name}" da sua lista?`, [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', onPress: () => setContacts(prev => prev.filter(c => c.id !== contactToDelete.id)), style: 'destructive' }
        ]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <View style={styles.contactActions}>
                <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={() => handleCall(item.phone)}>
                    <Text style={styles.actionButtonText}>Ligar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => navigation.navigate('AddContato', { onSave: handleSaveContact, contactToEdit: item })}>
                    <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(item)}>
                    <Text style={styles.actionButtonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={<Text style={styles.headerTitle}>Seus Contatos de Apoio</Text>}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddContato', { onSave: handleSaveContact })}>
                        <Text style={styles.addButtonText}>+ Adicionar Novo Contato</Text>
                    </TouchableOpacity>
                }
                contentContainerStyle={{ padding: 20 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f7' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 },
    contactCard: { backgroundColor: 'white', borderRadius: 10, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    contactInfo: { marginBottom: 15 },
    contactName: { fontSize: 18, fontWeight: 'bold', color: '#005a9c' },
    contactPhone: { fontSize: 16, color: '#666', marginTop: 5 },
    contactActions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
    actionButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginHorizontal: 5 },
    callButton: { backgroundColor: '#2e7d32' },
    editButton: { backgroundColor: '#f5a623' },
    deleteButton: { backgroundColor: '#c0392b' },
    actionButtonText: { color: 'white', fontWeight: 'bold' },
    addButton: { backgroundColor: '#005a9c', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});