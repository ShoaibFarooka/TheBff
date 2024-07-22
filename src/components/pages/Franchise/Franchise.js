import React from "react";
import Header from "../../common/Header";
import NewsletterSection from "../../common/NewsletterSection";
import Footer from "../../common/Footer";

const handleClick = (event) => {
  event.currentTarget.classList.toggle("toggle-form");
};

const Franchise = () => {
  return (
    <>
      {/* main container start here... */}
      <main className="main-container">
        {/* Header Section start here... */}
        <Header />
        {/* Header Section end here... */}

        {/* Business-franchise section start here... */}
        <section className="business-franchise">
          <h4>BFF Franchise</h4>
          <p>
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim,
            <br className="d-none d-md-block" />
            metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
            interdum tellus elit sed risus. Gorem ipsum dolor sit amet,
            <br className="d-none d-md-block" />
            consectetur adipiscing elit. Etiam eu turpis mol
          </p>
          {/* Franchise section banner and text start here... */}
          <div className="row align-items-center justify-content-around franchise-banner">
            <div className="col-md-5 col-12">
              <div
                className="product-img"
                style={{
                  background: 'url("./assets/img/franchise.png"), #282828',
                }}
              ></div>
            </div>
            <div className="col-md-5 col-12">
              <h4>Open your own</h4>
              <h5>BFF center</h5>
              <p>
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br className="d-none d-md-block" />
                Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                <br className="d-none d-md-block" />
                dignissim, metus nec fringilla{" "}
              </p>
              <div>
                <button className="btn btn-partner me-5" type="button">
                  Partner With Us
                </button>
                <button className="btn primary-btn" type="button">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
          {/* Franchise section banner and text end here... */}
        </section>
        {/* Busiiness-franchise section end here... */}

        {/* Business Partner section start here... */}
        <section className="business-partner">
          <div className="business-partner-content">
            <h4>Why Partner With Us</h4>
            <p>
              Lorem ipsum is common placeholder text used to demonstrate the
              graphic elements of a document or visual presentation.
            </p>
            {/* why parnter with us section start here... */}
            <div className="row align-items-center justify-content-around">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="partner-sec">
                  <div className="work-img">
                    <img
                      src="./assets/img/Robustworkflow.svg"
                      alt="Robustworkflow.svg"
                    />
                  </div>
                  <h5>Robust workflow</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    <br className="d-none d-md-block" />
                    adipiscing elit. Sed erat nibh tristique ipsum.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="partner-sec">
                  <div className="work-img">
                    <img
                      src="./assets/img/Flexibility.svg"
                      alt="Flexibility.svg"
                    />
                  </div>
                  <h5>Flexibility</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    <br className="d-none d-md-block" />
                    adipiscing elit. Sed erat nibh tristique ipsum.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="partner-sec">
                  <div className="work-img">
                    <img
                      src="./assets/img/Userfriendly.svg"
                      alt="Userfriendly.svg"
                    />
                  </div>
                  <h5>User friendly</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    <br className="d-none d-md-block" />
                    adipiscing elit. Sed erat nibh tristique ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-around">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="partner-sec">
                  <div className="work-img">
                    <img
                      src="./assets/img/Multiplelayouts.svg"
                      alt="Multiplelayouts.svg"
                    />
                  </div>
                  <h5>Multiple layouts</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    <br className="d-none d-md-block" />
                    adipiscing elit. Sed erat nibh tristique ipsum.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="partner-sec">
                  <div className="work-img">
                    <img
                      src="./assets/img/Bettercomponents.svg"
                      alt="Bettercomponents.svg"
                    />
                  </div>
                  <h5>Better components</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    <br className="d-none d-md-block" />
                    adipiscing elit. Sed erat nibh tristique ipsum.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div className="partner-sec">
                  <div className="work-img">
                    <img
                      src="./assets/img/Wellorganised.svg"
                      alt="Wellorganised.svg"
                    />
                  </div>
                  <h5>Well organised</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    <br className="d-none d-md-block" />
                    adipiscing elit. Sed erat nibh tristique ipsum.
                  </p>
                </div>
              </div>
            </div>
            {/* why parnter with us section start here... */}
          </div>
          {/* Become parnter section start here... */}
          <div className="become-partner">
            <h4>
              Interested in becoming a BFF
              <br className="d-none d-md-block" />
              Partner
            </h4>
            <p>
              Please fill out the form if you are interested in partnering with
              us{" "}
            </p>
            <div className="become-partner-form">
              <button
                className="btn btn-partner"
                onClick={handleClick}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#BecomePartner"
                aria-expanded="false"
                aria-controls="BecomePartner"
              >
                <span className="arrow-collapse">
                  <img
                    src="./assets/img/chevron-top.svg"
                    alt="Robustworkflow.svg"
                  />
                </span>
                <span className="collapse-text">Partner With Us</span>
              </button>
              <div className="collapse" id="BecomePartner">
                <form>
                  <div className="mb-3">
                    <label for="InterestedIn" className="form-label">
                      Interested in ?
                    </label>
                    <select
                      className="form-select"
                      id="InterestedIn"
                      aria-label="InterestedIn"
                    >
                      <option selected>Select one</option>
                      <option value="1">Select Two</option>
                      <option value="2">Select Three</option>
                      <option value="3">Select Four</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label for="Name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Name"
                      placeholder="Enter your Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="Email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="PhoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="PhoneNumber"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="CityInterestedIn" className="form-label">
                      City Interested in ?
                    </label>
                    <select
                      className="form-select"
                      id="CityInterestedIn"
                      aria-label="CityInterestedIn"
                    >
                      <option selected>Select one</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label for="GymName" className="form-label">
                      Gym Name (for existing gym owners)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="GymName"
                      placeholder="Enter city names separated by comma"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="Message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter your Message here"
                      id="Message"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button className="btn primary-btn" type="button">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Become parnter section end here... */}
        </section>
        {/* Business Partner section end here... */}

        {/* Newsletter section start here... */}
        <NewsletterSection />
        {/* Newsletter section end here... */}

        {/* Footer sction start here... */}
        <Footer />
        {/* Footer sction end here... */}
      </main>
      {/* main container end here... */}
    </>
  );
};

export default Franchise;
