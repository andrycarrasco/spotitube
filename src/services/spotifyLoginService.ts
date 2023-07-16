export const goToSpotifyLogin = (scopes: string[]) => {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(import.meta.env.VITE_SPOTIFY_CLIENT_ID)}&response_type=token&redirect_uri=${encodeURIComponent(import.meta.env.VITE_SPOTIFY_REDIRECT_URI)}&scope=${scopes.join("%20")}&show_dialog=true`;
}

export const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split("&").reduce((initial: any, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
};


