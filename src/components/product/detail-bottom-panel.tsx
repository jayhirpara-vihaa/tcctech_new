import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function InfoTwo() {

    return (
        <Tabs>
            <TabList className="text-3xl flex justify-center space-x-3 cursor-pointer border-t border-gray-400">
                <Tab>Description</Tab>
                <Tab>Additional Information</Tab>
                <Tab>Shipping & Returns</Tab>
                <Tab>Review (25)</Tab>
            </TabList>

            <TabPanel>
                <div className="text-center">
                    <h2 className="TCC-diamond-setting-title">Product Information</h2>
                    <ul className=''>
                        <li>Faux suede fabric upper</li>
                        <li>Tie strap buckle detail</li>
                        <li>Block heel</li>
                        <li>Open toe</li>
                        <li>Heel Height: 7cm / 2.5 inches</li>
                    </ul>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="product-desc-content pt-2">
                    <div className="container">
                        <h3>Information</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>

                        <h3 className="pt-2">Fabric & care</h3>
                        <ul>
                            <li>Faux suede fabric</li>
                            <li>Gold tone metal hoop handles.</li>
                            <li>RI branding</li>
                            <li>Snake print trim interior </li>
                            <li>Adjustable cross body strap</li>
                            <li> Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm</li>
                        </ul>
                        <h3>Size</h3>
                        <p>one size</p>
                    </div>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="product-desc-content pt-2">
                    <div className="container">
                        <h3>Delivery & returns</h3>
                        <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information<br />
                            We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our Returns information</p>
                    </div>
                </div>
            </TabPanel>

            <TabPanel>
                <div className="container pt-2">
                    <div className="reviews">
                        <h3>Reviews (2)</h3>
                        <div className="review">
                            <div className="row no-gutters">
                                <div className="col-auto">
                                    <h4>Samanta J.</h4>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val"></div>
                                            <span className="tooltip-text">(25)</span>
                                        </div>
                                    </div>
                                    <span className="review-date mb-1">6 days ago</span>
                                </div>
                                <div className="col">
                                    <h4>Good, perfect size</h4>

                                    <div className="review-content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                    </div>

                                    <div className="review-action">
                                        <i className="icon-thumbs-up"></i>Helpful (2)
                                        <i className="icon-thumbs-down"></i>Unhelpful (0)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="review">
                            <div className="row no-gutters">
                                <div className="col-auto">
                                    <h4>John Doe</h4>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val"></div>
                                            <span className="tooltip-text">(25)</span>
                                        </div>
                                    </div>
                                    <span className="review-date mb-1">5 days ago</span>
                                </div>
                                <div className="col">
                                    <h4>Very good</h4>

                                    <div className="review-content">
                                        <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                    </div>

                                    <div className="review-action">
                                        <i className="icon-thumbs-up"></i>Helpful (0)
                                        <i className="icon-thumbs-down"></i>Unhelpful (0)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reply">
                        <div className="title-wrapper text-left">
                            <h3 className="title title-simple text-left text-normal">Add a Review
                            </h3>
                            <p>Your email address will not be published. Required fields are
                                marked *</p>
                        </div>
                        <div className="rating-form">
                            <label htmlFor="rating" className="text-dark">Your rating * </label>
                            <span className="rating-stars selected">
                                {[1, 2, 3, 4, 5].map((num, index) =>
                                    <a className={`star-${num}`} href="#" key={'star-' + index}>{num}</a>
                                )}
                            </span>

                            <select name="rating" id="rating"
                                style={{ display: 'none' }}>
                                <option value="">Rate…</option>
                                <option value="5">Perfect</option>
                                <option value="4">Good</option>
                                <option value="3">Average</option>
                                <option value="2">Not that bad</option>
                                <option value="1">Very poor</option>
                            </select>
                        </div>
                        <form action="#">
                            <textarea id="reply-message"
                                className="form-control mb-2" placeholder="Comment *"
                                required></textarea>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control" id="reply-name"
                                        name="reply-name" placeholder="Name *" required />
                                </div>
                                <div className="col-md-6">
                                    <input type="email" className="form-control" id="reply-email"
                                        name="reply-email" placeholder="Email *" required />
                                </div>
                            </div>
                            <div className="form-checkbox mb-2">
                                <input type="checkbox" className="custom-checkbox"
                                    id="signin-remember" name="signin-remember" />
                                <label className="form-control-label ml-3" htmlFor="signin-remember">
                                    Save my name, email, and website in this browser for the
                                    next time I comment.
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </TabPanel>
        </Tabs>
    )
}

export default InfoTwo;