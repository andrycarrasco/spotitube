import { useContext, useEffect, useState } from "react";
import { getTokenFromUrl } from "../../services/spotifyLoginService";
import SpotifyWebApi from "spotify-web-api-js";
import AppContext, { AppState } from "../../context/App/AppContext";

export const Auth = () => {
  const { setSpotify } = useContext<AppState>(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleToken();
  }, []);

  const handleToken = async () => {
    const token = (await getTokenFromUrl())?.access_token;
    if (token) {
      sessionStorage.setItem("spotify_access_token", token);
    //   const spotifyService = new SpotifyWebApi();
    //   spotifyService.setAccessToken(token);
    //   setSpotify(spotifyService);
    //   console.log('Token', token);
    }
    // window.location.hash = "";
    window.location.href = "/migrator";
    setLoading(false);
  };

  return (
    <>{loading ? "Getting token" : "Token Got Successfully. Redirecting..."}</>
  );
};
