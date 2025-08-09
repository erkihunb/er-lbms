import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../components/books/BookList";
import { getBooks, deleteBook } from "../api/books";
import SearchBar from "../components/ui/SearchBar";
import { PlusIcon } from "@heroicons/react/24/outline";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = searchTerm ? { search: searchTerm } : {};
        const { data } = await getBooks(params);
        setBooks(data.books);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Books</h1>
        <button
          onClick={() => navigate("/books/new")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Book
        </button>
      </div>

      <div className="mb-4">
        <SearchBar
          placeholder="Search books..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <BookList books={books} loading={loading} onDelete={handleDelete} />
    </div>
  );
};

export default Books;
