import React from 'react'
import landingCss from '../../styles/LandingPage.module.css'
import heroImg from '../../assets/images/Landing/hero-img.png'
import aboutImg from '../../assets/images/Landing/about.png'
import value1 from '../../assets/images/Landing/values-1.png'
import value2 from '../../assets/images/Landing/values-2.png'
import value3 from '../../assets/images/Landing/values-3.png'
import features from '../../assets/images/Landing/features-3.png'
import logo from '../../assets/images/Landing/logo.png'
import { IoCalendarNumber, IoListSharp, IoLogoBuffer, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter, IoManSharp, IoPeople, IoTimeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

function UserLanding() {
  return (
    <fragment className={landingCss.body}>
    {/* ======= Header ======= */}
    <header id="header" className={`${landingCss.header} fixed-top`}>
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="#" className={landingCss.logo+" d-flex align-items-center"}>
          {/* <img src="assets/img/logo.png" alt=""> */}
          <span>Taskify</span>
        </a>
        <nav id="navbar" className={landingCss.navbar}>
          <ul>
            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
            <li><a className="nav-link scrollto" href="#about">About</a></li>
            <li><a className="nav-link scrollto" href="#services">Services</a></li>
            <li><a className="nav-link scrollto" href="#team">Team</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><Link className={`${landingCss.getstarted} scrollto` }to="/login">Get Started</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>{/* .navbar */}
      </div>
    </header>{/* End Header */}
    {/* ======= Hero Section ======= */}
    <section id="hero" className={`${landingCss.hero} d-flex align-items-center ${landingCss.sectionn}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">Taskify brings all your
              tasks, teammates, and
              tools together</h1>
            <h2 data-aos="fade-up" data-aos-delay={400}>Keep everything in the same place—even if your team
              isn’t.</h2>
            <div data-aos="fade-up" data-aos-delay={600}>
              <div className="text-center text-lg-start">
                <Link to="/login" className={`${landingCss.btngetstarted} scrollto d-inline-flex align-items-center justify-content-center align-self-center`}>
                  <span>Sign up its free</span>
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className={`col-lg-6 ${landingCss.heroImg}`} data-aos="zoom-out" data-aos-delay={200}>
            <img src={heroImg} className="img-fluid" alt />
          </div>
        </div>
      </div>
    </section>{/* End Hero */}


    <main id="main">
      {/* ======= About Section ======= */}
      <section id="about" className={`${landingCss.about} ${landingCss.sectionn}`}>
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
            <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay={200}>
              <div className={`${landingCss.content}`}>
                <h3>Taskify 001</h3>
                <h2>Efficient Task Management App: Streamline Your Workflow with Ease</h2>
                <p>
                  The task management app utilizes intelligent algorithms to automatically categorize and prioritize your tasks based on due dates, importance, and user-defined tags. This feature ensures that you stay focused on the most critical tasks and effectively manage your workload.            </p>
                <div className="text-center text-lg-start">
                  <a href="#" className={`${landingCss.btnreadMore} d-inline-flex align-items-center justify-content-center align-self-center`}>
                    <span>Be With Us</span>
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay={200}>
              <img src={aboutImg} className="img-fluid" alt />
            </div>
          </div>
        </div>
      </section>{/* End About Section */}
      {/* ======= Values Section ======= */}
      <section id="values" className={`${landingCss.values} ${landingCss.sectionn}`}>
        <div className="container" data-aos="fade-up">
          <header className={`${landingCss.sectionHeader}`}>
            <p>Empower Your Workflow with our Task Management App</p>
          </header>
          <div className="row">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
              <div className={`${landingCss.box}`}>
                <img src={value1} className="img-fluid" alt />
                <h3>Visual Task Boards and Kanban View</h3>
                <p>The app provides intuitive visual task boards and a Kanban view, allowing you to visualize your tasks, progress, and workflow.</p>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay={400}>
              <div className={`${landingCss.box}`}>
                <img src={value2} className="img-fluid" alt />
                <h3>Integration with Productivity Tools</h3>
                <p> The task management app seamlessly integrates with popular productivity tools such as calendars, email clients, and project management platforms.</p>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay={600}>
              <div className={`${landingCss.box}`}>
                <img src={value3} className="img-fluid" alt />
                <h3>Deadline Reminders and Notifications</h3>
                <p>You can set customized reminders for upcoming tasks and get email alerts, ensuring that you stay on top of your responsibilities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>{/* End Values Section */}
      {/* ======= Features Section ======= */}
      <section id="features" className={`${landingCss.features} ${landingCss.sectionn}`}>
        <div className="container" data-aos="fade-up">
          <header className={`${landingCss.sectionHeader}`}>
            <h2>Features</h2>
            <p>Optimize Performance with our Taskify</p>
          </header>
          {/* Feature Icons */}
          <div className={`row ${landingCss.featureIcons}`} data-aos="fade-up">
            <div className="row">
              <div className="col-xl-4 text-center" data-aos="fade-right" data-aos-delay={100}>
                <img src={features} className="img-fluid p-4" alt />
              </div>
              <div className={`col-xl-8 d-flex ${landingCss.content}`}>
                <div className="row align-self-center gy-4">
                  <div className={`col-md-6 ${landingCss.iconBox}`}data-aos="fade-up">
                  <IoLogoBuffer className={`${landingCss.icon}`} />
                    <div>
                      <h4>Workspace</h4>
                      <p>Transform your task management experience with a dedicated workspace. </p>
                    </div>
                  </div>
                  <div className={`col-md-6 ${landingCss.iconBox}`} data-aos="fade-up" data-aos-delay={100}>
                    <IoPeople className={`${landingCss.icon}`}/>
                    <div>
                      <h4>Teamwork</h4>
                      <p>Promote seamless collaboration and effective teamwork within your task management app.</p>
                    </div>
                  </div>
                  <div className={`col-md-6 ${landingCss.iconBox}`} data-aos="fade-up" data-aos-delay={200}>
                    <IoTimeSharp className={`${landingCss.icon}`}/>
                    <div>
                      <h4>Time Tracking</h4>
                      <p>Take control of your productivity and optimize your workflow with built-in time tracking capabilities.</p>
                    </div>
                  </div>
                  <div className={`col-md-6 ${landingCss.iconBox}`} data-aos="fade-up" data-aos-delay={300}>
                  <IoCalendarNumber className={`${landingCss.icon}`}/>
                    <div>
                      <h4>Calender</h4>
                      <p>Efficiently manage your schedule and deadlines with an integrated calendar feature.</p>
                    </div>
                  </div>
                  <div className={`col-md-6 ${landingCss.iconBox}`} data-aos="fade-up" data-aos-delay={400}>
                  <IoManSharp className={`${landingCss.icon}`}/>
                    <div>
                      <h4>Performance Tracking</h4>
                      <p>Track your personal and team performance with performance tracking features.</p>
                    </div>
                  </div>
                  <div className={`col-md-6 ${landingCss.iconBox}`} data-aos="fade-up" data-aos-delay={500}>
                  <IoListSharp className={`${landingCss.icon}`}/>
                    <div>
                      <h4>Attendance Tracking</h4>
                      <p>Keep track of team members' attendance and availability with the attendance tracking feature.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* End Feature Icons */}
        </div>
      </section>{/* End Features Section */}
    </main>{/* End #main */}


    {/* ======= Footer ======= */}
    <footer id="footer" className={`${landingCss.footer}`}>
      <div className={`${landingCss.footerTop}`}>
        <div className="container">
          <div className="row gy-4">
            <div className={`col-lg-5 col-md-12 ${landingCss.footerInfo}`}>
              <a href="index.html" className={`${landingCss.logo} d-flex align-items-center`}>
            {/* <img src={logo} className='footer-logo-icon' alt /> */}
                <span>Taskify</span>
              </a>
              <p>Efficiency at Your Fingertips: Unleash Your Productivity with Our Task Management App</p>
              <div className={`${landingCss.socialLinks} mt-3`}>
                <a href="#" className="twitter"><IoLogoTwitter className="bi bi-twitter" /></a>
                <a href="#" className="facebook"><IoLogoFacebook className="bi bi-facebook" /></a>
                <a href="#" className="instagram"><IoLogoInstagram className="bi bi-instagram" /></a>
                <a href="#" className="linkedin"><IoLogoLinkedin className="bi bi-linkedin" /></a>
              </div>
            </div>
            <div className={`col-lg-2 col-6 ${landingCss.footerLinks}`}>
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right" /> <a href="#">Home</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">About us</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Services</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Terms of service</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Privacy policy</a></li>
              </ul>
            </div>
            <div className={`col-lg-2 col-6 ${landingCss.footerLinks}`}>
              <h4>Our Services</h4>
              <ul>
                <li><i className="bi bi-chevron-right" /> <a href="#">Workspaces</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Lists</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Tasks</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Team</a></li>
                <li><i className="bi bi-chevron-right" /> <a href="#">Calender</a></li>
              </ul>
            </div>
            <div className={`col-lg-3 col-md-12 ${landingCss.footerContact} text-center text-md-start`}>
              <h4>Contact Us</h4>
              <p>
                A108 Ami <br />
                koppam, pd 535022<br />
                Kerala <br /><br />
                <strong>Phone:</strong> +9747281807<br />
                <strong>Email:</strong> Taskify@gmail.com<br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`${landingCss.copyright}`}>
          © Copyright <strong><span>Taskify</span></strong>. All Rights Reserved
        </div>
        <div className={`${landingCss.credits}`}>
          Designed by <a href="#">Ami</a>
        </div>
      </div>
    </footer>{/* End Footer */}
    <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
    {/* Vendor JS Files */}
  </fragment>
  )
}

export default UserLanding
