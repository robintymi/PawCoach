import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
  onRate: (rating: number) => void;
  currentRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onRate, currentRating }) => {
  const [submitted, setSubmitted] = useState(!!currentRating);
  const [selectedRating, setSelectedRating] = useState(currentRating || 0);

  const handleRate = (rating: number) => {
    if (submitted) return;
    setSelectedRating(rating);
    setSubmitted(true);
    onRate(rating);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.thanksText}>Danke!</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <Text key={star} style={styles.starFixed}>
              {star <= selectedRating ? '\u2605' : '\u2606'}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bewertung:</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRate(star)}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Text style={styles.star}>{'\u2606'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  label: {
    fontSize: 11,
    color: '#8D6E63',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 18,
    color: '#FFB300',
  },
  starFixed: {
    fontSize: 18,
    color: '#FFB300',
  },
  thanksText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default StarRating;
