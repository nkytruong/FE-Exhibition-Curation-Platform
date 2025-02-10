import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Collapse } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CollectionOption, AddToCollectionProps } from "../types";

function AddToCollectionButton(props: AddToCollectionProps) {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState<CollectionOption[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [error, setError] = useState("");

  function fetchCollections() {
    setLoadingCollections(true);
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/userCollections",
        { withCredentials: true }
      )
      .then(function (response) {
        const rawCollections = response.data.collections;
        Promise.all(
          rawCollections.map(function (col: any) {
            return axios
              .get(
                "https://be-exhibition-curation-platform.onrender.com/api/collectionItems/" +
                  col.collection_id,
                { withCredentials: true }
              )
              .then(function (res) {
                const exists = res.data.items.some(function (item: any) {
                  return (
                    item.external_id === props.artwork.external_id &&
                    item.api_source === props.artwork.api_source
                  );
                });
                return {
                  collection_id: col.collection_id,
                  collection_name: col.collection_name,
                  exists: exists,
                };
              })
              .catch(function (err) {
                console.error(
                  "Error checking collection",
                  col.collection_id,
                  err.response || err.message || err
                );
                return {
                  collection_id: col.collection_id,
                  collection_name: col.collection_name,
                  exists: false,
                };
              });
          })
        )
          .then((results) => {
            setCollections(results);
            setLoadingCollections(false);
          })
          .catch((err) => {
            console.error("Error processing collections:", err);
            setError("Error processing collections");
            setLoadingCollections(false);
          });
      })
      .catch((err) => {
        console.error(
          "Error fetching collections:",
          err.response || err.message || err
        );
        setError("Error fetching collections");
        setLoadingCollections(false);
      });
  }

  function toggleOpen() {
    setOpen(function (prev) {
      return !prev;
    });
    if (!open) {
      fetchCollections();
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedCollection(e.target.checked ? e.target.value : "");
  }

  function handleConfirm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedCollection) {
      setError("Please select a collection.");
      return;
    }
    const payload = {
      collection_id: selectedCollection,
      external_id: props.artwork.external_id,
      api_source: props.artwork.api_source,
      item_title: props.artwork.item_title,
      artist: props.artwork.artist,
      image_url: props.artwork.image_url || "",
      item_created_at: props.artwork.item_created_at,
    };

    axios
      .post(
        "https://be-exhibition-curation-platform.onrender.com/api/collectionItems",
        payload,
        { withCredentials: true }
      )
      .then(function (response) {
        setOpen(false);
      })
      .catch(function (err) {
        console.error(
          "Error adding artwork to collection:",
          err.response ? err.response.data : err.message
        );
        setError("Error adding artwork to collection");
      });
  }

  return (
    <div>
      <Button variant="primary" onClick={toggleOpen}>
        Add to Collection
      </Button>
      <Collapse in={open}>
        <div
          style={{
            marginTop: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {loadingCollections ? (
            <div>Loading collections...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : (
            <Form>
              {collections.map(function (col) {
                return (
                  <FormControlLabel
                    key={col.collection_id}
                    control={
                      <Checkbox
                        color="secondary"
                        value={col.collection_id}
                        onChange={handleCheckboxChange}
                        disabled={col.exists}
                        checked={selectedCollection === col.collection_id}
                      />
                    }
                    label={col.collection_name}
                    style={{ color: col.exists ? "grey" : "inherit" }}
                  />
                );
              })}
              <Button
                variant="primary"
                onClick={handleConfirm}
                className="mt-2"
              >
                Confirm
              </Button>
            </Form>
          )}
        </div>
      </Collapse>
    </div>
  );
}

export default AddToCollectionButton;
