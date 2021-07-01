import React from 'react';
import {Modal, ModalFooter, ModalHeader, ModalBody, Button} from 'reactstrap';
import { months } from '../Utils/months';

const ModalClient = (props) =>{
    const {showModal,handleClose,client,totalPoints,getPointsFromPrice} = props;
    let total = 0;
    let currentMonth = -1;
    const getOrderedPurchases =purchases=>{
        return purchases.sort((a,b) =>{
            if(a.date < b.date)
                return -1;
            if(a.date > b.date)
                return 1;
            return 0;
        });
    }
    const orderedPurchases = getOrderedPurchases(client.purchases);
    return (
        <Modal isOpen={showModal}>
            <ModalHeader toggle={handleClose}>{`${client.name} | ${totalPoints} pts.`}</ModalHeader>
            <ModalBody>
                <div className='d-inline-flex col-md-12'>
                    <div className='col-md-4'>Date</div>
                    <div className='col-md-4'>Payment</div>
                    <div className='col-md-4'>Points</div>
                </div>
                <hr/>
                {
                    orderedPurchases.map((element,index) => {
                        const month = parseInt(element.date.substring(0,2))-1;
                        const nextMonth = ((index+1)< orderedPurchases.length)? parseInt(orderedPurchases[index+1].date.substring(0,2))-1 : -1;
                        const currentPoints = getPointsFromPrice(element.price);
                        let finalize = false;
                        let initialize = false;
                        if(month != currentMonth){
                            total = currentPoints;
                            initialize = true;
                            currentMonth = parseInt(element.date.substring(0,2))-1;
                        }else{
                            total += currentPoints;
                        }
                        if(currentMonth != nextMonth){
                            finalize = true;
                        }
                        return(
                            <>
                            {initialize && <hr/>}
                            {
                                initialize && <div className='d-inline-flex col-md-12'>
                                    <div className='col-md-4'>{}</div>
                                    <div className='col-md-4 '><b>{months[month]}</b></div>
                                    <div className='col-md-4'>{}</div>
                                </div>
                            }
                            <div className='d-inline-flex col-md-12'>
                                <div className='col-md-4'>{element.date}</div>
                                <div className='col-md-4'>{element.price}</div>
                                <div className='col-md-4'>{currentPoints}</div>
                            </div>
                            {finalize && <hr/>}
                            {
                                finalize && <div className='d-inline-flex col-md-12'>
                                    <div className='col-md-4'>{}</div>
                                    <div className='col-md-4'>Total Points</div>
                                    <div className='col-md-4'>{total}</div>
                                </div>
                            }
                            {finalize && <hr/>}
                            </>
                        );
                    })
                }
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={handleClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalClient;