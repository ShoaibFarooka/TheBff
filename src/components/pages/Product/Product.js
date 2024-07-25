import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import NewsletterSection from "../../common/NewsletterSection";

const Product = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      {/* main container start here... */}
      <main className="main-container">
        {/* Header Section start here... */}
        <Header />
        {/* Header Section end here... */}

        {/* Product-Banner section start here... */}
        <section className="product-banner-content">
          {/* Product Banner start here... */}
          <div className="product-slider">
            <h3 className="product-slider-heading">Weight management</h3>
            <div className="centerMode-slick">
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (1).png"), #282828',
                }}
              ></div>
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (2).png"), #282828',
                }}
              ></div>
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (3).png"), #282828',
                }}
              ></div>
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (4).png"), #282828',
                }}
              ></div>
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (5).png"), #282828',
                }}
              ></div>
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (1).png"), #282828',
                }}
              ></div>
              <div
                className="product-img"
                style={{
                  background:
                    'url("./assets/img/product-slider (2).png"), #282828',
                }}
              ></div>
              <div className="slick-extra-btn d-none">
                <button class="btn prev-btn">
                  <img src="./assets/img/arrow-left.svg" alt="" />
                </button>
                <button class="btn next-btn">
                  {" "}
                  <img src="./assets/img/arrow-right.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          {/* Product Banner end here... */}
        </section>
        {/* Product-Banner section end here... */}

        {/* Stay-healthy section start here... */}
        <section className="stay-healthy">
          <div className="stay-healthy-headings">
            <h4>How Can you stay healthy ?</h4>
            <p>
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus.
            </p>
          </div>
          {/* StayHealthy slider start here... */}
          <div className="healthy-content">
            <div className="staySlider">
              <div
                className="slider-item"
                style={{
                  background: 'url("./assets/img/Rectangle 1969.png"), #282828',
                }}
              >
                <span>Title 1</span>
              </div>
              <div
                className="slider-item"
                style={{
                  background:
                    'url("./assets/img/Rectangle 1970 (1).png"), #282828',
                }}
              >
                <span>Title 2</span>
              </div>
              <div
                className="slider-item"
                style={{
                  background:
                    'url("./assets/img/Rectangle 1970 (2).png"), #282828',
                }}
              >
                <span>Title 3</span>
              </div>
              <div
                className="slider-item"
                style={{
                  background: 'url("./assets/img/Rectangle 1969.png"), #282828',
                }}
              >
                <span>Title 4</span>
              </div>
              <div
                className="slider-item"
                style={{
                  background:
                    'url("./assets/img/Rectangle 1970 (1).png"), #282828',
                }}
              >
                <span>Title 5</span>
              </div>
            </div>
          </div>
          {/* StayHealthy slider end here... */}
        </section>
        {/* Stay-healthy section end here... */}

        {/* Product-contents detail start here.. */}
        <section className="product-detail">
          <div className="container-fluid">
            <h4>Heading 1</h4>
            {/* Product detail content row start here... */}
            <div className="row justify-content-between">
              <div className="col-lg-5 col-md-6 col-12">
                <div
                  className="product-img"
                  style={{
                    backgroundImage: 'url("./assets/img/Rectangle 1976.png")',
                  }}
                ></div>
              </div>
              <div className="col-lg-5 col-md-6 col-12">
                <div>
                  <h2>SubHeading 1</h2>
                  <p>
                    Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                    dignissim, metus nec fringilla accumsan, risus sem
                    sollicitudin lacus, ut interdum tellus elit sed risus. Gorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                    turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                    metus nec fringilla accumsan, risus sem sollicitudin lacus,
                    ut interdum tellus elit sed risus. Gorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                    dictum est a, mattis tellus. Sed dignissim, metus nec
                    fringilla accumsan, risus sem sollicitudin lacus, ut
                    interdum tellus elit sed risus.{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* Product detail content row end here... */}
          </div>
        </section>
        {/* Product-contents detail end here.. */}

        {/* Section Ultimated variety start here... */}
        <section className="ultimateVarity">
          <div className="ultimateVarity-content">
            <h3>Ultimated variety</h3>
            <p>
              Never get bored. Get results with short & effective workouts you
              can do anywhere.
            </p>
            {/* ultimate varity content start here... */}
            <div className="row justify-content-around">
              <div className="col-lg-3 col-md-4 col-12">
                <div
                  className="varity-img d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("./assets/img/Rectangle 67.png")',
                  }}
                >
                  <div className="img-overlay">
                    <a
                      className="btn stretched-link"
                      href="javascript:void(0);"
                    >
                      Cardio
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div
                  className="varity-img d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("./assets/img/Rectangle 68.png")',
                  }}
                >
                  <div className="img-overlay">
                    <a
                      className="btn stretched-link"
                      href="javascript:void(0);"
                    >
                      Strength
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div
                  className="varity-img d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("./assets/img/Rectangle 69.png")',
                  }}
                >
                  <div className="img-overlay">
                    <a
                      className="btn stretched-link"
                      href="javascript:void(0);"
                    >
                      Yoga
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-around">
              <div className="col-lg-3 col-md-4 col-12">
                <div
                  className="varity-img d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("./assets/img/Rectangle 70.png")',
                  }}
                >
                  <div className="img-overlay">
                    <a
                      className="btn stretched-link"
                      href="javascript:void(0);"
                    >
                      No equipment
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div
                  className="varity-img d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("./assets/img/Rectangle 71.png")',
                  }}
                >
                  <div className="img-overlay">
                    <a
                      className="btn stretched-link"
                      href="javascript:void(0);"
                    >
                      Toning
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <div
                  className="varity-img d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("./assets/img/Rectangle 72.png")',
                  }}
                >
                  <div className="img-overlay">
                    <a
                      className="btn stretched-link"
                      href="javascript:void(0);"
                    >
                      Walking
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* ultimate varity content start here... */}
            <button className="btn secondary-btn" type="button">
              Start training now
            </button>
          </div>
        </section>
        {/* Section Ultimated variety end here... */}

        {/* Section Plans start here... */}
        <section className="Pricing-plan">
          <h3 className="heading">Choose your Plan</h3>
          <p className="heading-para">
            best prices offered , choose the plan that suits you
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-12">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  <div className="d-flex align-items-center justify-content-around">
                    <h4 className="plans-heading-1">Standard</h4>
                    <h4 className="plans-heading-2">Premium</h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row plan-ul">
                    <div className="col-12">
                      <p>Live interactive class</p>
                    </div>
                    <div className="col-12">
                      <p>frequency</p>
                    </div>
                    <div className="col-12">
                      <p>Diet assistance</p>
                    </div>
                    <div className="col-12">
                      <p>Pause Membership</p>
                    </div>
                    <div className="col-12">
                      <p>No-cost EMI</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row plan-check">
                    <div className="col-6 px-0">
                      <div className="plan-checker checker-border text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>Yes</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>Yes</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker checker-border text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>18 Sessions</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>Unlimited</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker checker-border text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/cross (2).svg"
                          alt=""
                        />
                        <p>no</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>Yes</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker checker-border text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/cross (2).svg"
                          alt=""
                        />
                        <p>no</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>Yes</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker checker-border text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/cross (2).svg"
                          alt=""
                        />
                        <p>no</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <img
                          className="plan-check-img"
                          src="./assets/img/check-blue.svg"
                          alt=""
                        />
                        <p>Yes</p>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <p className="plan-price">
                          Starting at
                          <br />
                          ₹1999/- month
                        </p>
                        <button
                          className="btn btn-price"
                          type="button"
                          onClick={toggle}
                        >
                          View Plans
                        </button>
                      </div>
                    </div>
                    <div className="col-6 px-0">
                      <div className="plan-checker text-center">
                        <p className="plan-price">
                          Starting at
                          <br />
                          ₹3499/- month
                        </p>
                        <button className="btn btn-price" onClick={toggle}>
                          View Plans
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section Plans end here... */}

        {/* Newsletter section start here... */}
        <NewsletterSection />
        {/* Newsletter section end here... */}

        {/* Footer sction start here... */}
        <Footer />
        {/* Footer sction end here... */}

        <Modal
          isOpen={modal}
          centered
          toggle={toggle}
          className="plan-modal modal-xl"
        >
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <h3 className="modal-title">Choose Plan</h3>
            <p className=" modal-para">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus.
            </p>
            {/* Plan container start here... */}
            <div className="plan-container">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-month-1-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-month-1"
                    type="button"
                    role="tab"
                    aria-controls="pills-month-1"
                    aria-selected="true"
                  >
                    1 Month
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-month-2-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-month-2"
                    type="button"
                    role="tab"
                    aria-controls="pills-month-2"
                    aria-selected="false"
                  >
                    3 Month
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-month-3-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-month-3"
                    type="button"
                    role="tab"
                    aria-controls="pills-month-3"
                    aria-selected="false"
                  >
                    6 Month
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-month-1"
                  role="tabpanel"
                  aria-labelledby="pills-month-1-tab"
                  tabindex="0"
                >
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card">
                        <h5 className="title">Standard</h5>
                        <p className="price">
                          <span>₹</span>
                          1999
                          <small>/month</small>
                        </p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Create personal dashboard.
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Trainer Support
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Rewards & Achievement{"'"}s.
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card premium">
                        <span className="discount">-30%</span>
                        <h5 className="title">Premium</h5>
                        <p className="price">
                          <span>₹</span>
                          3499
                          <small>/month</small>
                        </p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            All features in <strong>Standard.</strong>
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            Pause <strong>Membership</strong> on your ease
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            Custom Nutrition Plans
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card">
                        <h5 className="title">Enterprise</h5>
                        <p className="price">Contact Us</p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            All features in Premium Plan.
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Bulk Discount
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            24*7 Support
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-month-2"
                  role="tabpanel"
                  aria-labelledby="pills-month-2-tab"
                  tabindex="0"
                >
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card">
                        <h5 className="title">Standard</h5>
                        <p className="price">
                          <span>₹</span>
                          1999
                          <small>/month</small>
                        </p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Create personal dashboard.
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Trainer Support
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Rewards & Achievement{"'"}s.
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card premium">
                        <span className="discount">-30%</span>
                        <h5 className="title">Premium</h5>
                        <p className="price">
                          <span>₹</span>
                          3499
                          <small>/month</small>
                        </p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            All features in <strong>Standard.</strong>
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            Pause <strong>Membership</strong> on your ease
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            Custom Nutrition Plans
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card">
                        <h5 className="title">Enterprise</h5>
                        <p className="price">Contact Us</p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            All features in Premium Plan.
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Bulk Discount
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            24*7 Support
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-month-3"
                  role="tabpanel"
                  aria-labelledby="pills-month-3-tab"
                  tabindex="0"
                >
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card">
                        <h5 className="title">Standard</h5>
                        <p className="price">
                          <span>₹</span>
                          1999
                          <small>/month</small>
                        </p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Create personal dashboard.
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Trainer Support
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Rewards & Achievement{"'"}s.
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card premium">
                        <span className="discount">-30%</span>
                        <h5 className="title">Premium</h5>
                        <p className="price">
                          <span>₹</span>
                          3499
                          <small>/month</small>
                        </p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            All features in <strong>Standard.</strong>
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            Pause <strong>Membership</strong> on your ease
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-dark.svg" />
                            </span>
                            Custom Nutrition Plans
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="plan-card">
                        <h5 className="title">Enterprise</h5>
                        <p className="price">Contact Us</p>
                        <div class="plan-content">
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            All features in Premium Plan.
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            Bulk Discount
                          </p>
                          <p>
                            <span>
                              <img src="./assets/img/check-grey.svg" />
                            </span>
                            24*7 Support
                          </p>
                          <button class="btn primary-btn" type="button">
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Plan container end here... */}
          </ModalBody>
        </Modal>
      </main>
      {/* main container end here... */}
    </>
  );
};

export default Product;
