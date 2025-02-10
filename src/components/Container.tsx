import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./LoginPage";
import MyAccountPage from "./MyAccountPage";
import BrowseAllPage from "./BrowseAllPage";
import ItemDetailPage from "./ItemDetailsPage";
import SearchResultsPage from "./SearchResultsPage";
import CollectionContentsPage from "./CollectionContentsPage";
import { useState } from "react";

function Container() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccountPage />} />
        <Route
          path="/browse"
          element={
            <BrowseAllPage isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/browse/:source"
          element={
            <BrowseAllPage isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route path="/artwork/:id" element={<ItemDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route
          path="/collections/:collection_id"
          element={<CollectionContentsPage />}
        />
      </Routes>
    </div>
  );
}

export default Container;
