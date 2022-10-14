import React from "react";
import './usercars.scss'

export function Usercard(){
    return <div className="usercard-contaiter">
        <div className="title">
            <div className="title__name">
                <h5>Company Name</h5>
                <span className="title__name-date">Joined 10 March, 2022 at 1:30 PM </span>
                <span className="title__name-active">Active</span>
            </div>
            <div className="title__img"><div className="test"/></div>
        </div>
        <div className="accountdata">
            <div className="accountdata__item">
                <p>Account number</p>
                <p>0203920111</p>
            </div>
            <div className="accountdata__item">
                <p>Company email</p>
                <p>email@email.com</p>
            </div>
            <div className="accointstatus">
            <ul>
                <li>
                    <input type="radio" id="Restrict" name="amount" />
                    <label htmlFor="Restrict">Restrict</label>
                </li>
                <li>
                    <input type="radio" id="Ban" name="amount" />
                    <label htmlFor="Ban">Ban</label>
                </li>
                <li>
                    <input type="radio" id="Delete" name="amount" defaultChecked/>
                    <label htmlFor="Delete">Delete</label>
                </li>
            </ul>
            <div className="accointstatus__dates">
                <div className="accointstatus__dates__item">
                    <p>End date</p>
                    <input type="date" />
                </div>
                <div className="accointstatus__dates__item">
                    <p>End time</p>
                    <input type="time" />
                </div>
                <div className="accointstatus__savebtn">
                    <button>Save</button>
                </div>
            </div>
            </div>
        </div>
        <h5>Credits</h5>
        <div className="addcategory">
            <select>
                <option>Пункт 1</option>
                <option>Пункт 2</option>
            </select>
            <button>Add Category</button>
        </div>
        <div className="tablecategory">
            <table className="tablecategory-table">
            <thead>
            <tr>
                <th>Category</th>
                <th>Available</th>
                <th>Spent</th>
                <th>Adjustment</th>
                <th aria-label='tablehead'/>
                <th aria-label='tablehead'/>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>General</td>
                <td>$100</td>
                <td>$100</td>
                <td><input type="text" /></td>
                <td><p className="save">save</p></td>
                <td><p className="del">X</p></td>
            </tr>
            <tr>
                <td>General</td>
                <td>$100</td>
                <td>$100</td>
                <td><input type="text" /></td>
                <td><p className="save">save</p></td>
                <td><p className="del">X</p></td>
            </tr>
            <tr>
                <td>General</td>
                <td>$100</td>
                <td>$100</td>
                <td><input type="text" /></td>
                <td><p className="save">save</p></td>
                <td><p className="del">X</p></td>
            </tr>
            </tbody>
            </table>
            <p className="warntext">Note: Use a negative sign (-) before credits to deduct from the customer`s balance</p>
        </div>
    </div>
}