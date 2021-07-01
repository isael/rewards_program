import React from 'react';
import {months} from '../Utils/months';
const MonthSelector = (props) =>{
    const {monthBegin, monthEnd,onSelect}= props;
    return (
        <div className='input-group'>
            <div class="col-md-3 input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Select the start month</label>
            </div>
            <select className='col-md-5 custom-select' onChange={onSelect}>
                {
                    months.map((month, index) => {
                        return <option key={index}>{month}</option>
                    })
                }
            </select>
            <span className='col-md-2 input-group-text'>From: {months[monthBegin]}</span>
            <span className='col-md-2 input-group-text'>To: {months[monthEnd]}</span>
        </div>
    );
}

export default MonthSelector;