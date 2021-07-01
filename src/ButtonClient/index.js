import React, {useState, useEffect} from 'react';
import {months} from '../Utils/months';
import ModalClient from '../ModalClient';
import {POINTS_AFTER_100, POINTS_AFTER_50} from '../Utils/constants.js';

const ButtonClient = (props) =>{
    const {monthBegin, client} = props;
    const {name, purchases} = client;
    const [points, setPoints] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const getPoints = () =>{
        const result = [
            {
                'month': null,
                'points': 0
            },{
                'month': null,
                'points': 0
            },{
                'month': null,
                'points': 0
            }
        ];
        purchases.forEach(purchase => {
            const purchaseMonth = parseInt(purchase.date.substring(0,2))-1;
            const purchasePriceInt = parseInt(purchase.price);
            const index = purchaseMonth - monthBegin;
            let points = result[index].points;
            points = points + getPointsFromPrice(purchasePriceInt);
            result[index].points = points;
        });
        for(let i = 0; i< result.length; i++){
            result[i].month = months[i+monthBegin];
        }
        return result;
    }

    const getPointsFromPrice = purchasePriceInt =>{
        let points = ((purchasePriceInt - 100) * POINTS_AFTER_100)+(purchasePriceInt - 50) * POINTS_AFTER_50;
        if(points < 0){
            points = 0;
        }
        return points;
    }

    const getTotalPoints=(points)=>{
        let total = 0;

        points.forEach(element => {
            total += element.points;
        });
        return total;
    }

    const handleClose=(event)=>{
        setShowModal(false);
    }

    const onShow=(event)=>{
        setShowModal(true);
    }

    useEffect(()=>{
        setPoints(getPoints());
    },[showModal])
    let total = getTotalPoints(points);
    return (
        <div>
        <button type='button' className='border border-light col-md-12 d-inline-flex btn btn-secondary btn-lg btn-block' onClick={onShow}>
            <div className="col-md-3 buttonName">
                {name}
            </div>
            <div className="col-md-2 buttonTotalPoints">
                Total: {total} pts.
            </div>
            <div className="col-md-7 buttonPoints d-inline-flex">
                {
                    points.map((month,index) =>{
                        if(month.month){
                            return (
                                <div key={`buttonMonth_${index}`} className={`col-md-4 buttonMonth_${index}`}>
                                    {`${month.month} ${month.points} pts.`}
                                </div>
                            )
                        }else{
                            return null;
                        }
                    })
                }
            </div>
        </button>
        <ModalClient showModal={showModal} handleClose={handleClose} client={client} totalPoints={total} getPointsFromPrice={getPointsFromPrice}/>
        </div>
    );
}

export default ButtonClient;