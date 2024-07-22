import React from 'react'

const Footer = () => {
  return (
    <>
      {/* Footer sction start here... */}
      <section className="footer">
        <div className="row justify-content-around align-items-center footer-main">
          <div className="col-md-2">
            <div className="footer-logo">
              <img src="./assets/img/LOGO.png" alt="LOGO.png" />
              <p>
                Get the latest articles and business updates that you need to know,
                you’ll even get special recommendations weekly.
              </p>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-3">
                <div className="footer-link">
                  <h3>Website Links</h3>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Get In Touch</a>
                    </li>
                    <li>
                      <a href="#">FAQS</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-link">
                  <h3>Services</h3>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Get In Touch</a>
                    </li>
                    <li>
                      <a href="#">FAQS</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-link">
                  <h3>Services 2</h3>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Get In Touch</a>
                    </li>
                    <li>
                      <a href="#">FAQS</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="social_icon">
                  <h3>Social Media</h3>
                  <ul>
                    <li>
                      <a href="#">
                        <img src="./assets/img/instagram 1.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="./assets/img/Twitter.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="./assets/img/Frame 104.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="./assets/img/linkedin.png" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 align-self-end">
            <div className="footer-bottom">
              <p className="copyright">©2023 BFF. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer sction end here... */}
    </>

  )
}

export default Footer