import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../common/Footer";
import NewsletterSection from "../../common/NewsletterSection";
import Header from "../../common/Header";

const Home = () => {
  return (
    <>
      {/* main container start here... */}
      <main className="main-container">
        {/* Header Section start here... */}
        <Header />
        {/* Header section end here... */}
        {/* Fixed overlay-btn start here... */}
        <div className="over-fixed">
          <button className="btn">
            <span>
              <img
                src="./assets/img/Screenshot_2023-04-16_at_5.36 1.png"
                alt="head_set"
              />
            </span>
          </button>
        </div>
        {/* Fixed overlay-btn end here... */}
        {/* Home-Banner Video start here... */}
        <section className="Home-banner">
          <video
            id="background-video"
            autoPlay
            loop
            muted
            playsInline
            data-wf-ignore="true"
            data-object-fit="cover"
            poster="./assets/img/banner-video.mp4"
          >
            <source src="./assets/img/banner-video.mp4" type="video/mp4" />
          </video>
          {/* Banner-content start here... */}
          <div className="banner-content" data-aos="fade-up">
            <h5>
              Bored with your gym routine?
              <br className="d-none d-lg-block" />
              <span> try working out with BFF</span>
            </h5>
            <button className="btn primary-btn" type="button">
              Explore
            </button>
          </div>
        </section>
        {/* Home-Banner Video end here... */}
        {/* Program Section start here... */}
        <section id="PROGRAMS" className="Programs">
          <div className="container">
            {/* section program background video start here... */}
            {/* <video
        id="program-bg"
        autoplay
        loop
        muted
        poster="./assets/img/program-bg.mp4"
      >
        <source src="./assets/img/program-bg.mp4" type="video/mp4" />
      </video> */}
            {/* section program background video end here... */}
            {/* program-section content start here... */}
            <div className="program-content">
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-5 col-12">
                  <div className="program-vertical">
                    <div
                      className="vertical-product-img"
                      style={{
                        background: 'url("./assets/img/slider-1.png"), #282828',
                      }}
                    ></div>
                    <div
                      className="vertical-product-img"
                      style={{
                        background: 'url("./assets/img/slider-1.png"), #282828',
                      }}
                    ></div>
                    <div
                      className="vertical-product-img"
                      style={{
                        background: 'url("./assets/img/slider-1.png"), #282828',
                      }}
                    ></div>
                    <div
                      className="vertical-product-img"
                      style={{
                        background: 'url("./assets/img/slider-1.png"), #282828',
                      }}
                    ></div>
                    <div
                      className="vertical-product-img"
                      style={{
                        background: 'url("./assets/img/slider-1.png"), #282828',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="col-lg-7 col-12">
                  <div data-aos="fade-up">
                    <h5 className="program-heading">
                      Workout Program
                      <br className="d-none d-lg-block" />
                      <span>made for you</span>
                    </h5>
                    <div className="card program-content-card">
                      <h5>Weight Management</h5>
                      <p>
                        Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam eu turpis molestie, dictum est a, mattis tellus.
                        Sed dignissim, metus nec fringilla accumsan, risus sem
                        sollicitudin lacus, ut interdum tellus elit sed risus.
                        Maecenas eget condimentum velit, sit amet feugiat
                        lectus. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos. Praesent
                        auctor purus luctus enim egestas, ac scelerisque ante
                        pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus
                        nisl, eu tempor urna. Curabitur vel bibendum lorem.
                        Morbi convallis convallis diam sit amet lacinia. Aliquam
                        in elementum
                      </p>
                      <button
                        className="btn primary-btn d-inline-block"
                        type="button"
                      >
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* program-section content end here... */}
          </div>
        </section>
        {/* Program Section end here... */}
        {/* Pricing section start heree... */}
        <section id="PRICING" className="gallery_zones">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="gallery_image">
                  <img src="./assets/img/gallery1.png" alt="" />
                </div>
                <div className="gallery_image">
                  <img src="./assets/img/gallery3.png" alt="" />
                </div>
                <div className="gallery_image">
                  <img src="./assets/img/gallery7.png" alt="" />
                </div>
              </div>
              <div className="col-md-4 mt-5">
                <div className="gallery_image">
                  <img src="./assets/img/gallery2.png" alt="" />
                </div>
                <div className="gallery_image">
                  <img src="./assets/img/gallery4.png" alt="" />
                </div>
                <div className="gallery_image">
                  <img src="./assets/img/gallery8.png" alt="" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery_image">
                  <img src="./assets/img/gallery6.png" alt="" />
                </div>
                <div className="gallery_image">
                  <img src="./assets/img/gallery5.png" alt="" />
                </div>
                <div className="gallery_image">
                  <img src="./assets/img/gallery9.png" alt="" />
                </div>
              </div>
            </div>
            <div className="banner-content">
              <h5 data-aos="fade-up">
                Achieve your fitness goals
                <br className="d-none d-lg-block" />
                without stepping out of your
                <br className="d-none d-lg-block" />
                comfort zone
              </h5>
            </div>
          </div>
        </section>
        {/* Pricing section end heree... */}
        {/* blogs section start here... */}
        <section id="BLOGS" className="slider_Section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div data-aos="fade-up">
                  <h2>
                    Relax your body and mind
                    <span className="color_y">with our yoga coaches</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="" data-aos="fade-up">
              <div className="row justify-content-between Blogs-slide">
                <div className="col-lg-3">
                  <div className="card">
                    <img
                      src="./assets/img/kindpng_218182.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Gurpreet Singh</h5>
                      <p>E-REPS</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card">
                    <img
                      src="./assets/img/pngwing (1).png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Harpreet Singh</h5>
                      <p>E-REPS</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card">
                    <img
                      src="./assets/img/pngwing (1).png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Harpreet Singh</h5>
                      <p>E-REPS</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card">
                    <img
                      src="./assets/img/pngwing (1).png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Harpreet Singh</h5>
                      <p>E-REPS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* blogs section end here... */}
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

export default Home;
