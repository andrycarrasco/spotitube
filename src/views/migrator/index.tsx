import { Button, Input, Modal, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AppContext, { AppState } from "../../context/App/AppContext";
import PlayListCard from "../../components/PlayListCard";
import SpotifyWebApi from "spotify-web-api-js";
import TrackCard from "../../components/TrackCard";
import "./styles.scss";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  createPlaylist,
  insertTrackToPlaylist,
  searchTrack,
} from "../../services/youtubeLoginService";
import { ArrowRight } from "@mui/icons-material";
import { ModalTracksContent } from "../../components/ModalTracksContent";

const spotify = new SpotifyWebApi();
const rootYoutubeurl = "https://www.youtube.com/embed/";

export const Migrator = () => {
  const { tracks, setTracks } = useContext<AppState>(AppContext);
  const [playlists, setPlaylists] = useState<any>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const [youtubeTracks, setYoutubeTracks] = useState<any>(null);
  const [createPlaylistData, setCreatePlaylistData] = useState<any>({
    title: "",
    description: "",
  });

  const toggleOpenModal = () => setOpenModal(!openModal);

  useEffect(() => {
    handleViewPlaylists();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevSeconds) => {
        return prevSeconds > 0 ? prevSeconds - 1 : 0;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // document.title = `${time} seconds left`;
    // change page icon
    // const favicon = document.getElementById("favicon") as HTMLLinkElement;
  }, [time]);

  const handleViewPlaylists = async () => {
    try {
      spotify.setAccessToken(
        sessionStorage.getItem("spotify_access_token") || ""
      );
      const playlist = await spotify.getUserPlaylists();
      setPlaylists(playlist);
    } catch (error: any) {
      if (error.status === 401) {
        sessionStorage.removeItem("spotify_access_token");
        window.location.href = "/";
      }
    }
  };

  const handleCreatePlaylist = async () => {
    const playlist = await createPlaylist(createPlaylistData);
    console.log(playlist.id);

    for (const track of youtubeTracks) {
      await insertTrackToPlaylist(playlist.id, track.youtube.id.videoId);
    }
    setCreatePlaylistData({ title: "", description: "" });
  };

  const handleSearchTracks = async () => {
    const tracksSearch = tracks.items.map((track: any) => ({
      title: track.track.name,
      artist: track.track.artists.map((artist: any) => artist.name).join(", "),
      id: track.track.id,
    }));
    // tracksSearch.length = 0;
    console.log(tracksSearch);
    const ytTracks = tracksSearch.map(async (track: any) => {
      const resp = await searchTrack(track);
      return resp;
    });
    // resolve the promise
    Promise.all(ytTracks).then((values) => {
      setYoutubeTracks(values);
    });

    // console.log(tracksSearch);
  };
  const findYouTubeHomologation = (spotifyId: string) => {
    return youtubeTracks.find((track: any) => track.spotify === spotifyId)
      ?.youtube;
  };
  // check object values are empty
  const isEmpty = (obj: any) =>
    Object.values(obj).every((x: any) => x.trim() === null || x.trim() === "");

  // console.log(youtubeTracks);
  return (
    <div className="migrator">
      <Modal
        open={openModal}
        onClose={toggleOpenModal}
        className="modal-container"
      >
        <ModalTracksContent
          createPlaylistData={createPlaylistData}
          findYouTubeHomologation={findYouTubeHomologation}
          handleCreatePlaylist={handleCreatePlaylist}
          handleSearchTracks={handleSearchTracks}
          toggleOpenModal={toggleOpenModal}
          setCreatePlaylistData={setCreatePlaylistData}
          setYoutubeTracks={setYoutubeTracks}
          youtubeTracks={youtubeTracks}
        />
      </Modal>
      <div className="search">
        <Input type="" placeholder="Search for a playlist" />
        <Button size="medium" onClick={() => handleViewPlaylists()}>
          Search playlist
        </Button>
        <Link to="/">
          <Button size="medium">Home</Button>
        </Link>

        {/* <div className="create-yt-playlist">
          <Input
            type=""
            placeholder="Playlist name"
            value={createPlaylistData.title}
            onChange={(e) =>
              setCreatePlaylistData({
                ...createPlaylistData,
                title: e.target.value,
              })
            }
          />
          <Input
            type=""
            placeholder="Playlist description"
            value={createPlaylistData.description}
            onChange={(e) =>
              setCreatePlaylistData({
                ...createPlaylistData,
                description: e.target.value,
              })
            }
          />
          <Button
            disabled={isEmpty(createPlaylistData)}
            size="medium"
            onClick={handleCreatePlaylist}
          >
            Crear playlist
          </Button>
        </div> */}

        <div className="create-yt-playlist">
          {/* <Input
            type=""
            placeholder="Track name"
            value={trackData.title}
            onChange={(e) =>
              setCreatePlaylistData({
                ...trackData,
                title: e.target.value,
              })
            }
          />
          <Input
            type=""
            placeholder="Artist name"
            value={trackData.description}
            onChange={(e) =>
              setCreatePlaylistData({
                ...trackData,
                description: e.target.value,
              })
            }
          /> */}
          {/* <Button
            disabled={isEmpty(createPlaylistData)}
            size="medium"
            onClick={handleCreatePlaylist}
          >
            Buscar tracks
          </Button> */}
        </div>
      </div>
      {playlists && (
        <div className="playlists-container">
          <Typography variant="h4">
            {playlists.total} playlists found:
          </Typography>
          {playlists && (
            <div className="playlists">
              {playlists.items?.map((playlist: any) => (
                <PlayListCard
                  spotify={spotify}
                  imageUrl={playlist?.images[0]?.url || null}
                  playlistName={playlist.name}
                  id={playlist.id}
                  key={playlist.id}
                  openModal={openModal}
                  toggleOpenModal={toggleOpenModal}
                  totalTracks={playlist.tracks.total}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
