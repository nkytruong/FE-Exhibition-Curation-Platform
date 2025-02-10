export interface Collection {
    collection_id: string;
    user_id: number;
    collection_name: string;
    created_at: string;
    updated_at: string
  }

  export interface CollectionItem {
    id: number;
    collection_id: string;
    external_id: number;
    api_source: "artInstitute" | "clevelandMuseum";
    item_title: string;
    artist: string;
    image_url: string;
    item_created_at: string;
    added_at: string;
  }

  export interface CollectionOption {
    collection_id: string;
    collection_name: string;
    exists: boolean;
  }

  export interface AddToCollectionProps {
    artwork: {
      external_id: number;
      api_source: "artInstitute" | "clevelandMuseum";
      item_title: string;
      artist: string;
      image_url?: string;
      item_created_at: string;
    };
  }

  export interface Artwork {
    external_id: number;
    api_source: "artInstitute" | "clevelandMuseum";
    item_title: string;
    artist: string;
    image_url: string;
    item_created_at: string;
  }

  export interface MetaData {
    totalArtworks: number;
    totalPages: number;
    currentPage: number;
    artworksPerPage: number;
  }

  export interface BrowseAllPageProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface ItemDetail {
    external_id: number;
    api_source: "artInstitute" | "clevelandMuseum";
    item_title: string;
    artist: string;
    image_url: string;
    item_created_at: string;
    description?: string;
    medium?: string;
    dimensions?:
      | string
      | {
          framed?: { height?: number; width?: number; depth?: number };
          unframed?: { height?: number; width?: number; depth?: number };
        };
  }
  
  export interface SavedItemCardProps {
    image_url?: string;
    item_title: string;
    artist: string;
    item_created_at: string;
    onDelete: () => void;
  }