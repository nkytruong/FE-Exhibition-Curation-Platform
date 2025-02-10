// BrowseAllPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemCard from "./ItemCard";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Artwork, MetaData } from "../types";
import { BrowseAllPageProps } from "../types";

const urlToBackendSource: Record<string, string> = {
  art_institute_of_chicago: "artInstitute",
  cleveland_museum_of_art: "clevelandMuseum",
};

const urlToDisplayName: Record<string, string> = {
  art_institute_of_chicago: "Art Institute of Chicago",
  cleveland_museum_of_art: "Cleveland Museum of Art",
};

function BrowseAllPage({isLoading, setIsLoading}: BrowseAllPageProps) {
  const { source } = useParams<{ source?: string }>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  let backendSource = "";

  if (source) {
    backendSource = urlToBackendSource[source];
  }

  function fetchArtworks() {
    setIsLoading(true);
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/items/search",
        {
          params: { q: "", page: currentPage, source: backendSource },
        }
      )
      .then((response) => {
        setArtworks(response.data.artworks);
        setMeta(response.data.meta);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching artworks:",
          err.response || err.message || err
        );
        setError("Error fetching artworks");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setCurrentPage(1);
    fetchArtworks();
  }, [source]);

  useEffect(() => {
    fetchArtworks();
  }, [currentPage]);

  if (error) {
    return <div>{error}</div>;
  }

  let headerTitle = "Browse All Artworks";
  if (source && urlToDisplayName[source]) {
    headerTitle = `Artwork from ${urlToDisplayName[source]}`;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">{headerTitle}</h1>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Row>
          {artworks.map((artwork) => (
            <Col
              key={`${artwork.api_source}-${artwork.external_id}`}
              xs={12}
              md={6}
              lg={4}
              className="mb-4"
            >
              <Link
                to={`/artwork/${artwork.api_source}-${artwork.external_id}`} // Use your desired format here
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ItemCard
                  image_url={artwork.image_url}
                  item_title={artwork.item_title}
                  artist={artwork.artist}
                  item_created_at={artwork.item_created_at}
                />
              </Link>
            </Col>
          ))}
        </Row>
      )}
      <div className="d-flex justify-content-center my-4">
        {meta && meta.totalPages > 1 && (
          <Pagination
            count={meta.totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            color="secondary"
          />
        )}
      </div>
    </div>
  );
}

export default BrowseAllPage;
