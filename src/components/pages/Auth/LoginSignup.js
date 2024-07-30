import React from 'react'

const LoginSignup = () => {
  return (
    <>
      {/* main container start here... */}
      <main className="main-container">
        {/* Login/signup content start here... */}
        <section className="loginSignup">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="Login_Videos">
                {/* section LoginSignup video start here... */}
                <video
                  id="program-bg"
                  autoPlay loop muted playsInline data-wf-ignore="true" data-object-fit="cover"
                  poster="./assets/img/program-bg.mp4"
                >
                  <source src="./assets/img/program-bg.mp4" type="video/mp4" />
                </video>
                {/* section LoginSignup video end here... */}
                {/* overlay-text start here... */}
                <div className="overlay-text">
                  <h5>Sign Up and join for fitness</h5>
                  <p>Lorem Ipsum is simply</p>
                </div>
                {/* overlay-text end here... */}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              {/* Login/Signup tabs start here... */}
              <div className="Login-tab">
                <div className="login-logo">
                  <img src="./assets/img/LOGO.png" alt="" />
                </div>
                <p className="login-para">Welcome to BFF</p>
                {/* Login/Signup tabs start here... */}
                <div className="loginSignup_tabs">
                  {/* Tabs nav start here... */}
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="Login-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#Login"
                        type="button"
                        role="tab"
                        aria-controls="Login"
                        aria-selected="true"
                      >
                        Login
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="Registration-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#Registration"
                        type="button"
                        role="tab"
                        aria-controls="Registration"
                        aria-selected="false"
                      >
                        Register
                      </button>
                    </li>
                  </ul>
                  {/* Tabs nav end here... */}
                  {/* Tabs content start here... */}
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="Login"
                      role="tabpanel"
                      aria-labelledby="Login-tab"
                      tabIndex={0}
                    >
                      <div className="card">
                        <div className="card-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <form action="">
                            <div className="form-group mb-3">
                              <label htmlFor="username" className="form-label">
                                User name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your User name"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your Password"
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-5">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="Remember"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="Remember"
                                >
                                  Rememebr me
                                </label>
                              </div>
                              <a
                                href="loginSignup.html"
                                className="btn forget-btn"
                                role="button"
                              >
                                Forgot Password ?
                              </a>
                            </div>
                            <div className="login-button text-center">
                              <a
                                href="index.html"
                                role="button"
                                className="btn primary-btn"
                              >
                                Login
                              </a>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="Registration"
                      role="tabpanel"
                      aria-labelledby="Registration-tab"
                      tabIndex={0}
                    >
                      <div className="card">
                        <div className="card-body">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <form action="">
                            <div className="form-group mb-3">
                              <label htmlFor="Emailaddress" className="form-label">
                                Email Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Emailaddress"
                                placeholder="Enter your Email Address"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label htmlFor="password1" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password1"
                                placeholder="Enter your Password"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label htmlFor="password2" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password2"
                                placeholder="Enter your Password"
                              />
                            </div>
                            <div className="login-button text-center">
                              <a
                                href="index.html"
                                role="button"
                                className="btn primary-btn"
                              >
                                Register
                              </a>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tabs content end here... */}
                </div>
                {/* Login/Signup tabs end here... */}
              </div>
              {/* Login/Signup tabs end here... */}
            </div>
          </div>
        </section>
        {/* Login/signup content end here... */}
      </main>
      {/* main container end here... */}
    </>

  )
}

export default LoginSignup