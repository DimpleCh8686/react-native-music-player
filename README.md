# React Native Music Player 🎵

A modern, full-featured music player application built with React Native and Expo. Stream, discover, and manage your favorite music with an intuitive and responsive user interface.

## 📱 Features

### Core Features
- **Music Playback**: Play, pause, skip, and seek through songs with full playback controls
- **Search Functionality**: Search for songs, artists, and albums from an extensive music API
- **Artist Discovery**: Browse and explore artists with detailed information and artwork
- **Album Browsing**: View albums and their track listings
- **Now Playing Screen**: Full-screen player with album artwork, progress slider, and playback controls
- **Recently Played**: Track and access your recently played songs
- **Favorites**: Save and manage your favorite songs for quick access
- **Playlists**: Create and manage custom playlists
- **Settings**: Customize app preferences and behavior

### User Interface
- **Responsive Design**: Optimized for various screen sizes (iOS, Android, Web)
- **Bottom Tab Navigation**: Easy access to Home, Search, Favorites, Playlists, and Settings
- **Native Stack Navigation**: Smooth navigation between screens
- **Material Design Icons**: Clean and intuitive icon system using Expo Vector Icons
- **Custom Theme**: Consistent color scheme and spacing throughout the app

## 🚀 Tech Stack

### Core
- **React Native** `0.81.5`
- **Expo** `~54.0.31`
- **React** `19.1.0`
- **TypeScript** `~5.9.2`

### Navigation
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/native-stack`
> ⚠️ Expo Router is **NOT** used (as per requirement)

### State Management
- **Zustand** (lightweight & scalable)

### Audio
- **expo-av**

### Storage
- **AsyncStorage** (can be swapped with MMKV)

### Networking
- **Axios**

---

## 🌐 API Used (JioSaavn)

**Base URL**
https://saavn.sumit.co/

### 🔍 Search APIs
GET /api/search
GET /api/search/songs
GET /api/search/albums
GET /api/search/artists
GET /api/search/playlists

### 🎵 Songs APIs
GET /api/songs
GET /api/songs/{id}
GET /api/songs/{id}/suggestions

### 👤 Artists APIs
GET /api/artists/{id}
GET /api/artists/{id}/songs
GET /api/artists/{id}/albums

**No API key required**

---

### Data Fetching
- **Axios** (^1.13.2): HTTP client for API requests

### UI Components & Libraries
- **@react-native-community/slider** (^5.1.2): Audio progress slider
- **@expo/vector-icons** (^15.0.3): Material Design icons
- **react-native-safe-area-context** (~5.6.0): Safe area insets handling
- **react-native-screens** (~4.16.0): Native screen components
- **react-native-web** (^0.21.0): Web support for React Native

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI (optional but recommended)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/react-native-music-player.git
cd react-native-music-player
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Require when you have API key

4. **Start the development server**
```bash
npm start
# or
yarn start
```

## 🏃 Running the App

### Android
```bash
npm run android
# or
expo start --android
```

### iOS
```bash
npm run ios
# or
expo start --ios
```

### Web
```bash
npm run web
# or
expo start --web
```

## 🎯 Usage Guide

### Home Screen
- Browse recently played songs, suggested tracks, and featured artists
- Tap on any song, artist, or album to explore or play
- Swipe through categories to filter content
- Pull down to refresh content

### Search
- Use the search tab to find songs, artists, or albums by keyword
- View search results organized by content type
- Tap any result to navigate to its details page

### Player Screen
- View full album artwork and song information
- Use playback controls to play/pause, skip, and rewind
- Adjust playback position with the progress slider
- View current time and remaining duration

### Favorites
- Save your favorite songs for quick access
- Manage your collection from the Favorites tab
- All favorites are persisted locally

### Playlists
- Create custom playlists from the Playlists screen
- Add songs to playlists while playing
- View and manage playlist contents

### Settings
- Customize app appearance and behavior
- Manage audio preferences
- Configure notification settings

## 🏗️ Architecture

### State Management
The app uses **Zustand** for global state management through the `usePlayerStore` hook. This store manages:
- Current song information
- Playback status (playing/paused)
- Audio queue and current position
- Playback position and duration
- Playback controls (play, pause, skip, seek)

### API Integration
- **axios** is configured as the HTTP client in `src/api/client.ts`
- All API endpoints are abstracted in service files (`src/services/`)
- Search functionality through the `search.api.ts` module
- Flexible API response handling with TypeScript interfaces

### Audio Playback
- **expo-av** provides audio playback capabilities
- Audio context is managed through the player store
- Support for progress tracking and seeking

### Component Architecture
- Functional components with React Hooks
- Custom hooks for state management
- Props-based component composition
- Shared theme system for consistent styling

## 📝 Configuration

### Theme Customization
Edit `src/theme/colors.ts` to customize the color palette:
```typescript
export const colors = {
  primary: '#1DB954',      // Spotify green
  secondary: '#191414',    // Dark background
  text: '#FFFFFF',         // Primary text
  textSecondary: '#B3B3B3',// Secondary text
  // ... more colors can be added 
};
```

### Spacing & Typography
Adjust spacing and typography in `src/theme/spacing.ts`:
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  // ... more scales
};
```

