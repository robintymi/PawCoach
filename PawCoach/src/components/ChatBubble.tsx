import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
  trainerAvatar?: string;
  trainerName?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, trainerAvatar, trainerName }) => {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      {!isUser && (
        <View style={styles.trainerHeader}>
          <Text style={styles.avatar}>{trainerAvatar || '🐕'}</Text>
          <Text style={styles.trainerName}>{trainerName || 'Trainer'}</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
          {message.content}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 12,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  trainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  avatar: {
    fontSize: 18,
  },
  trainerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5D4037',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E8D5B7',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#2C1810',
  },
  timestamp: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 3,
  },
});

export default ChatBubble;
