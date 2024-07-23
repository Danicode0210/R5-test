export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publisher?: string;
      publishedDate?: string;
      description?: string;
      [key: string]: any; 
    };
    saleInfo?: {
      listPrice?: {
        amount: number;
        currencyCode: string;
      };
      retailPrice?: {
        amount: number;
        currencyCode: string;
      };
    };
  }
  
  export interface BookListProps {
    books: Book[];
    showDetails?: boolean;
    showFavorites?: boolean;
    onBookClick?: (bookId: string) => void;
  }
  
  export interface BookDetailProps {
    book: Book; 
  }
  
  export interface SearchInputProps {
    onSearch: (query: string) => void;
  }
  