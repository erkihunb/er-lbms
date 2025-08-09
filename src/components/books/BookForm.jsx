import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getBook, createBook, updateBook } from "../../api/books";
//import { getGenres } from "../../api/genres";
import Alert from "../ui/Alert";
import Loading from "../ui/Loading";

// or if using the index file:
import { getGenres } from "../../api";
const BookForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      publishedYear: new Date().getFullYear(),
      genre: "",
      totalCopies: 1,
      shelfLocation: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      isbn: Yup.string().required("ISBN is required"),
      publishedYear: Yup.number()
        .min(1000, "Year must be after 1000")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Published year is required"),
      genre: Yup.string().required("Genre is required"),
      totalCopies: Yup.number()
        .min(1, "Must have at least 1 copy")
        .required("Total copies is required"),
      shelfLocation: Yup.string().required("Shelf location is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await updateBook(id, values);
        } else {
          await createBook(values);
        }
        navigate("/books");
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresRes = await getGenres();
        setGenres(genresRes.data.genres);

        if (isEdit) {
          const bookRes = await getBook(id);
          formik.setValues({
            title: bookRes.data.book.title,
            author: bookRes.data.book.author,
            isbn: bookRes.data.book.isbn,
            publishedYear: bookRes.data.book.publishedYear,
            genre: bookRes.data.book.genre._id,
            totalCopies: bookRes.data.book.totalCopies,
            shelfLocation: bookRes.data.book.shelfLocation,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "Edit Book" : "Add New Book"}
      </h2>
      {error && <Alert type="error" message={error} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`w-full px-3 py-2 border ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className={`w-full px-3 py-2 border ${
                formik.touched.author && formik.errors.author
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.author && formik.errors.author && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.author}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              className={`w-full px-3 py-2 border ${
                formik.touched.isbn && formik.errors.isbn
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.isbn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.isbn && formik.errors.isbn && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.isbn}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="publishedYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Published Year
            </label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              className={`w-full px-3 py-2 border ${
                formik.touched.publishedYear && formik.errors.publishedYear
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.publishedYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.publishedYear && formik.errors.publishedYear && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.publishedYear}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              className={`w-full px-3 py-2 border ${
                formik.touched.genre && formik.errors.genre
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.genre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {formik.touched.genre && formik.errors.genre && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.genre}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="totalCopies"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Total Copies
            </label>
            <input
              type="number"
              id="totalCopies"
              name="totalCopies"
              min="1"
              className={`w-full px-3 py-2 border ${
                formik.touched.totalCopies && formik.errors.totalCopies
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.totalCopies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.totalCopies && formik.errors.totalCopies && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.totalCopies}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="shelfLocation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shelf Location
            </label>
            <input
              type="text"
              id="shelfLocation"
              name="shelfLocation"
              className={`w-full px-3 py-2 border ${
                formik.touched.shelfLocation && formik.errors.shelfLocation
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={formik.values.shelfLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.shelfLocation && formik.errors.shelfLocation && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.shelfLocation}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEdit ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
