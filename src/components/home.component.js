/* eslint-disable no-undef */
import React from 'react';
import '../css/main.css';
import '../css/menu.css';
import '../css/styles.css';
import '../css/login-modal-wizard.css';
import '../css/select-drop.css';
import './home.component.css'

import Header from "./header.component.js"
import logolarge from '../img/logo-large.png'
import bannerArrow from '../img/banner-arrow.png'
import shadowImage from '../img/steps-shadow.png'

class Home extends React.PureComponent {
  render() {
    const  mystyle = {  
      padding: "0px",
      backgroundImage:`url(${shadowImage})`,
      backgroundRepeat:"no-repeat",
      backgroundPosition:"top left"     
      
    };
    return (
< body>
      <Header/>

  <div id="banner" className="text-center">
  <h1><img src={logolarge} alt="Learning Pundit"/>Easy <span>Connect</span></h1> 
  <p className="caption1">We help you find the <span>Right and Job-ready Candidates</span></p>
  <p className="caption2">Completely <span>FREE.</span> No hidden charges. <span>No credit card required</span></p>


  <div className="col-lg-12 steps home-grid-container" >
  <a href="#section1" className="home-cards">	
		<div class="col-lg-12 step1">
			<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 step-no">01</div>
			<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
				<h2>Access a large pool of freshers</h2>
				<p>Access 25000+ freshers from across 500+ colleges in India</p>
			</div>
		</div>
	</a>

  <a href="#section2" className="home-cards">	
		<div class="col-lg-12 step1">
			<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 step-no">02</div>
			<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
				<h2>Applicants are automatically sorted</h2>
				<p>Interested Applicants will be automatically sorted by Employability Skills</p>
			</div>
		</div>
	</a>
	
	<a href="#section3" className="home-cards">	
		<div class="col-lg-12 step1" >
			<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 step-no">03</div>
			<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
				<h2>View rich profiles of top ranked candidates</h2>
				<p>Listen to the audio profiles of top ranked candidates. Shortlist candidates who fit your Organization’s culture</p>
			</div>
		</div>
	</a>
	
	<a href="#section4" className="home-cards">	
		<div class="col-lg-12 step1">
			<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 step-no">04</div>
			<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
				<h2>Hire freshers without leaving your office</h2>
				<p>Hire only the best freshers directly from your Office without the expense of visiting Campuses</p>
			</div>
		</div>
	</a>

  </div>

  <div class="banner-arrow text-center">
      <a href="#section1"><img src={bannerArrow} alt=""/></a>
  </div>
</div>
  </body>

 
      );
  }
}

export default Home;