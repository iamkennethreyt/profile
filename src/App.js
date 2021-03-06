import React, { Component } from "react";
import "./App.css";
import mydata from "./data.json";
import firebase from "firebase";
import Spinner from "./Spinner";

const config = {
  apiKey: "AIzaSyD-qeUr7iaa4ICCw3LHXb7NCsJIyduC9S8",
  authDomain: "mywebsite-bf5b7.firebaseapp.com",
  databaseURL: "https://mywebsite-bf5b7.firebaseio.com",
  projectId: "mywebsite-bf5b7",
  storageBucket: "mywebsite-bf5b7.appspot.com",
  messagingSenderId: "531641951862"
};

firebase.initializeApp(config);
const messagesRef = firebase.database().ref("contacts");
const newMessageRef = messagesRef.push();

class App extends Component {
  saveMessage = (name, company, email, phone, message) => {
    newMessageRef.set({
      name: name,
      company: company,
      email: email,
      phone: phone,
      message: message
    });
  };

  state = {
    initialData: {},
    data: {},
    contact: []
  };
  componentWillMount() {
    this.setState({ data: mydata });
    firebase
      .database()
      .ref("profile")
      .once("value")
      .then(snapshot => {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;

          returnArr.push(item);
        });

        // snapshot.map(s => {
        //   returnArr.push(s.val());
        // });
        this.setState({ data: returnArr[0], initialData: returnArr[0] });
      });
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    newMessageRef.set({
      name: this.state.name,
      subject: this.state.subject,
      message: this.state.message,
      email: this.state.email
    });

    document.getElementById("contactForm").reset();
    alert("successfully send the message");
  };
  render() {
    if (!this.state.data.name) {
      return <Spinner />;
    } else {
      return (
        <div id="top">
          <header>
            <div className="profile-page sidebar-collapse">
              <nav
                className="navbar navbar-expand-lg fixed-top navbar-transparent bg-primary"
                color-on-scroll="400"
              >
                <div className="container">
                  <div className="navbar-translate">
                    <a className="navbar-brand" rel="tooltip" href="#">
                      Profile
                    </a>
                    <button
                      className="navbar-toggler navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navigation"
                      aria-controls="navigation"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-bar bar1" />
                      <span className="navbar-toggler-bar bar2" />
                      <span className="navbar-toggler-bar bar3" />
                    </button>
                  </div>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navigation"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link smooth-scroll" href="#about">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link smooth-scroll" href="#skill">
                          Skills
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link smooth-scroll" href="#portfolio">
                          Portfolio
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link smooth-scroll"
                          href="#experience"
                        >
                          Experience
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link smooth-scroll" href="#contact">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          <div className="page-content">
            <div>
              <div className="profile-page">
                <div className="wrapper">
                  <div
                    className="page-header page-header-small"
                    filter-color="green"
                  >
                    <div
                      className="page-header-image"
                      data-parallax="true"
                      style={{
                        backgroundImage:
                          "url('https://image.ibb.co/gWS27K/photo_1517694712202_14dd9538aa97.jpg')"
                      }}
                    />
                    <div className="container">
                      <div className="content-center">
                        <div className="cc-profile-image">
                          <a>
                            <img
                              src={this.state.data.profileImage}
                              alt="Kenneth Rey"
                            />
                          </a>
                        </div>
                        <div className="h2 title">{this.state.data.name}</div>
                        <p className="category text-white">
                          Web Developer, Graphic Designer
                        </p>
                        <a
                          className="btn btn-primary smooth-scroll mr-2"
                          href="#contact"
                          data-aos="zoom-in"
                          data-aos-anchor="data-aos-anchor"
                        >
                          Hire Me
                        </a>
                        <a
                          className="btn btn-primary"
                          data-aos="zoom-in"
                          data-aos-anchor="data-aos-anchor"
                          href={`${this.state.data.resume}`}
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                    <div className="section">
                      <div className="container">
                        <div className="button-container">
                          {this.state.data.links.map((link, i) => {
                            return (
                              <a
                                key={i}
                                className="btn btn-primary btn-round btn-lg btn-icon m-2"
                                href={`${link.link}`}
                                rel="tooltip"
                                title={`${link.title}`}
                              >
                                <i className={`${link.icon}`} />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section" id="about">
                <div className="container">
                  <div className="card" data-aos="fade-up" data-aos-offset="10">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="card-body">
                          <div className="h4 mt-0 title">About</div>
                          <p>
                            Hello! I am {this.state.data.name}. Web Developer
                            and a Graphic Designer.
                          </p>
                          <p>{this.state.data.aboutme}</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="card-body">
                          <div className="h4 mt-0 title">Basic Information</div>
                          {this.state.data.basicInfo.map((info, i) => {
                            return (
                              <div className="row mt-3" key={i}>
                                <div className="col-sm-4">
                                  <strong className="text-uppercase">
                                    {info.title}
                                  </strong>
                                </div>
                                <div className="col-sm-8">{info.value}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section" id="skill">
                <div className="container">
                  <div className="h4 text-center mb-4 title">
                    Professional Skills
                  </div>
                  <div
                    className="card"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <div className="card-body">
                      <div className="row">
                        {this.state.data.skills.map((skill, i) => {
                          return (
                            <div className="col-md-6" key={i}>
                              <div className="progress-container progress-primary">
                                <span className="progress-badge">
                                  {skill.skills}
                                </span>
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-primary"
                                    data-aos="progress-full"
                                    data-aos-offset="10"
                                    data-aos-duration="2000"
                                    role="progressbar"
                                    aria-valuenow="60"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: `${skill.percent}%` }}
                                  />
                                  <span className="progress-value">
                                    {`${skill.percent}%`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section" id="portfolio">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ml-auto mr-auto">
                      <div className="h4 text-center mb-4 title">Portfolio</div>
                      <div className="nav-align-center">
                        <ul
                          className="nav nav-pills nav-pills-primary"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#graphic-design"
                              role="tablist"
                            >
                              <i
                                className="fa fa-picture-o"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#web-development"
                              role="tablist"
                            >
                              <i className="fa fa-laptop" aria-hidden="true" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content gallery mt-5">
                    <div
                      className="tab-pane active"
                      id="graphic-design"
                      role="tabpanel"
                    >
                      <div className="ml-auto mr-auto">
                        <div className="row">
                          {this.state.data.portfolios.map((portfolio, i) => {
                            return (
                              <div className="col-md-6" key={i}>
                                <div
                                  className="cc-porfolio-image img-raised"
                                  data-aos="fade-up"
                                  data-aos-anchor-placement="top-bottom"
                                >
                                  <a href="#graphic-design">
                                    <figure className="cc-effect">
                                      <img
                                        src={`${portfolio.link}`}
                                        alt="Image"
                                      />
                                      <figcaption>
                                        <div className="h4">
                                          {portfolio.details}
                                        </div>
                                        <p>{portfolio.activity}</p>
                                      </figcaption>
                                    </figure>
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="web-development">
                      <div className="ml-auto mr-auto">
                        <div className="row">
                          <div className="col-md-6">
                            <div
                              className="cc-porfolio-image img-raised"
                              data-aos="fade-up"
                              data-aos-anchor-placement="top-bottom"
                            >
                              <a href="#web-development">
                                <figure className="cc-effect">
                                  <img
                                    src="https://image.ibb.co/deLJeK/coding.jpg"
                                    alt="Image"
                                  />
                                  <figcaption>
                                    <div className="h4">
                                      DNA Micro Software Inc.
                                    </div>
                                    <p>Web Development</p>
                                  </figcaption>
                                </figure>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section" id="experience">
                <div className="container cc-experience">
                  <div className="h4 text-center mb-4 title">
                    Work Experience
                  </div>
                  {this.state.data.workExperience.map((exp, i) => {
                    return (
                      <div className="card" key={i}>
                        <div className="row">
                          <div
                            className="col-md-3 bg-primary"
                            data-aos="fade-right"
                            data-aos-offset="50"
                            data-aos-duration="500"
                          >
                            <div className="card-body cc-experience-header">
                              <p>{exp.years}</p>
                              <div className="h5">{exp.company}</div>
                            </div>
                          </div>
                          <div
                            className="col-md-9"
                            data-aos="fade-left"
                            data-aos-offset="50"
                            data-aos-duration="500"
                          >
                            <div className="card-body">
                              <div className="h5">{exp.designation}</div>
                              <p>{exp.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="section">
                <div className="container cc-education">
                  <div className="h4 text-center mb-4 title">Education</div>
                  {this.state.data.education.map((educ, i) => {
                    return (
                      <div className="card" key={i}>
                        <div className="row">
                          <div
                            className="col-md-3 bg-primary"
                            data-aos="fade-right"
                            data-aos-offset="50"
                            data-aos-duration="500"
                          >
                            <div className="card-body cc-education-header">
                              <p>{educ.years}</p>
                              <div className="h5">{educ.level}</div>
                            </div>
                          </div>
                          <div
                            className="col-md-9"
                            data-aos="fade-left"
                            data-aos-offset="50"
                            data-aos-duration="500"
                          >
                            <div className="card-body">
                              <div className="h5">{educ.school}</div>
                              <p className="category">{educ.address}</p>
                              <p>{educ.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="section" id="reference">
                <div className="container cc-reference">
                  <div className="h4 mb-4 text-center title">References</div>
                  <div className="card" data-aos="zoom-in">
                    <div
                      className="carousel slide"
                      id="cc-Indicators"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        <li
                          className="active"
                          data-target="#cc-Indicators"
                          data-slide-to="0"
                        />
                        <li data-target="#cc-Indicators" data-slide-to="1" />
                        <li data-target="#cc-Indicators" data-slide-to="2" />
                      </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <div className="row">
                            <div className="col-lg-3 col-md-4 cc-reference-header">
                              <img
                                src="images/reference-image-1.jpg"
                                alt="Dr. Farah Sombilon"
                              />
                              <div className="h5 pt-2">Dr. Rigan Ap-apid </div>
                              <p className="category">fdsombilon@swu.edu.ph</p>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              <p>
                                Faculty Member College of IT & Engineering
                                Southwestern University PHINMA, Cebu City
                              </p>
                              <p>
                                Habitasse venenatis commodo tempor eleifend arcu
                                sociis sollicitudin ante pulvinar ad, est porta
                                cras erat ullamcorper volutpat metus duis platea
                                convallis, tortor primis ac quisque etiam luctus
                                nisl nullam fames. Ligula purus suscipit tempus
                                nascetur curabitur donec nam ullamcorper,
                                laoreet nullam mauris dui aptent facilisis neque
                                elementum ac, risus semper felis parturient
                                fringilla rhoncus eleifend.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="row">
                            <div className="col-lg-3 col-md-4 cc-reference-header">
                              <img
                                src="images/reference-image-1.jpg"
                                alt="Dr. Zandra Salas"
                              />
                              <div className="h5 pt-2">Dr. Zandra Salas</div>
                              <p className="category">zasalas@swu.edu.ph</p>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              <p>
                                Faculty Member College of IT & Engineering
                                Southwestern University PHINMA, Cebu City
                              </p>
                              <p>
                                Habitasse venenatis commodo tempor eleifend arcu
                                sociis sollicitudin ante pulvinar ad, est porta
                                cras erat ullamcorper volutpat metus duis platea
                                convallis, tortor primis ac quisque etiam luctus
                                nisl nullam fames. Ligula purus suscipit tempus
                                nascetur curabitur donec nam ullamcorper,
                                laoreet nullam mauris dui aptent facilisis neque
                                elementum ac, risus semper felis parturient
                                fringilla rhoncus eleifend.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="row">
                            <div className="col-lg-3 col-md-4 cc-reference-header">
                              <img
                                src="images/reference-image-1.jpg"
                                alt="Dr. Rigan Ap-apid "
                              />
                              <div className="h5 pt-2">Dr. Rigan Ap-apid </div>
                              <p className="category">rpap-apid@swu.edu.ph</p>
                            </div>
                            <div className="col-lg-9 col-md-8">
                              <p>
                                Dean College of IT & Engineering Southwestern
                                University PHINMA, Cebu City
                              </p>
                              <p>
                                Habitasse venenatis commodo tempor eleifend arcu
                                sociis sollicitudin ante pulvinar ad, est porta
                                cras erat ullamcorper volutpat metus duis platea
                                convallis, tortor primis ac quisque etiam luctus
                                nisl nullam fames. Ligula purus suscipit tempus
                                nascetur curabitur donec nam ullamcorper,
                                laoreet nullam mauris dui aptent facilisis neque
                                elementum ac, risus semper felis parturient
                                fringilla rhoncus eleifend.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section" id="contact">
                <div
                  className="cc-contact-information"
                  style={{
                    backgroundImage: `url(${
                      this.state.data.pageOption.backgroundImageBot
                    })`
                  }}
                >
                  <div className="container">
                    <div className="cc-contact">
                      <div className="row">
                        <div className="col-md-9">
                          <div className="card mb-0" data-aos="zoom-in">
                            <div className="h4 text-center title">
                              Contact Me
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="card-body">
                                  <form
                                    onSubmit={this.handleSubmit}
                                    id="contactForm"
                                  >
                                    <div className="p pb-3">
                                      <strong>Feel free to contact me </strong>
                                    </div>
                                    <div className="row mb-3">
                                      <div className="col">
                                        <div className="input-group">
                                          <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            required="required"
                                            onChange={this.handleChanges}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mb-3">
                                      <div className="col">
                                        <div className="input-group">
                                          <input
                                            className="form-control"
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            required="required"
                                            onChange={this.handleChanges}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mb-3">
                                      <div className="col">
                                        <div className="input-group">
                                          <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="E-mail"
                                            required="required"
                                            onChange={this.handleChanges}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mb-3">
                                      <div className="col">
                                        <div className="form-group">
                                          <textarea
                                            className="form-control"
                                            name="message"
                                            id="message"
                                            placeholder="Your Message"
                                            required="required"
                                            onChange={this.handleChanges}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col">
                                        <button
                                          className="btn btn-primary"
                                          type="submit"
                                        >
                                          Send
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="card-body">
                                  {this.state.data.basicInfo.map((info, i) => {
                                    return (
                                      <div className="row mt-3" key={i}>
                                        <div className="col-sm-4">
                                          <strong className="text-uppercase">
                                            {info.title}
                                          </strong>
                                        </div>
                                        <div className="col-sm-8">
                                          {info.value}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container text-center">
              {this.state.data.links.map((link, i) => {
                return (
                  <a className="btn btn-link" href={`${link.link}`} key={i}>
                    <i className={`${link.icon} fa-3x `} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <div className="h4 title text-center">{this.state.data.name}</div>
            <div className="text-center text-muted">
              <p>
                &copy; 2018. All rights reserved.
                <br />
              </p>
            </div>
          </footer>
        </div>
      );
    }
  }
}

export default App;
