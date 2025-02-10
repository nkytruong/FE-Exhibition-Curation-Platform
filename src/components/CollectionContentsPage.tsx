import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SavedItemCard from "./SavedItemCard";
import { Collection, CollectionItem } from "../types";
import CircularProgress from "@mui/material/CircularProgress";

function CollectionContentsPage() {
  const { collection_id } = useParams<{ collection_id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function fetchCollectionDetails() {
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/userCollections/" +
          collection_id,
        { withCredentials: true }
      )
      .then((response) => {
        setCollection(response.data.collection);
      })
      .catch((err) => {
        console.error(
          "Error fetching collection details:",
          err.response || err.message || err
        );
        setError("Error fetching collection details");
      });
  }

  function fetchCollectionItems() {
    axios
      .get(
        "https://be-exhibition-curation-platform.onrender.com/api/collectionItems/" +
          collection_id,
        { withCredentials: true }
      )
      .then((response) => {
        setItems(response.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching collection items:",
          err.response || err.message || err
        );
        setError("Error fetching collection items");
        setLoading(false);
      });
  }

  function handleDeleteItem(item: any) {
    axios
      .delete(
        "https://be-exhibition-curation-platform.onrender.com/api/collectionItems/" +
          collection_id,
        {
          data: {
            external_id: item.external_id,
            api_source: item.api_source,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setItems((prevItems) => {
          return prevItems.filter((prevItem) => {
            return prevItem.id !== item.id;
          });
        });
      })
      .catch((err) => {
        console.error(
          "Error deleting item from collection:",
          err.response || err.message || err
        );
        setError("Error deleting item from collection");
      });
  }

  useEffect(() => {
    fetchCollectionDetails();
    fetchCollectionItems();
  }, [collection_id]);

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

  if (!collection) {
    return <div>No collection found.</div>;
  }

  return (
    <div className="container my-4">
      <h1>{collection.collection_name}</h1>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(collection.created_at).toLocaleString()}
      </p>
      <Link to="/my-account">
        <button className="btn btn-secondary mb-3">
          Back to My Collections
        </button>
      </Link>
      <h2>Artworks in this Collection</h2>
      {items.length === 0 ? (
        <p>No artworks in this collection.</p>
      ) : (
        <div className="row">
          {items.map(function (item) {
            return (
              <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-3">
                <Link
                  to={`/artwork/${item.api_source}-${item.external_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <SavedItemCard
                    image_url={item.image_url}
                    item_title={item.item_title}
                    artist={item.artist}
                    item_created_at={item.item_created_at}
                    onDelete={function () {
                      handleDeleteItem(item);
                    }}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CollectionContentsPage;
