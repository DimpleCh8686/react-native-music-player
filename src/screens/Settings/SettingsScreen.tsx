import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeHeader } from '../../components/HomeHeader';
import { useSettingsStore } from '../../store/useSettingsStore';
import { colors } from '../../theme/colors';

const SettingsScreen = () => {
  const {
    darkMode,
    notifications,
    audioQuality,
    toggleDarkMode,
    toggleNotifications,
    setAudioQuality,
    logout,
  } = useSettingsStore();

  const bg = darkMode ? colors.black : colors.background;
  const card = darkMode ? '#1a1a1a' : colors.cardBackground;
  const text = darkMode ? colors.white : colors.text;
  const subText = darkMode ? colors.gray : colors.textSecondary;

  const chooseQuality = () => {
    Alert.alert('Audio Quality', 'Choose playback quality', [
      { text: 'Low', onPress: () => setAudioQuality('Low') },
      { text: 'Medium', onPress: () => setAudioQuality('Medium') },
      { text: 'High', onPress: () => setAudioQuality('High') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const clearCache = () => {
    Alert.alert('Cache Cleared', 'Temporary files removed');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <HomeHeader />

      <Text style={[styles.sectionTitle, { color: text }]}>
        Preferences
      </Text>

      <SettingItem
        icon="moon"
        label="Dark Mode"
        right={<Switch value={darkMode} onValueChange={toggleDarkMode} />}
        textColor={text}
        cardColor={card}
      />

      <SettingItem
        icon="notifications"
        label="Notifications"
        right={
          <Switch
            value={notifications}
            onValueChange={toggleNotifications}
          />
        }
        textColor={text}
        cardColor={card}
      />

      <SettingItem
        icon="musical-notes"
        label="Audio Quality"
        value={audioQuality}
        onPress={chooseQuality}
        textColor={text}
        cardColor={card}
        valueColor={subText}
      />

      <Text style={[styles.sectionTitle, { color: text }]}>
        Storage
      </Text>

      <SettingItem
        icon="trash"
        label="Clear Cache"
        onPress={clearCache}
        textColor={text}
        cardColor={card}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={20} color={colors.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

/* Reusable Item */

const SettingItem = ({
  icon,
  label,
  value,
  right,
  onPress,
  textColor,
  valueColor,
  cardColor,
}: any) => (
  <TouchableOpacity
    style={[styles.item, { backgroundColor: cardColor }]}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={[styles.itemText, { color: textColor }]}>
        {label}
      </Text>
    </View>

    {right ? (
      right
    ) : value ? (
      <Text style={{ color: valueColor }}>{value}</Text>
    ) : (
      <Ionicons name="chevron-forward" size={18} color={colors.gray} />
    )}
  </TouchableOpacity>
);

/* Styles */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e63946',
    margin: 16,
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
