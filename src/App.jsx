import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookForm from "./components/books/BookForm";
import Members from "./pages/Members";
import MemberForm from "./components/members/MemberForm";
import Borrows from "./pages/Borrows";
import BorrowForm from "./components/borrows/BorrowForm";
import ReturnBook from "./components/borrows/ReturnBook";
import Genres from "./pages/Genres";
import GenreForm from "./components/genres/GenreForm";
import Staff from "./pages/Staff";
import StaffForm from "./components/staff/StaffForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/new"
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/:id/edit"
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <Members />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members/new"
              element={
                <ProtectedRoute>
                  <MemberForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members/:id/edit"
              element={
                <ProtectedRoute>
                  <MemberForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrows"
              element={
                <ProtectedRoute>
                  <Borrows />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrows/new"
              element={
                <ProtectedRoute>
                  <BorrowForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrows/:id/return"
              element={
                <ProtectedRoute>
                  <ReturnBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genres"
              element={
                <ProtectedRoute>
                  <Genres />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genres/new"
              element={
                <ProtectedRoute>
                  <GenreForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genres/:id/edit"
              element={
                <ProtectedRoute>
                  <GenreForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute>
                  <Staff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/new"
              element={
                <ProtectedRoute>
                  <StaffForm />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
