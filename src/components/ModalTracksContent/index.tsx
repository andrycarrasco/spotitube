import { Button, Input, Typography } from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AppContext, { AppState } from "../../context/App/AppContext";
import TrackCard from "../TrackCard";
import { ArrowRight } from "@mui/icons-material";

const rootYoutubeurl = "https://www.youtube.com/embed/";

const isEmpty = (obj: any) =>
  Object.values(obj).every((x: any) => x.trim() === null || x.trim() === "");

export const ModalTracksContent = ({
  youtubeTracks,
  createPlaylistData,
  toggleOpenModal,
  setYoutubeTracks,
  handleSearchTracks,
  handleCreatePlaylist,
  findYouTubeHomologation,
  setCreatePlaylistData,
}: Props) => {
  const { tracks, setTracks } = useContext<AppState>(AppContext);

  return (
    <>
      {tracks && (
        <div className="card-tracks-container">
          <div className="modal-header">
            <Typography variant="h4">
              {tracks ? tracks.total : 0} tracks in this playlist
            </Typography>
            <CloseIcon
              fontSize="large"
              onClick={() => {
                toggleOpenModal();
                setTracks(null);
                setYoutubeTracks(null);
              }}
              style={{ height: "100%", display: "list-item" }}
            />
          </div>
          <div className="action-zone">
            <Button
              style={{ justifyContent: "flex-start" }}
              size="medium"
              onClick={handleSearchTracks}
            >
              Buscar tracks
            </Button>
            <div className="create-playlist-form">
              <div className="create-yt-playlist">
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
                  Insert into yt playlist
                </Button>
              </div>
            </div>
          </div>

          <div className="card-tracks">
            {tracks &&
              tracks.items
                ?.filter((track: any) => track?.track !== null)
                .map((track: any) => {
                  return (
                    <div className="homologations">
                      <TrackCard
                        imageUrl={track?.track?.album.images[1].url}
                        trackName={track?.track?.name}
                        artistName={track?.track?.artists
                          .map((artist: any) => artist.name)
                          .join(", ")}
                        releaseDate={track?.track?.album?.release_date}
                        type={track?.track?.album?.album_type}
                        key={track?.track.id}
                      />
                      {youtubeTracks && (
                        <div className="arrow-icon">
                          <ArrowRight fontSize="large" />
                        </div>
                      )}
                      {youtubeTracks &&
                        findYouTubeHomologation(track?.track.id) && (
                          <div className="track-homologate">
                            <iframe
                              width="300"
                              height="168"
                              src={rootYoutubeurl.concat(
                                findYouTubeHomologation(track?.track?.id)?.id
                                  ?.videoId
                              )}
                              title={
                                findYouTubeHomologation(track?.track?.id)
                                  ?.snippet?.title
                              }
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              // allowfullscreen
                            ></iframe>
                          </div>
                        )}
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
};

type Props = {
  toggleOpenModal: () => void;
  setYoutubeTracks: (tracks: any) => void;
  handleSearchTracks: () => void;
  findYouTubeHomologation: (id: string) => any;
  setCreatePlaylistData: (data: any) => void;
  createPlaylistData: any;
  handleCreatePlaylist: () => void;
  youtubeTracks: any;
};
