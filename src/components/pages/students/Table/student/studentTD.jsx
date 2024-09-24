import React from "react";
import st from './studentTD.module.css'

const StudentComponent = ({studentData}) => {


    return (
        <div>
            <table className={st.Table}>
                <tbody>
                    <tr>
                        <td className={`${st.ID} ${st.TableBody}`}></td>
                        <td className={`${st.FIO} ${st.TableBody}`}></td>
                        <td className={`${st.FIO} ${st.TableBody}`}></td>
                        <td className={`${st.FIO} ${st.TableBody}`}></td>
                        <td className={`${st.Phone} ${st.TableBody}`}></td>
                        <td className={st.TableBody}></td>
                        <td className={st.TableBody}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentComponent;