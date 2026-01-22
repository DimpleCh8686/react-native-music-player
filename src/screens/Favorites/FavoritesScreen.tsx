import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeHeader } from '../../components/HomeHeader';
import { usePlayerStore } from '../../store/usePlayerStore';
import { songService } from '../../services/songService';
import { Song } from '../../types/song';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';

const FAVORITE_SONG_IDS = [
  'yDeAS8Eh',
  '3IoDK8qI',
  '5GjH_13K',
  'ZMcM9o8H',
  'Mgqhq94a',
];

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const { playSong } = usePlayerStore();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const songs = await songService.getSongsByIds(FAVORITE_SONG_IDS);
        setFavorites(songs);
      } catch (error) {
        console.error('Failed to load favorites', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handlePlay = (song: Song) => {
    playSong(song, favorites);
    // @ts-ignore
    navigation.navigate('Player');
  };

  const renderItem = ({ item }: { item: Song }) => {
    const imageUri =
      item.image?.[2]?.url || item.image?.[0]?.url;

    const artistName =
      item.artists?.primary?.[0]?.name || 'Unknown Artist';

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePlay(item)}
      >
        <Image 
        source={
            { 
                uri: imageUri 
            }
        } style={styles.image} />

        <View 
        style={styles.info}>
          <Text 
          style={styles.songName} 
          numberOfLines={1}>
            {item.name}
          </Text>
          <Text 
          style={styles.artistName} 
          numberOfLines={1}>
            {artistName}
          </Text>
        </View>

        <Ionicons
          name="play-circle"
          size={30}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader />

      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Ionicons name="heart" size={22} color="#e63946" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet ❤️</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  list: {
    paddingHorizontal: spacing.m,
    paddingBottom: 120,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: spacing.s,
    marginBottom: spacing.s,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: spacing.m,
  },
  info: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  artistName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