## 🔧 Development

### Adding a New Screen

1. Create a new file in `src/screens/YourScreen/YourScreen.tsx`
2. Create the screen component with navigation props
3. Add the screen to the navigation configuration in `src/navigation/AppNavigator.tsx` or `TabNavigator.tsx`
4. Import necessary components and hooks

### Creating a New Service

1. Create a service file in `src/services/newService.ts`
2. Define API calls using the configured axios client
3. Handle error cases appropriately
4. Export functions for use in components

### Adding New Types

Define new TypeScript interfaces in `src/types/yourType.ts` for type safety across the app.

## 🐛 Troubleshooting

### Common Issues

**Audio not playing**
- Ensure audio permissions are granted
- Check API is returning valid audio URLs
- Verify audio format is supported by expo-av

**Navigation not working**
- Ensure screens are registered in the navigator
- Check for missing navigation props
- Verify route names match between navigator and navigation calls

## 📱 Device Support

- **iOS**: 12.0 and above
- **Android**: 5.0 (API 21) and above
- **Web**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🚢 Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

### Web
```bash
expo export --platform web
```

## 📄 Expo Configuration

The app is configured in `app.json` for Expo platform:
- **Name**: music-player
- **Slug**: music-player
- **Platforms**: Android, iOS, Web
- **Android Package**: com.musicplayer.app

## ⚖️ Trade-Offs & Decisions
### Why Zustand over Redux?
-Less boilerplate
-Faster setup
-Ideal for player-centric global state

### Why Expo?
-Faster development
-Audio APIs out of the box
-Easy cross-platform support
-Known Limitations
-Background playback requires additional native configuration
-Offline downloads not implemented (architecture ready)
-No authentication (intentionally omitted)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React and React Native best practices
- Use functional components and hooks
- Maintain consistent naming conventions
- Add comments for complex logic

## 📋 To-Do / Future Enhancements

- [ ] Offline mode with cached music
- [ ] Social sharing features
- [ ] User authentication and cloud sync
- [ ] Advanced equalizer controls
- [ ] Lyric display integration
- [ ] Podcast support
- [ ] Dark/Light theme toggle
- [ ] Background audio playback
- [ ] Chromecast/AirPlay support
- [ ] Album/Artist follow functionality

## 🔐 Security & Privacy

- Sensitive data (API keys, tokens) should be stored securely
- Use environment variables for configuration
- Implement proper error handling to avoid exposing sensitive information
- Respect user privacy and data according to applicable regulations


## Acknowledgments

- Built with [React Native](https://reactnative.dev/)
- Powered by [Expo](https://expo.dev/)
- State management by [Zustand](https://github.com/pmndrs/zustand)
- Navigation by [React Navigation](https://reactnavigation.org/)
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)

## 📊 Project Stats

- **React Version**: 19.1.0
- **React Native Version**: 0.81.5
- **Expo Version**: ~54.0.31
- **TypeScript Version**: ~5.9.2
- **Total Components**: 5+
- **Total Screens**: 7
- **Platforms**: iOS, Android, Web

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintained by**: Dimple