import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [loadScript, setLoadScript] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script.src = `${process.env.PUBLIC_URL}/assets/slick-1.8.1/slick/slick.js`;
    script.async = true;
    script1.src = `${process.env.PUBLIC_URL}/assets/js/gymTrainer.js`;
    script1.async = true;
    script2.src = `https://unpkg.com/aos@2.3.1/dist/aos.js`;
    script2.async = true;

    document.body.appendChild(script);
    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      if (loadScript) {
        document.body.removeChild(script);
        document.body.removeChild(script1);
        document.body.removeChild(script2);

        setLoadScript(false);
      }
    };
  }, []);
  return (
    <>
      {/* Header Section start here... */}
      <header id="header" className="header fixed-top">
        {/* Navbar start here... */}
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* logo img start */}
            <a className="navbar-brand" href="#">
              <img src="./assets/img/LOGO.png" alt="LOGO.png" />
            </a>
            {/* Toggle button start */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#NavbarCollapseContent"
              aria-controls="NavbarCollapseContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapsable-content start */}
            <div
              className="collapse navbar-collapse"
              id="NavbarCollapseContent"
            >
              {/* All Nav link start */}
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/product"}>
                    Programs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Business"}>
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#BLOGS">
                    Blogs
                  </a>
                </li>
              </ul>
              <form className="d-flex align-items-center">
                <Link
                  to={"/loginSignup"}
                  className="btn btn-outline-contact d-none"
                  role="button"
                >
                  Login/Signup
                </Link>
                <div class="d-flex align-items-center justify-content-between">
                  <Link className="btn notification-btn" to={""}>
                    <span className="">
                      <img
                        src="./assets/img/notification.svg"
                        alt="notification-img"
                      />
                    </span>
                  </Link>
                  <button
                    className="btn profile-btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#profileOffcanvas"
                    aria-controls="profileOffcanvas"
                  >
                    <span className="">
                      <img
                        className="w-100"
                        src="./assets/img/profile.png"
                        alt="notification-img"
                      />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </nav>
        {/* Navbar end here... */}
      </header>
      {/* Header section end here... */}
      {/* profile offcanvas start here... */}
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="profileOffcanvas"
        aria-labelledby="profileOffcanvasLabel"
      >
        <div className="offcanvas-body">
          <div className="profile-section">
            <div className="profile-img">
              <img
                className="w-100"
                src="./assets/img/profile.png"
                alt="notification-img"
              />
            </div>
            <div className="">
              <h5>Ayush Sharma</h5>
              <p>Male 22</p>
            </div>
          </div>
          <div className="profile-lists">
            <ul className="list-unstyled">
              <li>
                <Link className="btn" to={"/Account"}>
                  <span className="">
                    <img
                      className="w-100"
                      src="./assets/img/My Profile.svg"
                      alt="My-Profile-img"
                    />
                  </span>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="btn" to={""}>
                  <span className="">
                    <img
                      className="w-100"
                      src="./assets/img/Health Reports.svg"
                      alt="Health-Reports-img"
                    />
                  </span>
                  Health Reports
                </Link>
              </li>
              <li>
                <Link className="btn" to={""}>
                  <span className="">
                    <img
                      className="w-100"
                      src="./assets/img/Queries.svg"
                      alt="Queries-img"
                    />
                  </span>
                  Queries
                </Link>
              </li>
              <li>
                <Link className="btn" to={""}>
                  <span className="">
                    <img
                      className="w-100"
                      src="./assets/img/Blogs.svg"
                      alt="Blogs-img"
                    />
                  </span>
                  Blogs
                </Link>
              </li>
              <li>
                <Link className="btn" to={""}>
                  <span className="">
                    <img
                      className="w-100"
                      src="./assets/img/Rewards.svg"
                      alt="Rewards-img"
                    />
                  </span>
                  Rewards
                </Link>
              </li>
            </ul>
          </div>
          <div class="logout-section">
            <Link className="btn logout-btn">Logout</Link>
          </div>
        </div>
      </div>
      {/* profile offcanvas end here... */}
    </>
  );
};

export default Header;
