import { apiClient } from "./client";

// General search across all content types
export const searchAll = async (query: string, page = 1) => {
  const response = await apiClient.get(
    `/search?query=${query}&page=${page}`
  );
  return response.data.data.results;
};

// Search songs
export const searchSongs = async (query: string, page = 1) => {
  const response = await apiClient.get(
    `/search/songs?query=${query}&page=${page}`
  );
  return response.data.data.results;
};

// Search albums
export const searchAlbums = async (query: string, page = 1) => {
  const response = await apiClient.get(
    `/search/albums?query=${query}&page=${page}`
  );
  return response.data.data.results;
};

// Search artists
export const searchArtists = async (query: string, page = 1) => {
  const response = await apiClient.get(
    `/search/artists?query=${query}&page=${page}`
  );
  return response.data.data.results;
};

// Search playlists
export const searchPlaylists = async (query: string, page = 1) => {
  const response = await apiClient.get(
    `/search/playlists?query=${query}&page=${page}`
  );
  return response.data.data.results;
};
