import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- LISTA COMPLETA DE IMPORTAÇÕES DE TODAS AS TELAS ---
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';

// Módulo MeuDiaFucapi
import MeuDiaFucapiScreen from './src/screens/MeuDiaFucapi/MeuDiaFucapiScreen';
import AgendaScreen from './src/screens/MeuDiaFucapi/AgendaScreen';
import AddTaskScreen from './src/screens/MeuDiaFucapi/AddTaskScreen';
import MapaSensorialScreen from './src/screens/MeuDiaFucapi/MapaSensorialScreen';
import GestorDeFocoScreen from './src/screens/MeuDiaFucapi/GestorDeFocoScreen';

// Módulo ConectaFucapi
import ConectaFucapiScreen from './src/screens/ConectaFucapi/ConectaFucapiScreen';
import ChatListScreen from './src/screens/ConectaFucapi/ChatListScreen';
import ChatScreen from './src/screens/ConectaFucapi/ChatScreen';
import PerfilNecessidadesScreen from './src/screens/ConectaFucapi/PerfilNecessidadesScreen';
import DiarioEmocoesScreen from './src/screens/ConectaFucapi/DiarioEmocoesScreen';

// Módulo Espaço Calma
import EspacoCalmaScreen from './src/screens/EspacoCalma/EspacoCalmaScreen';
import RespiracaoScreen from './src/screens/EspacoCalma/RespiracaoScreen';
import ContatoApoioScreen from './src/screens/EspacoCalma/ContatoApoioScreen';
import SonsRelaxantesScreen from './src/screens/EspacoCalma/SonsRelaxantesScreen';
import EstimulosVisuaisScreen from './src/screens/EspacoCalma/EstimulosVisuaisScreen';
import DesenhoEstrelasScreen from './src/screens/EspacoCalma/DesenhoEstrelasScreen';
import BolhasFlutuantesScreen from './src/screens/EspacoCalma/BolhasFlutuantesScreen';
import LavaLampScreen from './src/screens/EspacoCalma/LavaLampScreen';
import FluxoParticulasScreen from './src/screens/EspacoCalma/FluxoParticulasScreen';
import SigaLinhaScreen from './src/screens/EspacoCalma/SigaLinhaScreen';

// Módulo MeuPerfil
import MeuPerfilScreen from './src/screens/MeuPerfil/MeuPerfilScreen';
import SobreAppScreen from './src/screens/MeuPerfil/SobreAppScreen';
import ContatosEmergenciaScreen from './src/screens/MeuPerfil/ContatosEmergenciaScreen';
import AddContatoScreen from './src/screens/MeuPerfil/AddContatoScreen';
import NotificacoesScreen from './src/screens/MeuPerfil/NotificacoesScreen';
import AjudaSuporteScreen from './src/screens/MeuPerfil/AjudaSuporteScreen';

const Stack = createNativeStackNavigator();

const FullAppStack = ({ onLogout }) => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MeuDiaFucapi" component={MeuDiaFucapiScreen} options={{ title: 'Meu Dia Fucapi' }} />
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda Visual' }} />
        <Stack.Screen name="MapaSensorial" component={MapaSensorialScreen} options={{ title: 'Mapa Sensorial do Campus' }} />
        <Stack.Screen name="GestorDeFoco" component={GestorDeFocoScreen} options={{ title: 'Gestor de Tarefas com Foco' }} />
        <Stack.Screen name="ConectaFucapi" component={ConectaFucapiScreen} options={{ title: 'Conecta FUCAPI' }} />
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Canal de Comunicação' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.contactName })} />
        <Stack.Screen name="PerfilNecessidades" component={PerfilNecessidadesScreen} options={{ title: 'Meu Perfil de Necessidades' }} />
        <Stack.Screen name="DiarioEmocoes" component={DiarioEmocoesScreen} options={{ title: 'Diário de Emoções' }} />
        <Stack.Screen name="EspacoCalma" component={EspacoCalmaScreen} options={{ title: 'Espaço Calma' }} />
        <Stack.Screen name="Respiracao" component={RespiracaoScreen} options={{ title: 'Respiração Guiada' }} />
        <Stack.Screen name="ContatoApoio" component={ContatoApoioScreen} options={{ title: 'Contato de Apoio Rápido' }} />
        <Stack.Screen name="SonsRelaxantes" component={SonsRelaxantesScreen} options={{ title: 'Sons Relaxantes' }} />
        <Stack.Screen name="EstimulosVisuais" component={EstimulosVisuaisScreen} options={{ title: 'Estímulos Visuais' }} />
        <Stack.Screen name="DesenhoEstrelas" component={DesenhoEstrelasScreen} options={{ title: 'Desenhar com Estrelas' }} />
        <Stack.Screen name="BolhasFlutuantes" component={BolhasFlutuantesScreen} options={{ title: 'Bolhas Flutuantes' }} />
        <Stack.Screen name="LavaLamp" component={LavaLampScreen} options={{ title: 'Lâmpada de Lava Digital' }} />
        <Stack.Screen name="FluxoParticulas" component={FluxoParticulasScreen} options={{ title: 'Fluxo de Partículas' }} />
        <Stack.Screen name="SigaLinha" component={SigaLinhaScreen} options={{ title: 'Siga a Linha' }} />
        <Stack.Screen name="SobreApp" component={SobreAppScreen} options={{ title: 'Sobre o Fucapi Acolhe' }} />
        <Stack.Screen name="ContatosEmergencia" component={ContatosEmergenciaScreen} options={{ title: 'Contatos de Emergência' }} />
        <Stack.Screen name="Notificacoes" component={NotificacoesScreen} options={{ title: 'Notificações' }} />
        <Stack.Screen name="AjudaSuporte" component={AjudaSuporteScreen} options={{ title: 'Ajuda & Suporte' }} />
        <Stack.Screen name="MeuPerfil">
            {props => <MeuPerfilScreen {...props} onLogout={onLogout} />}
        </Stack.Screen>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddContato" component={AddContatoScreen} options={{ headerShown: false }} />
        </Stack.Group>
    </Stack.Navigator>
);

const screenOptions = { headerStyle: { backgroundColor: '#005a9c' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } };

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle={isLoggedIn ? "light-content" : "dark-content"} />
        {isLoggedIn ? (
            <FullAppStack onLogout={() => setIsLoggedIn(false)} />
        ) : (
            <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}