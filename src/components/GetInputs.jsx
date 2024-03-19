import React, { useState } from "react";

function GetInputs(gi) {
    const [cntDamagedPanel, setCntDamagePanel] = useState(1);
    const [panels, setPanels] = useState([
        {
            bodyPanel: "N/A",
            damageType: "N/A",
            damageSeverity: "N/A",
            remarks: "N/A",
        },
    ]);

    const addPanel = () => {
        if (panels.length < 15) {
            setPanels([
                ...panels,
                {
                    bodyPanel: "N/A",
                    damageType: "N/A",
                    damageSeverity: "N/A",
                    remarks: "N/A",
                },
            ]);
            setCntDamagePanel(panels.length + 1);
        } else {
            setCntDamagePanel("Maximum limit reached!");
        }
    };
    const deletePanel = () => {
        if (panels.length > 1) {
            const newInputs = [...panels];
            newInputs.splice(newInputs.length - 1, 1);
            setPanels(newInputs);
            setCntDamagePanel(panels.length - 1);
        }
    };

    const [panelData, setPanelData] = useState([]);
    const handleInputChange = (val, index, key) => {
        const newPanelData = [...panelData];
        newPanelData[index] = {
            ...newPanelData[index],
            [key]: val,
        };
        setPanelData(newPanelData);
    };

    const renderpanels = () => {
        return panels.map((panel, index) => (
            <>
                <div className="panel-inputs-increment">
                    <h3 style={{ textAlign: "center" }}>PANEL {index + 1}</h3>
                    <br />
                    <div key={panel}>
                        <br />
                        <label>
                            Which body panel(s) require repair?
                            <input
                                type="text"
                                onChange={(e) => {
                                    handleInputChange(
                                        e.target.value,
                                        index,
                                        "bodyPanel"
                                    );
                                }}
                            />
                        </label>
                        <br />
                        <label htmlFor="">
                            What type of damage is present on the panel(s)?
                            <select
                                value={panel.damageType}
                                onChange={(e) =>
                                    handleInputChange(
                                        e.target.value,
                                        index,
                                        "damageType"
                                    )
                                }
                            >
                                <option>Dent </option>
                                <option>Scratch</option>
                                <option>Crack</option>
                                <option>Fracture</option>
                                <option>Rust</option>
                            </select>
                        </label>
                        <br />
                        <label htmlFor="">
                            Damage severity:
                            <select
                                value={panel.damageSeverity}
                                onChange={(e) =>
                                    handleInputChange(
                                        e.target.value,
                                        index,
                                        "damageSeverity"
                                    )
                                }
                            >
                                <option>Select</option>
                                <option>Light</option>
                                <option>Moderate</option>
                                <option>Severe</option>
                            </select>
                        </label>{" "}
                        <br />
                        <label>
                            Remarks:
                            <input
                                type="text"
                                onChange={(e) => {
                                    handleInputChange(
                                        e.target.value,
                                        index,
                                        "remarks"
                                    );
                                }}
                            />
                        </label>
                        <br />
                        <br />
                    </div>
                </div>
            </>
        ));
    };

    return (
        <>
            <button type="button" id="add-panel-btn" onClick={addPanel}>
                Add Damage Panel
            </button>
            <button type="button" id="delete-panel-btn" onClick={deletePanel}>
                Delete Damage Panel
            </button>
            <br />
            <br />
            <h3>Total damaged panel: {cntDamagedPanel}</h3>
            <br />

            {/* <button onClick={addPanel}>Add panel</button>
                <button onClick={deletePanel}>Delete panel</button> */}
            <br />
            <br />
            <div>
                <form>{renderpanels()}</form>
            </div>
            <div>Total: {cntDamagedPanel}</div>
            <h5>
                Body Panels-:
                {panelData.map((panel) => JSON.stringify(panel))}
                <br />
            </h5>
            <br />
            <br />
        </>
    );
}

export default GetInputs;
