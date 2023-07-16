import AppContext, { AppState } from "./AppContext";
import { useReducer } from "react";
import AppReducer from "./AppReducer";
import { SET_SPOTIFY, SET_TRACKS } from "./types";
import { Tracks } from "./interface";

const AppRealState = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, AppState);

  const setTracks = (payload: Tracks) =>
    dispatch({
      type: SET_TRACKS,
      payload,
    });

  const setSpotify = (payload: any) =>
    dispatch({
      type: SET_SPOTIFY,
      payload,
    });

  return (
    <AppContext.Provider
      value={{
        tracks: state.tracks,
        setTracks,
        spotify: state.spotify,
        setSpotify,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppRealState;

type Props = {
  children: JSX.Element;
};
