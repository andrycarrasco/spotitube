import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TrackCard from "../TrackCard";
import { useContext, useState } from "react";
import { getTracksByPlayListId, handleTracksByPlayListId } from "../../views/migrator/resource";
import "./styles.scss";
// import { Container } from "@mui/material";
import AppContext, { AppState } from "../../context/App/AppContext";

export default function PlayListCard({
  imageUrl,
  playlistName,
  spotify,
  id,
  toggleOpenModal,
  totalTracks,
}: props) {
  const { tracks, setTracks } = useContext<AppState>(AppContext);
  // const [tracks, setTracks] = useState<any>(null);
  const [showTracks, setShowTracks] = useState<boolean>(false);
  const toggleShowTracks = () => setShowTracks(!showTracks);

  const handleTracks = async () => {
    // handleTracksByPlayListId(spotify, id, setTracks, toggleShowTracks);
    await getTracksByPlayListId(id, totalTracks, setTracks, toggleShowTracks);
    toggleOpenModal();
  };
  return (
    <>
      <div className="card card-playlist">
        <Card
          sx={{ display: "flex" }}
          onClick={() => handleTracks()}
          // className="card-playlist"
          raised={true}
        >
          {imageUrl && (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={imageUrl}
              alt="Live from space album cover"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {playlistName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Tracks: {totalTracks}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </div>
      {/* {showTracks && (
        <div className="card-tracks">
          <Typography variant="h6">
            {tracks ? tracks.total : 0} tracks in this playlist:
          </Typography>
          {tracks &&
            tracks.items.map((track: any) => {
              return (
                <TrackCard
                  imageUrl={track.track.album.images[1].url}
                  trackName={track.track.name}
                  artistName={track.track.artists
                    .map((artist: any) => artist.name)
                    .join(", ")}
                  releaseDate={track.track.album.release_date}
                  type={track.track.album.album_type}
                  key={track.id}
                />
              );
            })}
        </div>
      )} */}
    </>
  );
}

type props = {
  imageUrl: string;
  playlistName: string;
  tracks?: any;
  spotify: any;
  id: string;
  openModal?: boolean;
  toggleOpenModal: () => void;
  totalTracks?: number;
};
