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
import { songService } from '../../services/songService';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Song } from '../../types/song';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';

const RANDOM_SEED_SONG = 'yDeAS8Eh';

const PLAYLIST_NAMES = [
  'Daily Vibes',
  'Late Night Hits',
  'Chill Mode',
  'Top Picks',
  'Feel Good',
  'On Repeat',
  'Fresh Finds',
];

const PlaylistsScreen = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const { playSong } = usePlayerStore();
  const navigation = useNavigation();

  const playlistName =
    PLAYLIST_NAMES[Math.floor(Math.random() * PLAYLIST_NAMES.length)];

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const data = await songService.getSongSuggestions(
          RANDOM_SEED_SONG,
          15
        );
        setSongs(data);
      } catch (err) {
        console.error('Failed to load playlist', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylist();
  }, []);

  const handlePlay = (song: Song) => {
    playSong(song, songs);
    // @ts-ignore
    navigation.navigate('Player');
  };

  const renderItem = ({ item }: { item: Song }) => {
    const image =
      item.image?.[2]?.url || item.image?.[0]?.url;

    return (
      <TouchableOpacity
        style={styles.songItem}
        onPress={() => handlePlay(item)}
      >
        <Image source={{ uri: image }} style={styles.songImage} />

        <View style={styles.songInfo}>
          <Text style={styles.songName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {item.artists.primary?.[0]?.name}
          </Text>
        </View>

        <Ionicons
          name="play-circle"
          size={28}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const playlistImage = songs[0]?.image?.[2]?.url;

  return (
    <View style={styles.container}>
      <HomeHeader />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.playlistHeader}>
              {playlistImage && (
                <Image
                  source={{ uri: playlistImage }}
                  style={styles.playlistImage}
                />
              )}

              <Text style={styles.playlistTitle}>
                {playlistName}
              </Text>

              <Text style={styles.playlistMeta}>
                {songs.length} songs • My playlist
              </Text>

              <TouchableOpacity
                style={styles.playAllButton}
                onPress={() => handlePlay(songs[0])}
              >
                <Ionicons
                  name="play"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.playAllText}>
                  Play All
                </Text>
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PlaylistsScreen;

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  playlistHeader: {
    alignItems: 'center',
    paddingVertical: spacing.l,
  },

  playlistImage: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginBottom: spacing.m,
  },

  playlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },

  playlistMeta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginVertical: 6,
  },

  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: spacing.s,
  },

  playAllText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },

  list: {
    paddingHorizontal: spacing.m,
    paddingBottom: 120,
  },

  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },

  songImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: spacing.m,
  },

  songInfo: {
    flex: 1,
  },

  songName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },

  artist: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
