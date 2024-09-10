import React from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import NewsletterSection from "../../common/NewsletterSection";

const Checkout = () => {
  return (
    <>
      {/* main container start here... */}
      <main className="main-container">
        {/* Header Section start here... */}
        <Header />
        {/* Header Section end here... */}

        {/* Checkout section start here... */}
        <section className="checkout">
          <div className="container">
            <div className="position-relative">
              <h4 className="heading">Checkout</h4>
              <button className="btn back-btn" type="button">
                <span>
                  <img src="./assets/img/arrow-left.svg" alt="" />
                </span>
              </button>
            </div>
            {/* Checkout main content start here... */}
            <div className="checkout-content">
              <div className="row justify-content-between">
                <div className="col-lg-5 col-12">
                  <div
                    className="product-img"
                    style={{
                      backgroundImage: 'url("./assets/img/franchise.png")',
                    }}
                  ></div>
                  <div className="suggestion">
                    <h5>Suggested Plans </h5>
                    <div className="suggestion-card mt-2">
                      <div className="row px-lg-0 align-items-center">
                        <div className="col-lg-3">
                          <div
                            className="suggestion-img"
                            style={{
                              backgroundImage:
                                'url("./assets/img/suggestion1.png")',
                            }}
                          ></div>
                        </div>
                        <div className="col-lg-7 pe-lg-0">
                          <p>1 Month Premium - Dance</p>
                        </div>
                        <div className="col-lg-2 px-lg-0">
                          <button className="btn primary-btn" type="button">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="suggestion-card mt-2">
                      <div className="row px-lg-0 align-items-center">
                        <div className="col-lg-3">
                          <div
                            className="suggestion-img"
                            style={{
                              backgroundImage:
                                'url("./assets/img/suggestion2.png")',
                            }}
                          ></div>
                        </div>
                        <div className="col-lg-7 pe-lg-0">
                          <p>1 Month Premium - Nutrition</p>
                        </div>
                        <div className="col-lg-2 px-lg-0">
                          <button className="btn primary-btn" type="button">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-12">
                  <div className="checkout-detail">
                    <h4>1 Month Premium - Weight Management </h4>
                    <div className="d-flex align-items-center">
                      <h5 className="sale-price">₹ 3499</h5>
                      <h5 className="price">₹ 6499</h5>
                      <span className="badges primary-bg">-30%</span>
                    </div>
                    <p className="content-para">
                      Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam
                      <br className="d-none d-md-block" />
                      eu turpis molestie, dictum est a, mattis tellus. Sed
                      dignissim,
                      <br className="d-none d-md-block" />
                      metus nec fringilla accumsan, risus sem sollicitudin
                      lacus, ut
                      <br className="d-none d-md-block" />
                      interdum tellus elit sed risus. Gorem ipsum dolor sit
                      amet,
                      <br className="d-none d-md-block" />
                      consectetur adipiscing elit. Etiam eu turpis mol
                    </p>
                    <button className="btn primary-btn">Get Pack</button>
                    <div className="offers">
                      <h5>Offers</h5>
                      <div className="d-flex offer-tab">
                        <div className="">
                          <img src="./assets/img/offer-tab.svg" />
                        </div>
                        <div className="">
                          <p>Only Today I Additional ₹500 off applied.</p>
                        </div>
                        <div className="">
                          <h5>T&C</h5>
                        </div>
                      </div>
                      <div className="d-flex offer-tab">
                        <div className="">
                          <img src="./assets/img/offer-tab.svg" />
                        </div>
                        <div className="">
                          <p>Only Today I Additional ₹500 off applied.</p>
                        </div>
                        <div className="">
                          <h5>T&C</h5>
                        </div>
                      </div>
                      <h5>How it works</h5>
                      <ul className="work-it">
                        <li>
                        <b>Purchase Confirmation:</b> Once you purchase a plan, you will receive a confirmation email with all the details, including information about your assigned trainer.
                        </li>
                        <li>
                        <b>Personalized Call:</b> Our support team will give you a call to discuss your specific requirements and preferences to ensure we tailor the experience to your needs.
                        </li>
                        <li>
                        <b>Scheduling Your Sessions:</b>

For online plans, your sessions will be scheduled and you’ll receive all the details via email, including the links for virtual classes.
For in-home services, your trainer will visit your location for the first session at the scheduled time.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Checkout main content end here... */}
          </div>
        </section>
        {/* Checkout section end here... */}

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

export default Checkout;
