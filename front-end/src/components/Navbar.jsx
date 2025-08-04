import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Mini Linkedln</h1>

      <div className="nav-link">
        <Link to="/"> Home </Link>
        <Link to={`/profile/${user?._id}`} >Profile </Link>
        <button onClick={handleLogout}> Logout </button>
      </div>
    </nav>
  );
};

export default Navbar;
