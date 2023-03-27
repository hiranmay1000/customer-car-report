// import jsPDF from "jspdf";
import { useState } from "react";

function ExampleComponent() {
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

    // const doc = new jsPDF("portrait", "px", "a4", "false");
    const [panelData, setPanelData] = useState([]);
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const tableConfigPanels = {
    //         head: [["ALL PANELS DETAILS", ""]],
    //         headStyles: {
    //             fillColor: [116, 116, 112],
    //             textColor: [255, 255, 255],
    //             fontStyle: "bold",
    //         },
    //         columnStyles: {
    //             0: { fontStyle: "bold" },
    //             1: { columnWidth: "auto" },
    //             2: { fontStyle: "bold" },
    //         },
    //     };
    //     const allPanelData = panelData.map((panel, index) => {
    //         const { bodyPanel, damageType, damageSeverity, remarks } = panel;
    //         return [
    //             ["PANEL - " + (index + 1)],
    //             ["Body Panel: ", bodyPanel, "Damage Type: ", damageType],
    //             ["Damage Severity: ", damageSeverity, "Remarks:", remarks],
    //             ["", "", "", ""],
    //         ];
    //     });
    //     doc.autoTable(["", "", "", ""], allPanelData.flat(), tableConfigPanels);

    //     doc.save("file");
    // };

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
                <div key={panel}>
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
            </>
        ));
    };

    return (
        <>
            <div>
                <button onClick={addPanel}>Add panel</button>
                <button onClick={deletePanel}>Delete panel</button>
                <br />
                <br />
                <h3>Total damaged panel: {cntDamagedPanel}</h3>
                <br />
                <div>
                    <form>{renderpanels()}</form>
                </div>
                <br />
                <br />
                <div>Total: {cntDamagedPanel}</div>
                <h5>
                    Body Panels-:
                    {panelData.map((panel) => JSON.stringify(panel))}
                    <br />
                </h5>
            </div>
        </>
    );
}

export default ExampleComponent;
