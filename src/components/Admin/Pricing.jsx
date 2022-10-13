import React, {useState} from "react";
import './Pricing.scss'
import {SvgSelector} from "../../common/icons/SvgSelector";

export default function Pricing(){
    // const []
    return <div className="Pricing-container">
        <div className="Pricing-head">
            <input className='title-input' type="text" disabled value='Pricing Name'/>
            <button  className='title-edit'>Edit</button>
        </div>
        <div className="PricingBtns">
            <button className="PricingBtns-update">Update existing</button>
            <button className="PricingBtns-save">Save as new</button>
        </div>
        <div className="categories-container">
            <div className="categories__item categories__item-open"> 
                <div className="categories__item__header">123 <SvgSelector class='categories-item-arrow' id={true ? "arrow" : "arrow-rotate"} /></div>
                <div className="categories__item__body">
                    <div className="Pricing-head">
                        <input className='title-input' type="text" disabled value='Category'/>
                        <button  className='title-edit'>View brands</button>
                    </div>
                    <div className="checksamount">
                        <div className="checksamount-item">
                            <label htmlFor="checksamountmin">Min checks:</label>
                            <input id='checksamountmin' type="number" />
                        </div>
                        <div className="checksamount-item">
                            <label htmlFor="checksamountmax">Max checks:</label>
                            <input id='checksamountmax' type="number" />
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Amount</th>
                            <th>2h Price</th>
                            <th>12h Price</th>
                            <th>24h Price</th>
                        </tr>
                        </thead>
                        <tbody> 
                        <tr>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                        </tr>
                        <tr>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                        </tr>
                        <tr>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                        </tr>
                        <tr>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="addnew">+ Add new amount</div>
                    <div className="pickoneerror">Please enter all prices to add a bundle!</div>
                </div>
            </div>
            <div className="categories__item"> 
                <div className="categories__item__header">123 <SvgSelector class='categories-item-arrow' id={false ? "arrow" : "arrowsDown"} /></div>
                <div className="categories__item__body"></div>
            </div>
            <div className="categories__item "> 
                <div className="categories__item__header">123 <SvgSelector class='categories-item-arrow' id={false ? "arrow" : "arrowsDown"} /></div>
                <div className="categories__item__body"></div>
            </div>
        </div>
    </div>
}