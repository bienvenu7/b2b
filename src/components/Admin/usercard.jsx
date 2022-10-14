import React, {useState} from "react";
import './usercars.scss'

export function Usercard(){

    let [accountStatus, setAccountStatus] = useState('Restrict')
    const temarr = [
        {category:'general',available:100,spent:100,adjustment:0,needsave:true},
        {category:'test1',available:140,spent:88,adjustment:0,needsave:true},
        {category:'fdsdf',available:5,spent:52,adjustment:0,needsave:true},
        {category:'dfg',available:11,spent:1,adjustment:0,needsave:true},
        {category:'genegdgfdral',available:41,spent:74,adjustment:0,needsave:true},
    ]
    function onRadioChange (e){
        setAccountStatus(e.target.name)
    }

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
                    <input type="radio" id="Restrict" name="Restrict" checked={accountStatus === "Restrict"} onChange={onRadioChange}/>
                    <label htmlFor="Restrict">Restrict</label>
                </li>
                <li>
                    <input type="radio" id="Ban" name="Ban" checked={accountStatus === "Ban"} onChange={onRadioChange}/>
                    <label htmlFor="Ban">Ban</label>
                </li>
                <li>
                    <input type="radio" id="Delete" name="Delete" checked={accountStatus === "Delete"} onChange={onRadioChange}/>
                    <label htmlFor="Delete">Delete</label>
                </li>
            </ul>
            {accountStatus == 'Restrict' && <div className="accointstatus__dates">
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
            </div>}
            {accountStatus == 'Ban' && <div className="accointstatus__dates">
                <div className="accointstatus__dates__item">
                    <p>End date</p>
                    <input type="date" />
                </div>
                <div className="accointstatus__dates__item">
                    <p>End time</p>
                    <input type="time" />
                </div>
                <div className="accointstatus__dates__item">
                    <p>End time</p>
                    <input type="time" />
                </div>
                <div className="accointstatus__savebtn">
                    <button>Save</button>
                </div>
            </div>}
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
            {temarr.map((el,index)=>{
            return <tr key={index}>
                <td>{el.category}</td>
                <td>${el.available}</td>
                <td>${el.spent}</td>
                <td><input type="number" value={el.adjustment}/></td>
                <td><p className="save">save</p></td>
                <td><p className="del">X</p></td>
            </tr>
            })}
            </tbody>
            </table>
            <p className="warntext">Note: Use a negative sign (-) before credits to deduct from the customer`s balance</p>
        </div>
    </div>
}