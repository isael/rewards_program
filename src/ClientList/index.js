import React from 'react';
import {clients} from '../Utils/clients';
import ButtonClient from '../ButtonClient';
const ClientList = (props) =>{
    const {monthBegin, monthEnd} = props;
    const purchasesInMonthRange = (arrayPurchases)=>{
        const response = [];
        arrayPurchases.forEach(purchase =>{
            const monthPurchase = parseInt(purchase.date.substring(0,2)) - 1;
            if(monthBegin <= monthPurchase && monthPurchase <= monthEnd){
                response.push(purchase);
            }
        });
        return response;
    }
    return (
        <div>
            {
                clients.map((client,index) =>{
                    const purchases = purchasesInMonthRange(client.purchases)
                    if(purchases.length > 0){
                        client.purchases = purchases;
                        return <ButtonClient
                            key={client.name+index}
                            client={client}
                            monthBegin={monthBegin}
                            monthEnd={monthEnd}
                        />
                    }else{
                        return null
                    }
                })
            }
        </div>
    );
}

export default ClientList;