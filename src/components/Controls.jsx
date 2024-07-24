import React from "react";
import Sound from "../images/sound_max_fill.svg"
import Copy from "../images/Copy.svg"

function Controls({voice}) {
    return (
        <ul class="controls__list">
                <li onClick={(e) => voice(e.target, "to")}className="icon"><img src={Sound} alt="" /></li>
                <li className="icon"><img src={Copy} alt="" /></li>
        </ul>
    )
}

export default Controls;