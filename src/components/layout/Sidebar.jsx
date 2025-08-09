import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ChartBarIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowsRightLeftIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { isAdmin, isLibrarian } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-20">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Library</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <ChartBarIcon className="h-5 w-5 mr-3" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <BookOpenIcon className="h-5 w-5 mr-3" />
                  <span>Books</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/members"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <UsersIcon className="h-5 w-5 mr-3" />
                  <span>Members</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/borrows"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <ArrowsRightLeftIcon className="h-5 w-5 mr-3" />
                  <span>Borrows</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/genres"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <TagIcon className="h-5 w-5 mr-3" />
                  <span>Genres</span>
                </NavLink>
              </li>
              {(isAdmin || isLibrarian) && (
                <>
                  <li className="border-t border-gray-200 my-2"></li>
                  <li>
                    <NavLink
                      to="/staff"
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 rounded-lg ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <UserIcon className="h-5 w-5 mr-3" />
                      <span>Staff</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
