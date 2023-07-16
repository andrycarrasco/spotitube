import { goToSpotifyLogin } from "../../services/spotifyLoginService";
import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import "./styles.scss";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  hasGrantedAllScopesGoogle,
  useGoogleLogin,
} from "@react-oauth/google";
import React from "react";

const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  // "playlist-modify-public",
  // "playlist-modify-private",
  "user-library-read",
  // "user-library-modify",
  "user-read-recently-played",
  "user-top-read",
];

export const Home = () => {
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  //   redirect_uri: "http://localhost:3000/migrator",
  //   flow: "auth-code",
  //   scope: "https://www.googleapis.com/auth/youtube.readonly",
  // });

  const login = useGoogleLogin({
    onSuccess: async tokenRespose => {
      sessionStorage.setItem("yt_access_token", tokenRespose.access_token);
      console.log(tokenRespose);
    },
    onError: errorResponse => console.log(errorResponse),
    scope: "https://www.googleapis.com/auth/youtube"
  });

  return (
    <div className="home-container">
      <Typography variant="h1" component="h1">
        Spotify To YouTube Music
      </Typography>
      <div className="home-button home-button-spotify">
        <div
          className="home-button-spotify-text"
          onClick={() => goToSpotifyLogin(scopes)}
        >
          <div className="home-button-to-spotify-icon">
            <LoginIcon
              fontSize="large"
              style={{ height: "100%", display: "list-item" }}
            />
          </div>
          <Typography variant="h4" component="h3">
            Log In Spotify
          </Typography>
        </div>
      </div>
      {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_YOUTUBE_CLIENT_ID}> */}
        <div className="home-button home-button-youtube">
          <div className="home-button-youtube-text" onClick={() => login()}>
            <div className="home-button-to-spotify-icon">
              <LoginIcon
                fontSize="large"
                style={{ height: "100%", display: "list-item" }}
              />
            </div>
            <Typography variant="h4" component="h3">
              Log In Youtube
            </Typography>
          </div>
          {/* <GoogleLogin
            onSuccess={handleLogIn}
            onError={() => console.log("error")}
            theme="filled_black"
            width="10rem"
          /> */}
        </div>
      {/* </GoogleOAuthProvider> */}
    </div>
  );
};
