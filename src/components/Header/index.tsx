import React, { useState } from "react";
import "./styles.scss";
import { Login, Menu, Person, Search, ShoppingCart } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Badge, IconButton, TextField, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const PAGES = [
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "Deals",
    href: "/deals",
  },
  // {
  //   title: "Music",
  //   href: "/music",
  // },
];

const Header = ({
  page,
}: {
  page?: string;
  setOpen?: (open: { severity: string; message: string }) => void;
}) => {
  const { cart } = useSelector((state) => state) as {
    cart: { products: any[]; total: string };
  };
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (query == null) setSearchTerm("");
    else setSearchTerm(query);
  }, [query]);

  const handleSearch = () => {
    if (searchTerm == null || searchTerm == "") {
      navigate("/");
    } else {
      navigate(`?query=${searchTerm}`);
    }
  };

  return (
    <header>
      <div className="header-left" onClick={() => navigate("/")}>
        {/* <img height={"40px"} width={"100%"} src={logo} /> */}
        <h1>
          <span>Mr.</span>
          Redash
        </h1>
      </div>

      {page == "shop" && (
        <div className="header-middle">
          <form>
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton onClick={() => handleSearch()}>
              <Search style={{ color: "white", fontSize: "30px" }} />
            </IconButton>
          </form>
        </div>
      )}
      <div className="h-right">
        <div className="header-right">
          {PAGES.map((face, i) => (
            <NavLink
              key={i}
              to={face.href}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {face.title}
            </NavLink>
          ))}

          {/* {page != "home" && (
            <div onClick={() => navigate("/custom")}>
              <h2>Customize</h2>
            </div>
          )} */}
          {page !== "prelaunch" && page !== "home" && (
            <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
              <StyledBadge
                badgeContent={cart.products.length}
                color="secondary"
              >
                <ShoppingCart style={{ color: "white" }} />
              </StyledBadge>
            </IconButton>
          )}

          {auth.currentUser
            ? page !== "profile" && (
                <IconButton onClick={() => navigate("/profile")}>
                  <Person style={{ color: "white", fontSize: "30px" }} />
                </IconButton>
              )
            : page !== "login" &&
              page !== "loading" && (
                <IconButton onClick={() => navigate("/login")}>
                  <Login style={{ color: "white" }} />
                </IconButton>
              )}
        </div>
      </div>

      <div className="small-menu">
        <IconButton
          style={{ color: "white" }}
          onClick={() => {
            menuOpen ? setMenuOpen(false) : setMenuOpen(true);
          }}
        >
          <Menu />
        </IconButton>
        {menuOpen && (
          <nav>
            <div className="small-search">
              <form>
                <input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton onClick={() => handleSearch()}>
                  <Search style={{ color: "white", fontSize: "30px" }} />
                </IconButton>
              </form>
            </div>

            {PAGES.map((face, i) => (
              <NavLink
                key={i}
                to={face.href}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {face.title}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
