import React from 'react';
import { NavLink } from 'react-router-dom';
import './report.css';
const Reports = () =>{
    return(
        <>
            <div className="reports_container">
                <div className="reports_main">
                    <div className="top_btn">
                        <h2>Monthly Report</h2>
                        <button>
                        <NavLink to="/monthlyreports">View Reports</NavLink>
                        </button>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default Reports;