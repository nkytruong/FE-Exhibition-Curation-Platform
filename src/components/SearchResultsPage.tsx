import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemCard from "./ItemCard"; 
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Artwork, MetaData } from "../types";

const urlToBackendSource: Record<string, string> = {
  art_institute_of_chicago: "artInstitute",
  cleveland_museum_of_art: "clevelandMuseum",
};

const urlToDisplayName: Record<string, string> = {
  art_institute_of_chicago: "Art Institute of Chicago",
  cleveland_museum_of_art: "Cleveland Museum of Art",
};

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const sourceParam = searchParams.get("source") || "";

  const backendSource = sourceParam
    ? urlToBackendSource[sourceParam] || ""
    : "";

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchArtworks = () => {
    setLoading(true);
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/items/search",
        {
          params: { q: query, page: currentPage, source: backendSource },
        }
      )
      .then((response) => {
        setArtworks(response.data.artworks);
        setMeta(response.data.meta);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching artworks:",
          err.response || err.message || err
        );
        setError("Error fetching artworks");
        setLoading(false);
      });
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchArtworks();
  }, [query, sourceParam]);

  useEffect(() => {
    fetchArtworks();
  }, [currentPage]);

  let headerTitle = `Search Results for: "${query}"`;
  if (sourceParam && urlToDisplayName[sourceParam]) {
    headerTitle = `Search Results for: "${query}" in ${urlToDisplayName[sourceParam]}`;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">{headerTitle}</h1>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : error ? (
        <div>{error}</div>
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
                to={`/artwork/${artwork.api_source}-${artwork.external_id}`}
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
};

export default SearchResultsPage;
