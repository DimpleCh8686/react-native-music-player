import axios from 'axios';
import { Album, AlbumResponse } from '../types/album';

const API_BASE_URL = 'https://saavn.sumit.co/api';

export const albumService = {
    getAlbumDetails: async (id: string): Promise<Album | null> => {
        try {
            const response = await axios.get<AlbumResponse>(`${API_BASE_URL}/albums`, {
                params: { id }
            });
            if (response.data.success) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching album details for ID ${id}:`, error);
            return null;
        }
    },

    getMultipleAlbums: async (ids: string[]): Promise<Album[]> => {
        try {
            const promises = ids.map(id => albumService.getAlbumDetails(id));
            const results = await Promise.all(promises);
            return results.filter((album): album is Album => album !== null);
        } catch (error) {
            console.error('Error fetching multiple albums:', error);
            return [];
        }
    },

    getTopAlbums: async (): Promise<Album[]> => {

        const albumIds = [
            '12875025', 
            '14279654', 
            '19034342', 
            '35010248',
            '1693718',
            '1053550',
            '3254473',
            '1045276',
            '14724408',
            '1035220',
                ];

        return await albumService.getMultipleAlbums(albumIds);
    },
};
