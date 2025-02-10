import React from "react";
import Card from "react-bootstrap/Card";

interface ItemCardProps {
  image_url?: string;
  item_title: string;
  artist: string;
  item_created_at: string;
}

const cardStyle: React.CSSProperties = {
  width: "300px",
  height: "450px",
  overflow: "hidden",
  margin: "0 auto",
};

const imageContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "200px",
  backgroundColor: "#ccc",
  overflow: "hidden",
  position: "relative",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const placeholderStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "1.2rem",
  fontWeight: "bold",
  textAlign: "center",
};

const cardBodyStyle: React.CSSProperties = {
  height: "150px",
  overflow: "hidden",
  padding: "0.75rem",
};

const cardTitleStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  marginBottom: "0.5rem",
};

const cardTextStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const cardFooterStyle: React.CSSProperties = {
  height: "50px",
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
};

const ItemCard: React.FC<ItemCardProps> = ({
  image_url,
  item_title,
  artist,
  item_created_at,
}) => {
  return (
    <Card style={cardStyle}>
      <div style={imageContainerStyle}>
        {image_url ? (
          <img src={image_url} alt={item_title} style={imageStyle} />
        ) : (
          <div style={placeholderStyle}>Image Unavailable</div>
        )}
      </div>
      <Card.Body style={cardBodyStyle}>
        <Card.Title style={cardTitleStyle}>{item_title}</Card.Title>
        <Card.Text style={cardTextStyle}>{artist}</Card.Text>
      </Card.Body>
      <Card.Footer style={cardFooterStyle}>
        <small className="text-muted">{item_created_at}</small>
      </Card.Footer>
    </Card>
  );
};

export default ItemCard;
