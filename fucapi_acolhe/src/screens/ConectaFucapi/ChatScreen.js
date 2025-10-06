// src/screens/ConectaFucapi/ChatScreen.js

import React, { useState, useEffect } from 'react'; // Importamos o useEffect
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

const ALL_CONVERSATIONS = {
  '1': [
    { id: '1a', text: 'Olá, professora Adiane. Tenho uma dúvida sobre a AV1.', sender: 'me' },
    { id: '1b', text: 'Olá! Pode falar.', sender: 'them' },
  ],
  '2': [
    { id: '2a', text: 'Boa tarde, professor Ricardo. Onde encontro o material da aula 3?', sender: 'me' },
    // A resposta dele será adicionada dinamicamente
  ],
  '3': [
    { id: '3a', text: 'Bom dia, gostaria de solicitar meu histórico escolar.', sender: 'me' },
    { id: '3b', text: 'Bom dia. A solicitação deve ser feita pelo portal do aluno, na seção "Documentos".', sender: 'them' },
  ],
  '4': [
    { id: '4a', text: 'Olá! Tenho interesse em trancar uma matéria, como proceder?', sender: 'me' },
    { id: '4b', text: 'Olá. Por favor, procure a Secretaria Acadêmica para esse procedimento.', sender: 'them' },
  ],
};


export default function ChatScreen({ route }) {
  const { contactId } = route.params;

  const [messages, setMessages] = useState(ALL_CONVERSATIONS[contactId] || []);
  const [inputText, setInputText] = useState('');

  // 1. A FUNÇÃO DE RESPOSTA AGORA É CONTEXTUAL
  const simulateReply = (currentContactId) => {
    let replyText = 'Ok, recebido! Responderei assim que possível.'; // Resposta padrão

    // Resposta específica para o Prof. Ricardo (ID '2')
    if (currentContactId === '2') {
      replyText = 'Boa tarde! O material da aula 3 já está disponível no portal do aluno, na seção "Materiais de Aula".';
    }
    // (Poderíamos adicionar outras respostas para outros IDs aqui)

    setTimeout(() => {
        const reply = {
            id: Date.now().toString(),
            text: replyText,
            sender: 'them'
        };
        setMessages(prevMessages => [...prevMessages, reply]);
    }, 1200); // Aumentei um pouco o tempo para parecer mais natural
  };

  // 2. ADICIONAMOS UM 'useEffect' PARA RESPONDER À MENSAGEM INICIAL
  // Este código executa uma vez quando a tela de chat abre
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    // Se o chat não estiver vazio e a última mensagem for do usuário, simula uma resposta
    if (messages.length > 0 && lastMessage.sender === 'me') {
      simulateReply(contactId);
    }
  }, []); // O array vazio [] garante que isso só rode uma vez

  const handleSend = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    // 3. A FUNÇÃO AGORA É CHAMADA COM O ID DO CONTATO ATUAL
    simulateReply(contactId);
  };

  const renderItem = ({ item }) => (
    <View style={[ styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.theirMessage ]}>
      <Text style={[ styles.messageText, item.sender === 'me' ? styles.myMessageText : styles.theirMessageText ]}>
          {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua mensagem..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  messageList: { flex: 1, paddingHorizontal: 10 },
  messageBubble: { padding: 12, borderRadius: 18, maxWidth: '75%', marginVertical: 5 },
  myMessage: { backgroundColor: '#005a9c', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#ffffff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#e0e0e0' },
  myMessageText: { color: 'white' },
  theirMessageText: { color: 'black' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#ffffff' },
  textInput: { flex: 1, height: 40, backgroundColor: '#f0f4f7', borderRadius: 20, paddingHorizontal: 15 },
  sendButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 },
  sendButtonText: { color: '#005a9c', fontSize: 16, fontWeight: 'bold' },
});