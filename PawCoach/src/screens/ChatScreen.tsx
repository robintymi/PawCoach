import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Message, Trainer } from '../types';
import { TRAINER, fetchTrainer, getWelcomeMessage } from '../constants/trainers';
import { sendMessageToClaude, submitRating } from '../services/claudeApi';
import { saveMessages, loadMessages, clearMessages } from '../services/chatStorage';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import OfflineBanner from '../components/OfflineBanner';
import SettingsModal from '../components/SettingsModal';

const ChatScreen: React.FC = () => {
  const [trainer, setTrainer] = useState<Trainer>(TRAINER);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  // Track which message IDs have finished streaming and should show rating
  const [completedMessageIds, setCompletedMessageIds] = useState<Set<string>>(new Set());

  // Load persisted messages on app start
  useEffect(() => {
    const init = async () => {
      const saved = await loadMessages();
      const loadedTrainer = await fetchTrainer();
      setTrainer(loadedTrainer);

      if (saved && saved.length > 0) {
        setMessages(saved);
        // All previously saved assistant messages are considered completed
        const completedIds = new Set<string>();
        saved.forEach(msg => {
          if (msg.role === 'assistant' && msg.content.length > 0) {
            completedIds.add(msg.id);
          }
        });
        setCompletedMessageIds(completedIds);
      } else {
        setMessages([{
          id: '0',
          role: 'assistant',
          content: getWelcomeMessage(loadedTrainer),
          timestamp: new Date(),
        }]);
      }
    };
    init();
  }, []);

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isLoading || isOffline) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await sendMessageToClaude(
        text,
        messages,
        trainer,
        (chunk: string) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      );

      // Store chatId on the assistant message and mark as completed
      setMessages(prev => {
        const updated = prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, chatId: response.chatId }
            : msg
        );
        // Save to AsyncStorage after assistant response completes
        saveMessages(updated);
        return updated;
      });

      setCompletedMessageIds(prev => new Set(prev).add(assistantMessageId));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setMessages(prev => {
        const updated = prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: `Entschuldigung, da ist etwas schiefgelaufen: ${errorMsg}` }
            : msg
        );
        return updated;
      });
      Alert.alert('Verbindungsfehler', errorMsg);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [inputText, isLoading, isOffline, messages, trainer]);

  const handleRate = useCallback(async (messageId: string, rating: number) => {
    // Find the message to get the chatId
    const message = messages.find(m => m.id === messageId);
    if (!message?.chatId) return;

    // Update message with rating locally
    setMessages(prev => {
      const updated = prev.map(msg =>
        msg.id === messageId ? { ...msg, rating } : msg
      );
      saveMessages(updated);
      return updated;
    });

    // Send rating to backend
    try {
      await submitRating(message.chatId, rating);
    } catch {
      // Rating already saved locally, backend failure is non-critical
    }
  }, [messages]);

  const handleClearHistory = useCallback(async () => {
    await clearMessages();
    const welcomeMessage: Message = {
      id: '0',
      role: 'assistant',
      content: getWelcomeMessage(trainer),
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setCompletedMessageIds(new Set());
    setSettingsVisible(false);
  }, [trainer]);

  const handleConnectivityChange = useCallback((connected: boolean) => {
    setIsOffline(!connected);
  }, []);

  const isSendDisabled = !inputText.trim() || isLoading || isOffline;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>{trainer.avatar}</Text>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{trainer.name}</Text>
          <Text style={styles.headerSubtitle}>{trainer.specialty}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setSettingsVisible(true)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.settingsIcon}>{'\u2699'}</Text>
        </TouchableOpacity>
      </View>

      <OfflineBanner onConnectivityChange={handleConnectivityChange} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              trainerAvatar={trainer.avatar}
              trainerName={trainer.name}
              showRating={
                item.role === 'assistant' &&
                item.id !== '0' &&
                completedMessageIds.has(item.id)
              }
              onRate={(rating) => handleRate(item.id, rating)}
            />
          )}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListFooterComponent={
            isLoading && messages[messages.length - 1]?.content === ''
              ? <TypingIndicator />
              : null
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={isOffline ? 'Offline - keine Verbindung' : `Frage ${trainer.name}\u2026`}
            placeholderTextColor="#A1887F"
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
            editable={!isOffline}
          />
          <TouchableOpacity
            style={[styles.sendButton, isSendDisabled && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={isSendDisabled}
            activeOpacity={0.8}
          >
            <Text style={styles.sendIcon}>{'\u27A4'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onClearHistory={handleClearHistory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF8F0' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#4E342E',
  },
  headerEmoji: { fontSize: 28 },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: '#BCAAA4', marginTop: 1 },
  settingsButton: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 24,
    color: '#BCAAA4',
  },
  messageList: { paddingVertical: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8D5B7',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: '#FFF8F0',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#2C1810',
    borderWidth: 1,
    borderColor: '#E8D5B7',
  },
  sendButton: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#4CAF50',
    justifyContent: 'center', alignItems: 'center',
  },
  sendButtonDisabled: { backgroundColor: '#C8E6C9' },
  sendIcon: { color: '#FFFFFF', fontSize: 18, marginLeft: 2 },
});

export default ChatScreen;
