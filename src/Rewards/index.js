import React, {useState} from 'react';
import MonthSelector from '../MonthSelector';
import {months} from '../Utils/months';
import ClientList from '../ClientList';

const Rewards = (props) =>{
    const [monthsRange, setMonthsRange] = useState({begin:0, end:2});

    const updateMonth = (event) =>{
        const selected = event.target.selectedIndex;
        const lastMonth = (selected + 2) < months.length ? (selected + 2) : months.length-1 ;
        setMonthsRange({begin: selected, end: lastMonth});
    }

    return (
        <div className='container'>
            <MonthSelector onSelect={updateMonth}  monthBegin={monthsRange.begin} monthEnd={monthsRange.end}/>
            <ClientList monthBegin={monthsRange.begin} monthEnd={monthsRange.end}/>
        </div>
    );
}

export default Rewards;