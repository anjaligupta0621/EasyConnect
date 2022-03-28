import React from 'react'
import { Link } from 'react-router-dom';
import Header from "./header.component";
import axios from 'axios';
import "./shortlistCandidate.component.css";

class ShortlistCandidate extends React.Component { 
    render(){
        return(
            <div className="shortList-Component">
            <Header />
            </div>
        )

    };
}
export default ShortlistCandidate;