import React from "react";
import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div className="page-blog bg--white section-padding--lg blog-sidebar right-sidebar">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="blog-page">
              <div className="page__header">
                <h2>Category Archives: HTML</h2>
              </div>

              <article className="blog__post d-flex flex-wrap">
                <div className="thumb">
                  <Link to="blog-details.html">
                    <img src="images/blog/blog-3/1.jpg" alt="blog images" />
                  </Link>
                </div>
                <div className="content">
                  <h4>
                    <Link to="blog-details.html">Blog image post</Link>
                  </h4>
                  <ul className="post__meta">
                    <li>
                      Posts by : <Link to="#">road theme</Link>
                    </li>
                    <li className="post_separator">/</li>
                    <li>Mar 10 2018</li>
                  </ul>
                  <p>
                    Donec vitae hendrerit arcu, sit amet faucibus nisl. Crastoup
                    pretium arcu ex. Aenean posuere libero eu augue rhoncus
                    Praesent ornare tortor amet.
                  </p>
                  <div className="blog__btn">
                    <Link to="blog-details.html">read more</Link>
                  </div>
                </div>
              </article>

              <article className="blog__post d-flex flex-wrap">
                <div className="thumb">
                  <Link to="blog-details.html">
                    <img src="images/blog/blog-3/2.jpg" alt="blog images" />
                  </Link>
                </div>
                <div className="content">
                  <h4>
                    <Link to="blog-details.html">Post with Gallery</Link>
                  </h4>
                  <ul className="post__meta">
                    <li>
                      Posts by : <Link to="#">road theme</Link>
                    </li>
                    <li className="post_separator">/</li>
                    <li>Mar 10 2018</li>
                  </ul>
                  <p>
                    Donec vitae hendrerit arcu, sit amet faucibus nisl. Crastoup
                    pretium arcu ex. Aenean posuere libero eu augue rhoncus
                    Praesent ornare tortor amet.
                  </p>
                  <div className="blog__btn">
                    <Link to="blog-details.html">read more</Link>
                  </div>
                </div>
              </article>

              <article className="blog__post d-flex flex-wrap">
                <div className="thumb">
                  <Link to="blog-details.html">
                    <img src="images/blog/blog-3/3.jpg" alt="blog images" />
                  </Link>
                </div>
                <div className="content">
                  <h4>
                    <Link to="blog-details.html">Post with Gallery</Link>
                  </h4>
                  <ul className="post__meta">
                    <li>
                      Posts by : <Link to="#">road theme</Link>
                    </li>
                    <li className="post_separator">/</li>
                    <li>Mar 10 2018</li>
                  </ul>
                  <p>
                    Donec vitae hendrerit arcu, sit amet faucibus nisl. Crastoup
                    pretium arcu ex. Aenean posuere libero eu augue rhoncus
                    Praesent ornare tortor amet.
                  </p>
                  <div className="blog__btn">
                    <Link to="blog-details.html">read more</Link>
                  </div>
                </div>
              </article>

              <article className="blog__post d-flex flex-wrap">
                <div className="thumb">
                  <Link to="blog-details.html">
                    <img src="images/blog/blog-3/4.jpg" alt="blog images" />
                  </Link>
                </div>
                <div className="content">
                  <h4>
                    <Link to="blog-details.html">Blog image post</Link>
                  </h4>
                  <ul className="post__meta">
                    <li>
                      Posts by : <Link to="#">road theme</Link>
                    </li>
                    <li className="post_separator">/</li>
                    <li>Mar 10 2018</li>
                  </ul>
                  <p>
                    Donec vitae hendrerit arcu, sit amet faucibus nisl. Crastoup
                    pretium arcu ex. Aenean posuere libero eu augue rhoncus
                    Praesent ornare tortor amet.
                  </p>
                  <div className="blog__btn">
                    <Link to="blog-details.html">read more</Link>
                  </div>
                </div>
              </article>

              <article className="blog__post d-flex flex-wrap">
                <div className="thumb">
                  <Link to="blog-details.html">
                    <img src="images/blog/blog-3/5.jpg" alt="blog images" />
                  </Link>
                </div>
                <div className="content">
                  <h4>
                    <Link to="blog-details.html">Blog image post</Link>
                  </h4>
                  <ul className="post__meta">
                    <li>
                      Posts by : <Link to="#">road theme</Link>
                    </li>
                    <li className="post_separator">/</li>
                    <li>Mar 10 2018</li>
                  </ul>
                  <p>
                    Donec vitae hendrerit arcu, sit amet faucibus nisl. Crastoup
                    pretium arcu ex. Aenean posuere libero eu augue rhoncus
                    Praesent ornare tortor amet.
                  </p>
                  <div className="blog__btn">
                    <Link to="blog-details.html">read more</Link>
                  </div>
                </div>
              </article>

              <article className="blog__post text--post">
                <div className="content">
                  <h4>
                    <Link to="blog-details.html">Blog image post</Link>
                  </h4>
                  <ul className="post__meta">
                    <li>
                      Posts by : <Link to="#">road theme</Link>
                    </li>
                    <li className="post_separator">/</li>
                    <li>Mar 10 2018</li>
                  </ul>
                  <p>
                    Donec vitae hendrerit arcu, sit amet faucibus nisl. Crastoup
                    pretium arcu ex. Aenean posuere libero eu augue rhoncus
                    Praesent ornare tortor amet.
                  </p>
                  <div className="blog__btn">
                    <Link to="blog-details.html">read more</Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
            <div className="wn__sidebar">
              <aside className="widget search_widget">
                <h3 className="widget-title">Search</h3>
                <form action="#">
                  <div className="form-input">
                    <input type="text" placeholder="Search..." />
                    <button>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </aside>

              <aside className="widget recent_widget">
                <h3 className="widget-title">Recent</h3>
                <div className="recent-posts">
                  <ul>
                    <li>
                      <div className="post-wrapper d-flex">
                        <div className="thumb">
                          <Link to="blog-details.html">
                            <img
                              src="images/blog/sm-img/1.jpg"
                              alt="blog images"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to="blog-details.html">Blog image post</Link>
                          </h4>
                          <p> March 10, 2015</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="post-wrapper d-flex">
                        <div className="thumb">
                          <Link to="blog-details.html">
                            <img
                              src="images/blog/sm-img/2.jpg"
                              alt="blog images"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to="blog-details.html">
                              Post with Gallery
                            </Link>
                          </h4>
                          <p> March 10, 2015</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="post-wrapper d-flex">
                        <div className="thumb">
                          <Link to="blog-details.html">
                            <img
                              src="images/blog/sm-img/3.jpg"
                              alt="blog images"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to="blog-details.html">Post with Video</Link>
                          </h4>
                          <p> March 10, 2015</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="post-wrapper d-flex">
                        <div className="thumb">
                          <Link to="blog-details.html">
                            <img
                              src="images/blog/sm-img/4.jpg"
                              alt="blog images"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to="blog-details.html">
                              Maecenas ultricies
                            </Link>
                          </h4>
                          <p> March 10, 2015</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="post-wrapper d-flex">
                        <div className="thumb">
                          <Link to="blog-details.html">
                            <img
                              src="images/blog/sm-img/5.jpg"
                              alt="blog images"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to="blog-details.html">Blog image post</Link>
                          </h4>
                          <p> March 10, 2015</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </aside>

              <aside className="widget comment_widget">
                <h3 className="widget-title">Comments</h3>
                <ul>
                  <li>
                    <div className="post-wrapper">
                      <div className="thumb">
                        <img
                          src="images/blog/comment/1.jpeg"
                          alt="Comment images"
                        />
                      </div>
                      <div className="content">
                        <p>demo says:</p>
                        <Link to="#">Quisque semper nunc vitae...</Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="post-wrapper">
                      <div className="thumb">
                        <img
                          src="images/blog/comment/1.jpeg"
                          alt="Comment images"
                        />
                      </div>
                      <div className="content">
                        <p>Admin says:</p>
                        <Link to="#">Curabitur aliquet pulvinar...</Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="post-wrapper">
                      <div className="thumb">
                        <img
                          src="images/blog/comment/1.jpeg"
                          alt="Comment images"
                        />
                      </div>
                      <div className="content">
                        <p>Irin says:</p>
                        <Link to="#">Quisque semper nunc vitae...</Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="post-wrapper">
                      <div className="thumb">
                        <img
                          src="images/blog/comment/1.jpeg"
                          alt="Comment images"
                        />
                      </div>
                      <div className="content">
                        <p>Boighor says:</p>
                        <Link to="#">Quisque semper nunc vitae...</Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="post-wrapper">
                      <div className="thumb">
                        <img
                          src="images/blog/comment/1.jpeg"
                          alt="Comment images"
                        />
                      </div>
                      <div className="content">
                        <p>demo says:</p>
                        <Link to="#">Quisque semper nunc vitae...</Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </aside>

              <aside className="widget category_widget">
                <h3 className="widget-title">Categories</h3>
                <ul>
                  <li>
                    <Link to="#">Fashion</Link>
                  </li>
                  <li>
                    <Link to="#">Creative</Link>
                  </li>
                  <li>
                    <Link to="#">Electronics</Link>
                  </li>
                  <li>
                    <Link to="#">Kids</Link>
                  </li>
                  <li>
                    <Link to="#">Flower</Link>
                  </li>
                  <li>
                    <Link to="#">Books</Link>
                  </li>
                  <li>
                    <Link to="#">Jewelle</Link>
                  </li>
                </ul>
              </aside>

              <aside className="widget archives_widget">
                <h3 className="widget-title">Archives</h3>
                <ul>
                  <li>
                    <Link to="#">March 201</Link>
                  </li>
                  <li>
                    <Link to="#">December 2014</Link>
                  </li>
                  <li>
                    <Link to="#">November 2014</Link>
                  </li>
                  <li>
                    <Link to="#">September 2014</Link>
                  </li>
                  <li>
                    <Link to="#">August 2014</Link>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
