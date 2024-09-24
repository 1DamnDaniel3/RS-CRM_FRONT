import React, { useState, useEffect } from "react";
import st from './paymentBody.module.css'

import { fetchStudentsNames, fetchPaymentData } from './PaymentBetaHandlers' 

const PaymentBody = () => {

    // const [students, setStudents] = useState([]); 
    const [payment, setPayments] = useState([]); // СОБИРАЕТ АЙДИШНИКИ ОПЛАТЫ, ПО КОТОРЫМ ПОТОМ БУДЕТ УСТАНАВЛИВАТЬСЯ ОСТАЛЬНАЯ ИНФА ПОВТОРНЫМ ЗАПРОСОМ на бету 

    useEffect(()=>{
        fetchPaymentData(setPayments)
    }, [])

    useEffect(()=>{
        console.log(payment)
    }, [payment]) 


    return (
        <div>
            <table className={st.Table}>
                <tbody>


                    {/* {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={index}>
                                <td className={`${st.TableBody}`}>{index + 1}</td>
                                <td className={`${st.TableBody}`}>{student}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className={st.TableBody}>No students found</td>
                        </tr>
                    )} */}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentBody;
