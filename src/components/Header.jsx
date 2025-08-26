import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/api";
import { useEffect, useRef, useState } from "react";
import { subscribeNotifications } from "../utils/notifyBus";
import { fetchNotifications } from "../utils/api";

export const Header = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const popoverRef = useRef(null);

  useEffect(() => {
    function onChange() {
      setAuthed(Boolean(getToken()));
    }
    window.addEventListener("auth-changed", onChange);
    const unsub = subscribeNotifications(setNotifs);

    function onDocClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);

    return () => {
      window.removeEventListener("auth-changed", onChange);
      unsub();
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  function logout() {
    clearToken();
    navigate("/login");
  }

  return (
    <>
      <header>
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
          <div>
            <Link
              to="/dashboard"
              className="text-[24px] text-[#111928] font-semibold mr-2"
            >
              Events
            </Link>
            <span className="font-medium text-sm text-[#111928] ml-2">
              Management by Omais Ahmed
            </span>
          </div>
          <div className="space-x-3 text-sm">
            {!authed ? (
              <>
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="text-blue-600">
                  Register
                </Link>
              </>
            ) : (
              <div className="inline-flex items-center gap-4">
                <div className="relative" ref={popoverRef}>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      const willOpen = !open;
                      setOpen(willOpen);
                      if (willOpen) {
                        try {
                          const data = await fetchNotifications();
                          // Support either array of messages or objects
                          const normalized = Array.isArray(data)
                            ? data.map((d) => ({
                                id: d.id || d._id || Math.random(),
                                message: d.message || d.msg || String(d),
                                ts:
                                  d.ts ||
                                  d.createdAt ||
                                  new Date().toISOString(),
                              }))
                            : [];
                          setNotifs(normalized);
                        } catch {
                          // ignore for now
                        }
                      }
                    }}
                    className="relative"
                    aria-label="Notifications"
                    title="Notifications"
                  >
                    <span className="inline-block w-5 h-5 align-middle">
                      {/* Bell icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 20a2 2 0 1 1-4 0"
                          stroke="#111"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 8a6 6 0 1 1 12 0c0 3 1 5 2 6H4c1-1 2-3 2-6Z"
                          stroke="#111"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {notifs.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">
                        {Math.min(9, notifs.length)}
                        {notifs.length > 9 ? "+" : ""}
                      </span>
                    )}
                  </button>
                  {open && (
                    <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-white border rounded shadow">
                      <div className="p-2 text-sm font-semibold border-b">
                        Notifications
                      </div>
                      <ul className="divide-y">
                        {notifs.length === 0 ? (
                          <li className="p-3 text-sm text-gray-500">
                            No notifications
                          </li>
                        ) : (
                          notifs.map((n) => (
                            <li key={n.id} className="p-3 text-sm">
                              <div className="font-medium">{n.message}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(n.ts).toLocaleString()}
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <button onClick={logout} className="text-red-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
