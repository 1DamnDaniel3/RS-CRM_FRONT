import React from "react";
import st from './paymentBeta.module.css'
import PaymentBody from "./PaymentBody/paymentBody";


const PaymentPage = () => {
    return(
        <div>
            <table className={st.Table}>
                <thead>
                    <tr>
                        <th className={`${st.Theader}`}>#</th>
                        <th className={`${st.Theader}`}>Student</th>
                        <th className={`${st.Theader}`}>Income</th>
                        <th className={`${st.Theader}`}>Global income</th>
                        <th className={`${st.Theader}`}>Expence</th>
                        <th className={`${st.Theader}`}>Global expence</th>
                        <th className={`${st.Theader}`}>Profit</th>
                    </tr>
                </thead>
            </table>
            <PaymentBody></PaymentBody>
        </div>
    )
}

export default PaymentPage;