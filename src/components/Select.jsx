import React, { useState } from "react"; 
import languages from "../languages";

function Select() {
    const [selectLanguage, setSelectLanguage] = useState("es-ES")
    return (
        <li>
        <select name="language" id="dropdown__list" className="dropdown__menu">
            <option value="">Spanish</option>
        </select>
    </li>
    )
}

export default Select;