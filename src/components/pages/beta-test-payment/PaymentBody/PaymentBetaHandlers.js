import { fetchStudents, fetchPayments } from "../../../../services/paymentBetaServices";

export const fetchStudentsNames = async (setStudents) => {
    try {
        const students = await fetchStudents();
        const names = students.map(student => student.first_name)
        setStudents(names);
    } catch (error) {
        console.error('Error fetching leads:', error);
    }
};

export const fetchPaymentData = async (setPayments) => {
    try {
        const payments = await fetchPayments();

        const paymentIDs = payments.map(payment => payment.payment_id)
        setPayments(paymentIDs);
    } catch (error) {
        console.error('Error fetching leads:', error);
    }
};