import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";
import { getBorrow, returnBorrow } from "../../api/borrows";

const ReturnBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [borrow, setBorrow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBorrow = async () => {
      try {
        const { data } = await getBorrow(id);
        setBorrow(data.borrow);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBorrow();
  }, [id]);

  const handleReturn = async () => {
    try {
      await returnBorrow(id);
      setSuccess("Book returned successfully");
      setTimeout(() => navigate("/borrows"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <LinearProgress />;

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Return Book
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        {borrow && (
          <>
            <Typography variant="body1" gutterBottom>
              <strong>Book:</strong> {borrow.book.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Member:</strong> {borrow.member.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Borrowed Date:</strong>{" "}
              {new Date(borrow.borrowDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Due Date:</strong>{" "}
              {new Date(borrow.dueDate).toLocaleDateString()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button variant="outlined" onClick={() => navigate("/borrows")}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReturn}
              >
                Confirm Return
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ReturnBook;
