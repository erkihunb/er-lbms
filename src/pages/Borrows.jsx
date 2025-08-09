import { useState, useEffect } from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import BorrowList from "../components/borrows/BorrowList";
import { getBorrows } from "../api/borrows";
import SearchBar from "../components/ui/SearchBar";

const Borrows = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate(""); // Ensure you import useNavigate from react-router-dom

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const params = { status: filter };
        if (searchTerm) params.search = searchTerm;
        const { data } = await getBorrows(params);
        setBorrows(data.borrows);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrows();
  }, [searchTerm, filter]);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Borrows</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/borrows/new")}
            >
              New Borrow
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <SearchBar
              placeholder="Search borrows..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <BorrowList borrows={borrows} loading={loading} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Borrows; // This is the crucial default export
