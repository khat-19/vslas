import { useAuth } from "../context/AuthContext";

export function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="main-navigation bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-bold">VSLA System</h1>
            </div>
          </div>
          {user && (
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">{user.email}</span>
              <button
                onClick={logout}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
