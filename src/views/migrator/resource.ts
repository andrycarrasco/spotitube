import axios from "axios";

export const handleTracksByPlayListId = async (spotify: any, playListId: string, setTracks: Function, toggleShowTracks: Function) => {
    const tracks = await spotify.getPlaylistTracks(playListId);

    setTracks(tracks);
    toggleShowTracks();
};

export const getTracksByPlayListId = async (playListId = '', totalTracks = 0, setTracks: Function, toggleShowTracks: Function) => {
    let tracks: any[] = [];

    const requestQuantity = Math.ceil(totalTracks / 50);

    for (let i = 0; i < requestQuantity; i++) {
        const url = `https://api.spotify.com/v1/playlists/${playListId}/tracks?market=ES&limit=50&offset=${i * 50}`;
        const part_tracks = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("spotify_access_token")}`
            }
        });
        tracks = [...tracks, ...part_tracks.data.items]
    }

    const allTracksFromPlaylist = { items: tracks, total: totalTracks }

    console.log("🚀 ~ file: resource.ts:27 ~ getTracksByPlayListId ~ allTracksFromPlaylist:", allTracksFromPlaylist)
    setTracks(allTracksFromPlaylist);
    toggleShowTracks();
};

// First time login
// go to spoty, get token, save token in session storage, set token in spotify
// Token expires
// go to spoty, get token, save token in session storage, set token in spotify

export const isValidToken = async (spotify: any) => {
    let token = sessionStorage.getItem("access_token");
    if (token) {
        spotify.setAccessToken(token);
        try {
            await spotify.getMe();
            return true;
        } catch (error) {
            console.log('error', error);
            window.location.href = "/";
            return false;
        }
    }
}