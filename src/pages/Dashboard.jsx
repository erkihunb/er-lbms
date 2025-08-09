import { useEffect, useState } from "react";
import StatsCard from "../components/layout/StatsCard";
import BookStatsChart from "../components/books/BookStatsChart";
import { getBookStats } from "../api/books";
import { getBorrowStats } from "../api/borrows";
import { getMemberStats } from "../api/members";

const Dashboard = () => {
  const [stats, setStats] = useState({
    books: { totalBooks: 0, totalCopies: 0, availableCopies: 0 },
    borrows: { active: 0, overdue: 0 },
    members: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [books, borrows, members] = await Promise.all([
          getBookStats(),
          getBorrowStats(),
          getMemberStats(),
        ]);
        setStats({
          books: books.data.stats,
          borrows: borrows.data.stats,
          members: members.data.totalMembers,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Books"
          value={stats.books.totalBooks}
          icon="book"
          color="blue"
        />
        {/* Other StatsCards */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Books Statistics
        </h2>
        <BookStatsChart />
      </div>
    </div>
  );
};

export default Dashboard;
