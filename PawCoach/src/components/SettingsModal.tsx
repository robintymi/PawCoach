import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onClearHistory: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose, onClearHistory }) => {
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  const handleClearHistory = () => {
    Alert.alert(
      'Chat-Verlauf löschen',
      'Möchtest du wirklich den gesamten Chat-Verlauf löschen? Dies kann nicht rückgängig gemacht werden.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: onClearHistory,
        },
      ]
    );
  };

  const handleFeedback = () => {
    const email = 'feedback@pawcoach.app';
    const subject = encodeURIComponent('PawCoach Feedback');
    const body = encodeURIComponent(`\nApp-Version: ${appVersion}\n\nMein Feedback:\n`);
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Einstellungen</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeButton}>{'\u2715'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleClearHistory}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{'\uD83D\uDDD1'}</Text>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Chat-Verlauf löschen</Text>
                <Text style={styles.menuSubtitle}>Alle gespeicherten Nachrichten entfernen</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleFeedback}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{'\u2709'}</Text>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Feedback geben</Text>
                <Text style={styles.menuSubtitle}>Sende uns eine E-Mail mit deinem Feedback</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.versionContainer}>
              <Text style={styles.versionLabel}>PawCoach</Text>
              <Text style={styles.versionText}>Version {appVersion}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFF8F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8D5B7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4E342E',
  },
  closeButton: {
    fontSize: 20,
    color: '#8D6E63',
    padding: 4,
  },
  content: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8D5B7',
    gap: 12,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4E342E',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#8D6E63',
    marginTop: 2,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4E342E',
  },
  versionText: {
    fontSize: 13,
    color: '#A1887F',
    marginTop: 4,
  },
});

export default SettingsModal;
