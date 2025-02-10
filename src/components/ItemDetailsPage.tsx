import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import AddToCollectionButton from "./AddToCollectionButton"; // Adjust path as needed
import CircularProgress from "@mui/material/CircularProgress";
import { ItemDetail } from "../types";

function renderDimensions(dimensions: ItemDetail["dimensions"]) {
  if (!dimensions) return null;

  if (typeof dimensions === "string") {
    return <span>{dimensions}</span>;
  }

  return (
    <div>
      {dimensions.framed && (
        <div>
          <strong>Framed:</strong>{" "}
          {dimensions.framed.height && `Height: ${dimensions.framed.height} `}
          {dimensions.framed.width && `Width: ${dimensions.framed.width} `}
          {dimensions.framed.depth && `Depth: ${dimensions.framed.depth}`}
        </div>
      )}
      {dimensions.unframed && (
        <div>
          <strong>Unframed:</strong>{" "}
          {dimensions.unframed.height &&
            `Height: ${dimensions.unframed.height} `}
          {dimensions.unframed.width && `Width: ${dimensions.unframed.width} `}
          {dimensions.unframed.depth && `Depth: ${dimensions.unframed.depth}`}
        </div>
      )}
    </div>
  );
}

const fullToShortMap: Record<string, string> = {
  Art_Institute_of_Chicago: "artInstitute",
  Cleveland_Museum_of_Arts: "clevelandMuseum",
};

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();

  // if id is "Art_Institute_of_Chicago-123", changes it to "artInstitute-123"
  let transformedId = id;
  if (id) {
    var parts = id.split("-");
    if (parts.length >= 2) {
      var sourceFull = parts[0]; // e.g., "Art_Institute_of_Chicago"
      var externalId = parts.slice(1).join("-"); // in case the external id has dashes
      var sourceShort = fullToShortMap[sourceFull] || sourceFull;
      transformedId = sourceShort + "-" + externalId;
    }
  }

  const [artwork, setArtwork] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function fetchArtworkDetails() {
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/items/" +
          transformedId
      )
      .then(function (response) {
        setArtwork(response.data.artwork);
        setLoading(false);
      })
      .catch(function (err) {
        console.error(
          "Error fetching artwork details:",
          err.response || err.message || err
        );
        setError("Error fetching artwork details");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchArtworkDetails();
  }, [transformedId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", minHeight: "200px" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!artwork) {
    return <h1>No artwork found.</h1>;
  }

  var descriptionContent = artwork.description
    ? parse(artwork.description)
    : null;

  return (
    <div className="container my-4">
      <h1>{artwork.item_title}</h1>
      <p>
        <strong>Artist:</strong> {artwork.artist}
      </p>
      <img
        src={artwork.image_url}
        alt={artwork.item_title}
        style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
      />
      <p>
        <strong>Created At:</strong> {artwork.item_created_at}
      </p>
      {artwork.description && (
        <div>
          <strong>Description:</strong>
          <div className="artwork-description">{descriptionContent}</div>
        </div>
      )}
      {artwork.medium && (
        <p>
          <strong>Medium:</strong> {artwork.medium}
        </p>
      )}
      {artwork.dimensions && (
        <div>
          <strong>Dimensions:</strong> {renderDimensions(artwork.dimensions)}
        </div>
      )}
      <br />
      <AddToCollectionButton
        artwork={{
          external_id: artwork.external_id,
          api_source: artwork.api_source,
          item_title: artwork.item_title,
          artist: artwork.artist,
          image_url: artwork.image_url,
          item_created_at: artwork.item_created_at,
        }}
      />
    </div>
  );
}

export default ItemDetailPage;
