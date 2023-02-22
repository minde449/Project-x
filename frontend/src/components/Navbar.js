import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { CiLogout, CiLogin } from "react-icons/ci";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h3>Forum</h3>
        </Link>

        <nav>
          {user && (
            <div style={{ display: "flex" }}>
              <span className="user-nav">{user.email}</span>
              <button onClick={handleLogout}>
                <CiLogout />
              </button>
            </div>
          )}

          {!user && (
            <div style={{ display: "flex" }}>
              <Link to="/login">
                <div className="btn-wrapper">
                  <CiLogin />

                  <span>Login</span>
                </div>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
