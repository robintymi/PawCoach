import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Trainer } from '../types';

interface TrainerSelectorProps {
  trainers: Trainer[];
  selectedTrainer: Trainer;
  onSelect: (trainer: Trainer) => void;
}

const TrainerSelector: React.FC<TrainerSelectorProps> = ({ trainers, selectedTrainer, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wähle deinen Trainer:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {trainers.map((trainer) => (
          <TouchableOpacity
            key={trainer.id}
            style={[styles.card, selectedTrainer.id === trainer.id && styles.selectedCard]}
            onPress={() => onSelect(trainer)}
            activeOpacity={0.8}
          >
            <Text style={styles.avatar}>{trainer.avatar}</Text>
            <Text style={[styles.name, selectedTrainer.id === trainer.id && styles.selectedName]}>
              {trainer.name}
            </Text>
            <Text style={styles.specialty}>{trainer.specialty}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#FFF8F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E8D5B7',
  },
  label: {
    fontSize: 12,
    color: '#8D6E63',
    marginBottom: 8,
    marginHorizontal: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 110,
    borderWidth: 2,
    borderColor: '#E8D5B7',
  },
  selectedCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  avatar: {
    fontSize: 28,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4E342E',
    textAlign: 'center',
  },
  selectedName: {
    color: '#2E7D32',
  },
  specialty: {
    fontSize: 10,
    color: '#8D6E63',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default TrainerSelector;
