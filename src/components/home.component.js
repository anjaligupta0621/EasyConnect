/* eslint-disable no-undef */
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/main.css";
import "../css/menu.css";
import "../css/styles.css";
import "../css/login-modal-wizard.css";
import "./home.component.css";
import LoginModal from "./login.component.js";
import Loader from "./loader.component";

import Header from "./header.component.js";
import logolarge from "../img/logo-large.png";
import bannerArrow from "../img/banner-arrow.png";
import shadowImage from "../img/steps-shadow.png";

class Home extends React.PureComponent {
	state = {
		showModal: false,
		isLoggedIn: false,
		showLoader:false
	};

	showLoginDialog = () => {
		this.setState({
			showModal: true,
		});
	};

	signOut = () => {
		// debugger;
		alert("shahsank");
		this.setIsLoggedIn(false);
		global.isLoggedIn = false;
	};

	hideLoginDialog = () => {
		this.setState({
			showModal: false,
		});
		this.setState({showLoader: true});
        setTimeout(() => {
            this.setState({showLoader: false});
        }, 2000);
	};

	setIsLoggedIn = (isLoggedIn) => {
		// debugger;
		this.props.log(true);
		// debugger;
		this.setState({
			isLoggedIn: isLoggedIn,
		});
	};

	render() {
		const mystyle = {
			padding: "0px",
			backgroundImage: `url(${shadowImage})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "top left",
		};
		const blockStyle = {
			borderRadisu: "5px",
		};
		return (
			<div className="home-component">
				{this.state.showModal ? (
					<LoginModal
						hideLogin={this.hideLoginDialog}
						setIsLoggedIn={this.setIsLoggedIn}
					/>
				) : null}
				<Loader showLoader={this.state.showLoader}></Loader>
				<Header
					showLogin={this.showLoginDialog}
					isLoggedIn={this.state.isLoggedIn}
					signOut={this.signOut}
					setIsLoggedIn={this.setIsLoggedIn}
				/>
				<div id="banner" className="text-center">
					<h1>
						<img src={logolarge} alt="Easy Connect" />
						Easy <span>Connect</span>
					</h1>
					<p className="caption1">
						We help you find the <span>Right and Job-ready Candidates</span>
					</p>
					<p className="caption2">
						Completely <span>FREE.</span> No hidden charges.{" "}
						<span>No credit card required</span>
					</p>

					<div className="col-lg-12 steps home-grid-container">
						<a href="#section1" className="home-cards">
							<div className="col-lg-12 step1">
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 step-no">
									01
								</div>
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
									<h2>Access a large pool of freshers</h2>
									<p>
										Access 25000+ freshers from across 500+ colleges in India
									</p>
								</div>
							</div>
						</a>

						<a href="#section2" className="home-cards">
							<div className="col-lg-12 step1">
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 step-no">
									02
								</div>
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
									<h2>Applicants are automatically sorted</h2>
									<p>
										Interested Applicants will be automatically sorted by
										Employability Skills
									</p>
								</div>
							</div>
						</a>

						<a href="#section3" className="home-cards">
							<div className="col-lg-12 step1">
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 step-no">
									03
								</div>
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
									<h2>View rich profiles of top ranked candidates</h2>
									<p>
										Listen to the audio profiles of top ranked candidates.
										Shortlist candidates who fit your Organization’s culture
									</p>
								</div>
							</div>
						</a>

						<a href="#section4" className="home-cards">
							<div className="col-lg-12 step1">
								<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 step-no">
									04
								</div>
								<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
									<h2>Hire freshers without leaving your office</h2>
									<p>
										Hire only the best freshers directly from your Office
										without the expense of visiting Campuses
									</p>
								</div>
							</div>
						</a>
					</div>

					<div className="banner-arrow text-center">
						<a href="#section1">
							<img src={bannerArrow} alt="" />
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
