import React, { useState } from "react";

export default function PanelInput() {
    const [inputFreq, setInputFreq] = useState(1);

    const getNum = (e) => {
        let num = e.target.value;
        setInputFreq(num);
    };

    return (
        <>
            <label>
                Number:
                <input type="number" value={inputFreq} onChange={getNum} />
            </label>
            <br />
            <label>
                Input:
                <input type="text" />
            </label>
        </>
    );
}
