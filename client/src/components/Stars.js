import React from 'react'
import { FaStar } from "react-icons/fa";
const Stars = ({ rating }) => {
    return (
        <div> {[1, 2, 3, 4, 5].map((value) => {
            return (
                <span
                    key={value}
                    className={value <= rating ? "on" : "off"}
                >
                    <FaStar />
                </span>
            );
        })}</div>
    )
}

export default Stars