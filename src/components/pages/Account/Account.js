import React from "react";
import Header from "../../common/Header";

const Account = () => {
  return (
    <>
      {/* main container start here... */}
      <main className="main-container">
        {/* Header Section start here... */}
        <Header />
        {/* Header Section end here... */}

        {/* Account section start here... */}
        <section className="Account">
          <div className="container">
            <div className="main-account">
              <h4 className="title-name">Good Morning, Ayush</h4>
              <div className="row">
                <div className="col-12 col-lg-3">
                  <div className="account-card">
                    <div className="card-head">
                      <h6>Stats</h6>
                      <span>
                        <img src="./assets/img/elipsis.svg" alt="" />
                      </span>
                    </div>
                    <div className="account-body">
                      <p>
                        Every large design company whether it’s a multi-national
                        branding.
                      </p>
                      <div className="progress-bars">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="title">Metric 1</span>
                          <span className="points text-warning">65,376</span>
                        </div>
                        <div
                          class="progress"
                          role="progressbar"
                          aria-label="Warning example"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            class="progress-bar bg-warning"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-bars">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="title">Metric 2</span>
                          <span className="points text-primary">65,376</span>
                        </div>
                        <div
                          class="progress"
                          role="progressbar"
                          aria-label="Warning example"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            class="progress-bar bg-primary"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-bars">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="title">Metric 3</span>
                          <span className="points text-info">65,376</span>
                        </div>
                        <div
                          class="progress"
                          role="progressbar"
                          aria-label="Warning example"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            class="progress-bar bg-info"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-bars">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="title">Metric 4</span>
                          <span className="points text-danger">65,376</span>
                        </div>
                        <div
                          class="progress"
                          role="progressbar"
                          aria-label="Warning example"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            class="progress-bar bg-danger"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="account-card">
                    <div className="account-body">
                      <h4>Scheduled Session</h4>
                      <div className="schedule">
                        <h5>10:00 AM</h5>
                        <h5>23rd April 2023</h5>
                        <button className="btn reschedule-btn">
                          Reschedule
                        </button>
                      </div>
                      <div className="text-center">
                        <button className="btn join-meet-btn">
                          Join Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="account-card">
                    <div className="account-body">
                      <div className="profile-detail">
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="profile-img">
                            <img
                              className="w-100"
                              src="./assets/img/profile.png"
                              alt="notification-img"
                            />
                          </div>
                          <span>
                            <img src="./assets/img/elipsis.svg" alt="" />
                          </span>
                        </div>
                        <h5>Ayush Sharma</h5>
                        <p>Male 22</p>
                        <h5>Standard plan</h5>
                        <p>Valid Until : 23/06/2023</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <button className="btn premium-btn" type="button">
                            Upgrade to Premium
                          </button>
                          <span className="notification-premium">
                            <img
                              className="w-100"
                              src="./assets/img/notification.svg"
                              alt="notification-img"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="account-card">
                    <div className="card-head">
                      <h6>Stats</h6>
                      <span>
                        <img src="./assets/img/elipsis.svg" alt="" />
                      </span>
                    </div>
                    <div className="account-body">
                      <div className="account-chart">
                        <div className="charts">
                          <img
                            className="w-100"
                            src="./assets/img/chart.svg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="chart-summary">
                        <div className="summary-1">
                          <span className="span-1">1</span>
                          <span>Restless</span>
                        </div>
                        <div className="summary-2">
                          <span className="span-2">1</span>
                          <span>Awake</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="account-card">
                    <div className="account-body">
                      <div className="achievement-block">
                        <h3 className="title">Achievements & Rewards</h3>
                        <div className="achievement-cards">
                          <div className="achievement-card">
                            <div className="achievement-img">
                              <img
                                className="w-100"
                                src="./assets/img/Artwork.png"
                                alt=""
                              />
                            </div>
                            <div className="content">
                              <h5>A Topic Name That Is Two Lines</h5>
                              <div className="recall-section">
                                <h6>Recall 100%</h6>
                                <span>
                                  <img
                                    className="w-100"
                                    src="./assets/img/curved-right.svg"
                                    alt=""
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="achievement-card">
                            <div className="achievement-img">
                              <img
                                className="w-100"
                                src="./assets/img/Artwork.png"
                                alt=""
                              />
                            </div>
                            <div className="content">
                              <h5>A Topic Name That Is Two Lines</h5>
                              <div className="recall-section">
                                <h6>Recall 100%</h6>
                                <span>
                                  <img
                                    className="w-100"
                                    src="./assets/img/curved-right.svg"
                                    alt=""
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="achievement-card">
                            <div className="achievement-img">
                              <img
                                className="w-100"
                                src="./assets/img/Artwork.png"
                                alt=""
                              />
                            </div>
                            <div className="content">
                              <h5>A Topic Name That Is Two Lines</h5>
                              <div className="recall-section">
                                <h6>Recall 100%</h6>
                                <span>
                                  <img
                                    className="w-100"
                                    src="./assets/img/curved-right.svg"
                                    alt=""
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="account-card">
                    <div className="card-head">
                      <h6>Contact Trainer</h6>
                    </div>
                    <div className="account-body">
                      <div className="contact-textarea">
                        <textarea
                          class="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                        ></textarea>
                      </div>
                      <div className="query text-center">
                        <button className="btn primary-btn" type="button">
                          Send Query
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Account section end here... */}
      </main>
      {/* main container end here... */}
    </>
  );
};

export default Account;
