import SpotifyWebApi from "spotify-web-api-js";
import { AppState } from "./AppContext";
import { Tracks } from "./interface";
import { SET_SPOTIFY, SET_TRACKS } from "./types";

export default function (
  state: AppState,
  { payload, type }: Action
): returnType {
  switch (type) {
    case SET_TRACKS:
      return {
        ...state,
        tracks: payload,
      };
    case SET_SPOTIFY:
      return {
        ...state,
        spotify: payload,
      };
    default:
      return state;
  }
}

type Action = {
  type: string;
  payload: any;
};

type returnType = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setTracks: Function;
  tracks: Tracks;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSpotify: Function;
  spotify: SpotifyWebApi.SpotifyWebApiJs;
};
