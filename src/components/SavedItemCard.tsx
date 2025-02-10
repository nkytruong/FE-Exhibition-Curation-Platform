import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemCard from "./ItemCard";
import { SavedItemCardProps } from "../types";

function SavedItemCard(props: SavedItemCardProps) {
  function handleDeleteClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    e.preventDefault();
    props.onDelete();
  }

  return (
    <div style={{ position: "relative" }}>
      <ItemCard
        image_url={props.image_url}
        item_title={props.item_title}
        artist={props.artist}
        item_created_at={props.item_created_at}
      />
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteClick}
        style={{
          position: "absolute",
          bottom: "60px",
          right: "10px",
          background: "#fff",
          zIndex: 2,
        }}
      >
        Remove
      </Button>
    </div>
  );
}

export default SavedItemCard;
