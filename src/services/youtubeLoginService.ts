import axios from 'axios';

export const createPlaylist = async ({ title = '', description = '' }) => {
  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&part=status&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
  const access_token = sessionStorage.getItem('yt_access_token')
  const response = await axios.post(url, {
    snippet: {
      title: title,
      description: description
    },
    status: {
      privacyStatus: 'public'
    }
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  // console.log(response.data);
  return response.data
}

export const searchTrack = async (track: any) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&q=${track.artist} ${track.title}`
  const response = await axios.get(url)
  return { youtube: response.data.items[0], spotify: track.id }
}


export const insertTrackToPlaylist = async (playlistId: string, videoId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
  const access_token = sessionStorage.getItem('yt_access_token')
  const response = await axios.post(url, {
    snippet: {
      playlistId,
      resourceId: {
        kind: 'youtube#video',
        videoId: videoId
      }
    }
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  return response.data
}


