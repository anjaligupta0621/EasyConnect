import React, { useState } from 'react'
import '../css/login-modal-wizard.css';
 
const LoginModal = (props) => {
    return (
        <div>
            <div className='backdrop'/>
            <div style={{
                backgroundColor: "white",
                width: "500px",
                height: "800px",
                padding: "200px"
            }}>
                <h1 style={{color:"purple"}}>Welcome!</h1>
            </div>
        </div>
    );
}

export default LoginModal;

            // <div id="loginModal" className='modal-login'> 
            //     <div className="modal-content-login"> 
            //         <span className="closecv"> 
            //         <img src="img/close.png" width="26" height="27" alt="close" />
            //         </span>
    
            //         <div className="modal-header">
            //             <div 
            //                 id="registration_form" 
            //                 style={{display:"none"}} 
            //                 className="overlay-main"> 
            //                 <a 
            //                     /*onClick={}="document.getElementById('registration_form').style.display='none';return false;" */
            //                     href="" 
            //                     style={{textDecoration: "none",
            //                             color: "#383838",
            //                             fontSize: "14px",
            //                             display: "block",
            //                             height: "40px",
            //                             backgroundColor: "#fff",
            //                             lineHeight: "40px",
            //                             paddingLeft: "10px"}}>
            //                     <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to Login</a>
                                
            //                 <section>
            //                     <div className="wizard">								
            //                         <form role="form">
            //                             <div className="tab-content">
            //                                 <h3>Please provide your Login Details</h3>		
            //                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                        
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Name of the Company</div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="name" type="name" id="name" value="" className="text-inputs" />
            //                                         </div>
                                                        
            //                                     </div>
                                                        
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Name of the Recruiter</div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="name" type="name" id="name" value="" className="text-inputs" />
                                                                
            //                                         </div>
            //                                     </div>
                                                
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Corporate Website</div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="name" type="name" id="name" value="" className="text-inputs" />
                                                                
            //                                         </div>
            //                                     </div>
                                                        
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Corporate email ID</div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="Email" type="email" id="email" value=""  className="text-inputs" />
            //                                             <span id="emailError"></span>
            //                                         </div>
            //                                     </div>
                                                
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Contact Number</div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="name" type="text" id="name" value="" className="text-inputs" />
            //                                         </div>
            //                                     </div>
                                                        
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Password <span>(6 or more characters)</span></div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="name" type="password" id="password" value=""  className="text-inputs" />
            //                                             <span id="passwordError"></span>
            //                                         </div>
            //                                     </div>
                                                
            //                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
            //                                         <div className="col-lg-12 legend" style={{padding:"0px"}}>Re-enter Password</div>
            //                                         <div className="col-lg-12" style={{padding:"0px"}}>
            //                                             <input name="name" type="password" id="password" value=""  className="text-inputs" />
            //                                             <span id="passwordError"></span>
            //                                         </div>
            //                                     </div>
                                                        
            //                                 </div>
                                                    
            //                                 <div className="col-lg-12" style={{padding:"0px"}}>
            //                                     <button type="button" className="btn btn-primary next-step submit-button" id="submit" data-toggle="modal" data-target=".bd-example-modal-sm">submit</button>
            //                                 </div>
                                            
                                                
            //                                 <div className="clearfix"></div>
            //                             </div>
            //                         </form>
            //                     </div>
            //                 </section>
    
            //             </div>
                    
            //             <img src="img/login-logo.png" />
            //         </div>
            //     </div>
            // </div>