import React from "react";
import './usercars.scss'

export default function Usercard(){

    return <div className="usercard-contaiter">
        <div className="title">
            <div className="title__name">
                <h5>Company Name</h5>
                <span className="title__name-date">Joined 10 March, 2022 at 1:30 PM </span>
                <span className="title__name-active">Active</span>
            </div>
            <div className="title__img"><div className="test"></div></div>
        </div>
        
    </div>
}