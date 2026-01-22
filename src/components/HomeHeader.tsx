import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';

interface HomeHeaderProps {
  onSearch?: (query: string) => void; 
}


export const HomeHeader: React.FC<HomeHeaderProps> = ({ onSearch }) => {
  const insets = useSafeAreaInsets();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchIconPress = () => {
    setIsSearching(!isSearching);
    setQuery('');
    if (!isSearching && onSearch) onSearch('');
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (onSearch) onSearch(text);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.s, backgroundColor: colors.background }]}>
      {isSearching ? (
        <View style={
            [
                styles.searchContainer, 
                { 
                    backgroundColor: colors.cardBackground, 
                    borderColor: colors.lightGray 
                }
            ]
        }>
          <Ionicons 
          name="search" 
          size={20} 
          color={colors.textSecondary} 
          style={{ marginHorizontal: 8 }} 
          />
          <TextInput
          placeholder="Search..."
          placeholderTextColor={colors.textSecondary}
          style={{
            flex: 1,
            marginLeft: 8,
            color: colors.text,
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightGray,
           }}
          value={query} 
          onChangeText={handleChangeText} 
          autoFocus
        />
          <TouchableOpacity onPress={handleSearchIconPress}>
            <Ionicons 
            name="close" 
            size={24} 
            color={colors.textSecondary} 
            style={{ marginHorizontal: 8 }} 
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View 
        style={styles.normalHeader}
        >
          <View 
          style={styles.leftContainer}
          >
            <Ionicons 
            name="musical-notes" size={32} 
            color={colors.primary} 
            />
            <Text 
            style={
                [styles.title, 
                { 
                    color: colors.text 
                }
                ]}>Mume</Text>
          </View>
          <TouchableOpacity onPress={handleSearchIconPress}>
            <Ionicons name="search" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s,
  },
  normalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  title: {
    fontSize: typography.header.fontSize,
    fontWeight: typography.header.fontWeight,
    marginLeft: spacing.s,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 80,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});
