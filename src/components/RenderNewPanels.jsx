import React from 'react'

export default function RenderNewPanels(props) {


    const handleInputChange2 = (val, index, key) => {
        const newPanelData = [...props.panelData];
        newPanelData[index] = {
            ...newPanelData[index],
            [key]: val,
        };
        props.setPanelData(newPanelData);
    };


    

    const renderNewPanels = () => {
        return props.panels.map((panel, index) => (
            <React.Fragment key={index}>
                <div className="panel-inputs-increment">
                    <h3 style={{ textAlign: "center" }}>PANEL {index + 1}</h3>
                    <br />
                    <div>
                        <br />
                        <label>
                            Which body panel(s) require repair?
                            <input
                                type="text"
                                onChange={(e) => {
                                    handleInputChange2(
                                        e.target.value,
                                        index,
                                        "bodyPanel"
                                    );
                                }}
                            />
                        </label>
                        <label>

                            What type of damage is present on the panel?
                            <select
                                onChange={(e) =>
                                    handleInputChange2(
                                        e.target.value,
                                        index,
                                        "damageType"
                                    )
                                }
                            >
                                <option value={"Select"}>Select</option>
                                <option>Dent </option>
                                <option>Scratch</option>
                                <option>Crack</option>
                                <option>Fracture</option>
                                <option>Rust</option>
                            </select>
                        </label>
                        <label htmlFor="">
                            Damage severity:
                            <select
                                onChange={(e) =>
                                    handleInputChange2(
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
                        <label>
                            Remarks: &nbsp; &nbsp;
                            <input
                                type="text"
                                onChange={(e) => {
                                    handleInputChange2(
                                        e.target.value,
                                        index,
                                        "remarks"
                                    );
                                }}
                            />
                        </label>
                        <br />
                    </div>
                </div>
            </React.Fragment>
        ));
    };



  return (
    <div>
      {renderNewPanels()}
    </div>
  )
}
