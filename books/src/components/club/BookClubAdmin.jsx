import React, {useContext, useState} from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from "../../firebase";
import {AuthContext} from "../../Auth";
import {Link, useHistory} from "react-router-dom";

const INITIAL_MESSAGE = "<h3>Welcome to the Book Club admin panel.</h3><p>&nbsp;</p><p>If this is your first visit," +
    " then welcome! Here you'll find at your disposal all the necessary tools to write about that book you've always wanted to talk about." +
    " There's no limit. Feel free to write as much as you see fit.</p><p>If you're already the author of an article and you intend to enrich your collection," +
    " then you've come to the right place.&nbsp;</p>"

const initialArticle = {
    author: '',
    date: new firebase.firestore.Timestamp.now(),
    title: '',
    content: INITIAL_MESSAGE,
    banner: ''
}

const DEFAULT_BANNER = 'https://firebasestorage.googleapis.com/v0/b/books-2293f.appspot.com/o/club%2Fdefault-book.png?alt=media&token=a18bf375-8d9e-4bac-af95-7116f45fda0a';

export default function BookClubAdmin() {
    const [article, setArticle] = useState(initialArticle);
    const [banner, setBanner] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const history = useHistory();

    const onContentTyping = ({data}) => {
        setArticle({
            ...article,
            content: data
        });
    };

    const onBannerChange = (event) => {
        event.persist();

        setBanner(event.target.files[0]);
    };

    const onArticleSubmit = async (event) => {
        event.preventDefault();

        let bannerPut = null;
        let bannerUrl = null;

        if (banner) {
            bannerPut = await firebase.storage().ref().child(`club/${banner.name}`).put(banner);
            bannerUrl = await bannerPut.ref.getDownloadURL();
        }

        const payload = {
            ...article,
            author: currentUser.username,
            banner: bannerUrl || DEFAULT_BANNER,
            ...(!article.title && {
                title: `${currentUser.username}'s book club article`
            })
        }

        firebase
            .firestore()
            .collection('club')
            .add(payload)
            .then(() => history.push('/club'));
    };


    return (
        <div>
            <div className="ht__bradcaump__area bg-image--6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">Contact Us</h2>
                                <nav className="bradcaump-content">
                                    <Link className="breadcrumb_item" to="/">Home</Link>
                                    <span className="brd-separetor">/</span>
                                    <Link className="breadcrumb_item" to="/club">Club</Link>
                                    <span className="brd-separetor">/</span>
                                    <span className="breadcrumb_item active">Submit</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="wn_contact_area bg--white pt--80 pb--80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="contact-form-wrap">
                                <h2 className="contact__title">Get in touch</h2>
                                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id
                                    quod
                                    mazim placerat facer possim assum. </p>
                                <form id="contact-form" onSubmit={onArticleSubmit}>
                                    <div className="single-contact-form">
                                        <input type="text" name="subject" placeholder="Title of your article"
                                               autoComplete="off"
                                               onChange={(event) => setArticle({
                                                   ...article,
                                                   title: event.target.value
                                               })}/>
                                    </div>
                                    <div className="single-contact-form">
                                        <div className={`file-upload ${banner ? 'active' : ''}`}>
                                            <span className="d-block mb-2" style={{fontSize: '14px'}}>Banner</span>
                                            <div className="file-select">
                                                <div className="file-select-button" id="fileName">Upload</div>
                                                <div className="file-select-name" id="noFile">{banner ? banner.name : 'Choose file'}</div>
                                                <input type="file" name="chooseFile" id="chooseFile" onChange={onBannerChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={INITIAL_MESSAGE}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();

                                            onContentTyping({data});
                                        }}
                                    />
                                    <div className="contact-btn mt-5">
                                        <button type="submit">Submit article</button>
                                    </div>
                                </form>
                            </div>
                            <div className="form-output">
                                <p className="form-messege">
                                </p></div>
                        </div>
                        <div className="col-lg-4 col-12 md-mt-40 sm-mt-40">
                            <div className="wn__address">
                                <h2 className="contact__title">Get office info.</h2>
                                <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium
                                    lectorum.
                                    Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit
                                    litterarum formas humanitatis per seacula quarta decima et quinta decima. </p>
                                <div className="wn__addres__wreapper">

                                    <div className="single__address">
                                        <i className="icon-location-pin icons"></i>
                                        <div className="content">
                                            <span>address:</span>
                                            <p>666 5th Ave New York, NY, United</p>
                                        </div>
                                    </div>

                                    <div className="single__address">
                                        <i className="icon-phone icons"></i>
                                        <div className="content">
                                            <span>Phone Number:</span>
                                            <p>716-298-1822</p>
                                        </div>
                                    </div>

                                    <div className="single__address">
                                        <i className="icon-envelope icons"></i>
                                        <div className="content">
                                            <span>Email address:</span>
                                            <p>716-298-1822</p>
                                        </div>
                                    </div>

                                    <div className="single__address">
                                        <i className="icon-globe icons"/>
                                        <div className="content">
                                            <span>website address:</span>
                                            <p>716-298-1822</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
