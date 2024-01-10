import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useBlogContext } from "../components/blogContext";
import { useRouter } from "next/router";

export default function MediaCard({ tittle, descreption, maxWords = 30, blogId }) {
  const router = useRouter();
  const { setBlog } = useBlogContext();
  const truncateDescription = (text) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const handleReadMoreClick = () => {
    setBlog({ tittle, descreption, blogId });
    router.push('/blogpage');
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 1, height: "fit-content" }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tittle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateDescription(descreption)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleReadMoreClick}>
          Read More
        </Button>
        <Button size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
