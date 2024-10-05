import React from 'react'

const NewsletterSection = () => {
  return (
    <>
      {/* Newsletter section start here... */}
      <section className="newsletter">
        <div className="container-fluid">
          <div className="row justify-content-around newsletter_sign">
            <div className="col-md-4">
              <div className="newsletter_left">
                <h2>Stay tuned!</h2>
                <p>
                  Get the latest articles and business updates that you need to
                  know, you’ll even get special recommendations weekly.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="newsletter_right">
                <form>
                  <div className="form-group">
                    <input
                      type="search"
                      placeholder="Enter Your Email Id"
                      name=""
                    />
                    <button className="btn btn-sign">Sign up</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3">
              <div className="newsletter-img">
                <img
                  src="./assets/img/Screenshot_2023-04-16_at_5.36 1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter section end here... */}
    </>

  )
}

export default NewsletterSection