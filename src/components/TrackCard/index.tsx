import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./styles.scss";


export default function TrackCard({ imageUrl, artistName, trackName }: props) {
  return (
    <div className="track">
        <Card className="miu-card">
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={imageUrl}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h6" className="track-title">
                {trackName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {artistName}
              </Typography>
            </CardContent>
          </Box>
        </Card>
    </div>
  );
}

type props = {
  imageUrl: string;
  trackName: string;
  artistName: string;
  releaseDate?: string;
  type?: string;
  videoId?: string;
};
