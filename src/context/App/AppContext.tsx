import { createContext } from "react";
import { Tracks } from "./interface";
import SpotifyWebApi from "spotify-web-api-js";

export const AppState = {
    tracks: {} as Tracks,
    setTracks: Function(),
    spotify: {} as SpotifyWebApi.SpotifyWebApiJs,
    setSpotify: Function(),
}

export type AppState = typeof AppState;
const AppContext = createContext<AppState>(AppState);
export default AppContext;