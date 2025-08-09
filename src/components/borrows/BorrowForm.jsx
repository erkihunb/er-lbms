import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getBooks } from "../../api/books";
import { getMembers } from "../../api/members";
import { createBorrow } from "../../api/borrows";
import Alert from "../ui/Alert";
import Loading from "../ui/Loading";

const BorrowForm = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      book: "",
      member: "",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    validationSchema: Yup.object({
      book: Yup.string().required("Book is required"),
      member: Yup.string().required("Member is required"),
      dueDate: Yup.date()
        .min(new Date(), "Due date must be in the future")
        .required("Due date is required"),
    }),
    onSubmit: async (values) => {
      try {
        await createBorrow(values);
        navigate("/borrows");
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, membersRes] = await Promise.all([
          getBooks({ available: true }),
          getMembers(),
        ]);
        setBooks(booksRes.data.books);
        setMembers(membersRes.data.members);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Borrow Book
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Book</InputLabel>
                <Select
                  name="book"
                  value={formik.values.book}
                  onChange={formik.handleChange}
                  error={formik.touched.book && Boolean(formik.errors.book)}
                >
                  {books.map((book) => (
                    <MenuItem key={book._id} value={book._id}>
                      {book.title} by {book.author} (Available:{" "}
                      {book.availableCopies})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.book && formik.errors.book && (
                  <FormHelperText error>{formik.errors.book}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Member</InputLabel>
                <Select
                  name="member"
                  value={formik.values.member}
                  onChange={formik.handleChange}
                  error={formik.touched.member && Boolean(formik.errors.member)}
                >
                  {members.map((member) => (
                    <MenuItem key={member._id} value={member._id}>
                      {member.name} ({member.email})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.member && formik.errors.member && (
                  <FormHelperText error>{formik.errors.member}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={formik.values.dueDate}
                  onChange={(value) => formik.setFieldValue("dueDate", value)}
                  minDate={new Date()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={
                        formik.touched.dueDate && Boolean(formik.errors.dueDate)
                      }
                      helperText={
                        formik.touched.dueDate && formik.errors.dueDate
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/borrows")}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Process Borrow
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default BorrowForm;
