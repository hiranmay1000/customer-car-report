import React, { useState } from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import msLogo from "../imgs/ms-logo.jpg";
// import msHeroLogo from "../imgs/ms-applogo.png";
// import PanelInput from "./PanelInput";

export default function CustReportGen() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const currDate = dd + "-" + mm + "-" + yyyy;

    const [dealerName, setDealerName] = useState("Bhandari Auto");
    const [dealerLocation, setDealerLocation] = useState("Kolkata");
    const [dealerDate, setDealerDate] = useState(currDate);

    const [customerName, setCustomerName] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [customerEmail, setCustomerEmail] = useState("@gmail.com");

    const [vehicleRegNo, setVehicleRegNo] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [odoReading, setOdoReading] = useState("");
    const [vehicleSaleDate, setVehicleSaleDate] = useState("");
    const [vehicleChassisNo, setVehicleChassisNo] = useState("");

    const [repairEst, setRepairEst] = useState(0);
    const [totalRepairEst, setTotalRepairEst] = useState(0);
    const [amtPayable, setAmtPayable] = useState(0);
    const [custPolicy, setCustPolicy] = useState("N/A");
    const [policyType, setPolicyType] = useState("N/A");
    const [insuProvider, setInsuProvider] = useState("N/A");
    const [isInterested, setIsInterested] = useState("N/A");

    const [panelBody, setPanelBody] = useState("N/A");
    const [panelType, setPanelType] = useState("N/A");
    const [panelLocation, setPanelLocation] = useState("N/A");
    const [damageSeverity, setDamageSeverity] = useState("N/A");

    const [panelImage, setPanelImage] = useState([]);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const marutiLogo = () => {
        doc.addImage(msLogo, 30, 15, 85, 18);
    };

    const doc = new jsPDF("portrait", "px", "a4", "false");
    const handleSubmit = (e) => {
        console.log(custPolicy);
        e.preventDefault();

        // Configure table layout and styling
        const tableConfig = {
            margin: { top: 80 },
            styles: { halign: "left" },
            columnStyles: {
                0: { fontStyle: "bold" },
                1: { cellWidth: "auto" },
                2: { fontStyle: "bold" },
                3: { cellWidth: "auto" },
            },
        };
        marutiLogo();
        doc.setFontSize(12);
        doc.text(370, 28, dealerDate);
        doc.setFontSize(15);
        doc.setTextColor("#777777");
        doc.setFont("Helvetica", "bold");
        doc.text(125, 55, `Dealer Name: ${dealerName} - ${dealerLocation} `);
        // First Table
        const customerData = [
            ["Name of the customer", customerName, "", ""],
            ["Mobile Number", customerMobile, "Email Id", customerEmail],
        ];
        doc.autoTable(
            ["CUSTOMER DETAILS", "", "", ""],
            customerData,
            tableConfig
        );

        const tableConfig2 = {
            columnStyles: {
                0: { fontStyle: "bold" },
                1: { columnWidth: "auto" },
                2: { fontStyle: "bold" },
                3: { columnWidth: "auto" },
            },
        };

        // Second Table
        const vehicleData = [
            [
                "Vehicle Registration No.",
                vehicleRegNo,
                "Vehicle Model",
                vehicleModel,
            ],
            ["Odometer Reading ", odoReading, "Chassis No.", vehicleChassisNo],
            ["Sale Date", vehicleSaleDate, "", ""],
            ["", "", "", ""],
        ];
        doc.autoTable(
            ["VEHICLE DETAILS", "", "", ""],
            vehicleData,
            tableConfig2
        );

        // Third Table
        const damageData = [
            ["", "", "", ""],
            ["PANEL 1"],
            ["Which body panel(s) require repair?", panelBody, "", ""],
            [
                "What type of damage is present on the panel(s)?",
                panelType,
                "",
                "",
            ],
            [
                "Where is the damage located on the panel(s)?",
                panelLocation,
                "",
                "",
            ],
            [
                "How severe is the damage on the panel(s)?",
                damageSeverity,
                "",
                "",
            ],
            ["", "", "", ""],
        ];

        doc.autoTable(["DAMAGE DETAILS", "", "", ""], damageData, tableConfig2);

        const tableConfigFinalize = {
            margin: { top: 80 },
            styles: { halign: "left" },
            columnStyles: {
                0: { fontStyle: "bold" },
                1: { cellWidth: "auto", halign: "right" },
                2: { fontStyle: "bold" },
                3: { cellWidth: "auto" },
            },
        };

        const finalizeData = [
            ["Customer has active policy: ", custPolicy],
            ["Type of policy ", policyType],
            ["Name of insurance provider ", insuProvider],
            ["Repair estimate", repairEst],
            ["Total repair estimate ", totalRepairEst],
            ["Amount payble by customer", amtPayable],
            ["Customer interested for repair ", isInterested],
        ];
        doc.autoTable(
            ["FINALIZE DETAILS", "", ""],
            finalizeData,
            tableConfigFinalize
        );

        // PDF Page 2
        const PAGE_WIDTH = 595; // A4 page width in pixels
        const PAGE_HEIGHT = 841; // A4 page height in pixels
        const MAX_IMAGE_WIDTH = PAGE_WIDTH - 60; // Maximum width available for the image on the page
        const MAX_IMAGE_HEIGHT = PAGE_HEIGHT - 60; // Maximum height available for the image on the page

        for (let i = 0; i < panelImage.length; i++) {
            const img = new Image();

            img.onerror = function () {
                console.error(`Error loading image ${panelImage[i]}`);
            };

            img.onload = (function (i) {
                return function () {
                    const imgAspectRatio = img.width / img.height;
                    let imgWidth = MAX_IMAGE_WIDTH;
                    let imgHeight = imgWidth / imgAspectRatio;
                    if (imgHeight > MAX_IMAGE_HEIGHT) {
                        imgHeight = MAX_IMAGE_HEIGHT;
                        imgWidth = imgHeight * imgAspectRatio;
                    }
                    doc.addPage();
                    doc.addImage(
                        panelImage[i],
                        "JPEG",
                        30,
                        60,
                        imgWidth / 3,
                        imgHeight / 3
                    );
                };
            })(i);

            img.src = panelImage[i];
        }

        doc.save("customer-report.pdf");
    };

    const onSelectImgFile = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArr = Array.from(selectedFiles);

        const imgArr = selectedFilesArr.map((file) => {
            return URL.createObjectURL(file);
        });
        setPanelImage(imgArr);
    };

    return (
        <>
            <div className="customer-input">
                <h1>FILL THE FORM</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <hr />
                    <br />
                    <h3>DEALER DETAILS</h3>
                    <br />
                    <label>
                        Dealer Name:
                        <input
                            type="text"
                            value={dealerName}
                            onChange={(e) =>
                                handleInputChange(e, setDealerName)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Dealer Location:
                        <input
                            type="text"
                            value={dealerLocation}
                            onChange={(e) =>
                                handleInputChange(e, setDealerLocation)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Dealer Date:
                        <input
                            type="date"
                            value={dealerDate}
                            min="1970-01-01"
                            onChange={(e) =>
                                handleInputChange(e, setDealerDate)
                            }
                        />
                    </label>
                    <br />
                    <hr />
                    <br />
                    <h3>CUSTOMER DETAILS</h3>
                    <br />
                    <label>
                        Customer Name:
                        <input
                            type="text"
                            value={customerName}
                            placeholder={"Anup Mahato"}
                            onChange={(e) =>
                                handleInputChange(e, setCustomerName)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Customer Mobile:
                        <input
                            type="text"
                            value={customerMobile}
                            placeholder="90XXXXXXX"
                            onChange={(e) =>
                                handleInputChange(e, setCustomerMobile)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Customer Email:
                        <input
                            type="text"
                            value={customerEmail}
                            placeholder="username@gmail.com"
                            onChange={(e) =>
                                handleInputChange(e, setCustomerEmail)
                            }
                        />
                    </label>
                    <br />
                    <hr />
                    <br />
                    <h3>VEHICLE DETAILS</h3>
                    <br />
                    <label>
                        Vehicle Registration Number:
                        <input
                            type="text"
                            value={vehicleRegNo}
                            onChange={(e) =>
                                handleInputChange(e, setVehicleRegNo)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Vehicle Model:
                        <input
                            type="text"
                            value={vehicleModel}
                            onChange={(e) =>
                                handleInputChange(e, setVehicleModel)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Odometer Reading:
                        <input
                            type="number"
                            value={odoReading}
                            placeholder={"In Km"}
                            onChange={(e) =>
                                handleInputChange(e, setOdoReading)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Sale Date:
                        <input
                            type="date"
                            value={vehicleSaleDate}
                            onChange={(e) =>
                                handleInputChange(e, setVehicleSaleDate)
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Chassis Number:
                        <input
                            type="text"
                            value={vehicleChassisNo}
                            onChange={(e) =>
                                handleInputChange(e, setVehicleChassisNo)
                            }
                        />
                    </label>
                    <br />

                    <hr />
                    <br />
                    <h3>PANEL DETAILS</h3>
                    <br />
                    <GetInputs
                        setPanelBody={setPanelBody}
                        panelBody={panelBody}
                        setPanelType={setPanelType}
                        panelType={panelType}
                        setPanelLocation={setPanelLocation}
                        panelLocation={panelLocation}
                        setDamageSeverity={setDamageSeverity}
                        damageSeverity={damageSeverity}
                    />
                    <br />
                    <br />

                    <hr />
                    <br />

                    <FinalizeCustData
                        handleInputChange={handleInputChange}
                        setRepairEst={setRepairEst}
                        setTotalRepairEst={setTotalRepairEst}
                        setAmtPayable={setAmtPayable}
                        setCustPolicy={setCustPolicy}
                        custPolicy={custPolicy}
                        setPolicyType={setPolicyType}
                        policyType={policyType}
                        setInsuProvider={setInsuProvider}
                        insuProvider={insuProvider}
                        setIsInterested={setIsInterested}
                        isInterested={isInterested}
                    />

                    <hr />
                    <br />
                    <h3>UPLOAD IMAGES</h3>
                    <br />
                    <label>
                        Panel Image:
                        <input
                            type="file"
                            multiple
                            name="images"
                            onChange={onSelectImgFile}
                        />
                    </label>

                    <br />
                    <ImgPrevComp
                        panelImage={panelImage}
                        setPanelImage={setPanelImage}
                    />
                    <br />
                    <Button type="submit">Generate Report</Button>
                </form>
            </div>
        </>
    );
}

const GetInputs = (gi) => {
    const [inputs, setInputs] = useState([
        {
            bodyPanel: "Select",
            damageType: "Select",
            damageLocation: "Select",
            damageSeverity: "Select",
            remarks: "",
        },
    ]);
    const [cntDamagedPanel, setCntDamagePanel] = useState(1);

    const addInput = () => {
        if (inputs.length < 15) {
            setInputs([
                ...inputs,
                {
                    bodyPanel: "",
                    damageType: "Select",
                    damageLocation: "Select",
                    damageSeverity: "Select",
                    remarks: "",
                },
            ]);
            const newInputs = [...inputs];
            setCntDamagePanel(newInputs.length + 1);
        } else {
            setCntDamagePanel("Maximum limit reached!");
        }
    };

    const deleteInput = () => {
        if (inputs.length > 0) {
            const newInputs = [...inputs];
            newInputs.splice(newInputs.length - 1, 1);
            setInputs(newInputs);
            setCntDamagePanel(newInputs.length);
        }
    };

    const handleInputChange = (value, index) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    return (
        <>
            <button type="button" id="add-panel-btn" onClick={addInput}>
                Add Damaged Panel
            </button>
            <button type="button" id="delete-panel-btn" onClick={deleteInput}>
                Delete Damage Panel
            </button>
            <br />
            <br />
            <h3>Total damaged panel: {cntDamagedPanel}</h3>
            <br />

            {inputs.map((value, index) => (
                <div key={`panel-${index}`} className="panel-inputs-increment">
                    <h3 style={{ textAlign: "center" }}>PANEL {index + 1}</h3>
                    <br />
                    <label>
                        Which body panel(s) require repair?
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {gi.panelBody}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    bodyPanel:
                                                        gi.setPanelBody(
                                                            "Front Bumper"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Front Bumper
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    bodyPanel:
                                                        gi.setPanelBody(
                                                            "Rear Bumper"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Rear Bumper
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    bodyPanel:
                                                        gi.setPanelBody(
                                                            "Side door"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Side doors
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    bodyPanel:
                                                        gi.setPanelBody(
                                                            "Rooftop"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Rooftop
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </label>
                    <br />
                    <label>
                        What type of damage is present on the panel(s)?
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {gi.panelType}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageType:
                                                        gi.setPanelType("Dent"),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Dent
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageType:
                                                        gi.setPanelType(
                                                            "Scratch"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Scratch
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageType:
                                                        gi.setPanelType(
                                                            "Crack"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Crack
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageType:
                                                        gi.setPanelType(
                                                            "Fracture"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Fracture
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageType:
                                                        gi.setPanelType("Rust"),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Rust
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </label>
                    <br />
                    <label>
                        Where is the damage located on the panel(s)?
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {gi.panelLocation}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageLocation:
                                                        gi.setPanelLocation(
                                                            "Top"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Top
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageLocation:
                                                        gi.setPanelLocation(
                                                            "Bottom"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Bottom
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageLocation:
                                                        gi.setPanelLocation(
                                                            "Upper Middle"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Upper Middle
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageLocation:
                                                        gi.setPanelLocation(
                                                            "Lower Middle"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Lower Middle
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageLocation:
                                                        gi.setPanelLocation(
                                                            "Left"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Left
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageLocation:
                                                        gi.setPanelLocation(
                                                            "Right"
                                                        ),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Right
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </label>
                    <br />
                    <label>
                        How severe is the damage on the panel(s)?:
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {gi.damageSeverity}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageSeverity: gi.setDamageSeverity("Minor"),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Minor
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageSeverity: gi.setDamageSeverity("Moderate"),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Moderate
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="nobtn"
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() =>
                                            handleInputChange(
                                                {
                                                    ...value,
                                                    damageSeverity: gi.setDamageSeverity("Severe"),
                                                },
                                                index
                                            )
                                        }
                                    >
                                        Severe
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </label>
                    <br />
                    <label>
                        Additional remarks:
                        <input
                            type={"text"}
                            placeholder={"Type here..."}
                            value={value.remarks}
                            onChange={(event) =>
                                handleInputChange(
                                    {
                                        ...value,
                                        remarks: event.target.value,
                                    },
                                    index
                                )
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}

            <br />
            <br />
        </>
    );
};

const FinalizeCustData = (fi) => {
    return (
        <>
            <h3>FINALIZE</h3>
            <br />
            <label>
                Customer has active policy:
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {fi.custPolicy}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                id="yesbtn"
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setCustPolicy("Yes");
                                }}
                            >
                                Yes
                            </button>
                        </li>
                        <li>
                            <button
                                id="nobtn"
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setCustPolicy("No");
                                }}
                            >
                                No
                            </button>
                        </li>
                    </ul>
                </div>
            </label>
            <br />
            <label>
                Type of policy:
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {fi.policyType}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setPolicyType("MI");
                                }}
                            >
                                MI
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setPolicyType("NON-MI");
                                }}
                            >
                                NON-MI
                            </button>
                        </li>
                    </ul>
                </div>
            </label>
            <br />
            <label>
                Name of insurance provider:
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {fi.insuProvider}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                id="yesbtn"
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setInsuProvider("SBI General");
                                }}
                            >
                                SBI General
                            </button>
                        </li>
                        <li>
                            <button
                                id="nobtn"
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setInsuProvider("Other");
                                }}
                            >
                                Other
                            </button>
                        </li>
                    </ul>
                </div>
            </label>
            <br />
            <label>
                Estimated cost of repair:
                <input
                    type="number"
                    onChange={(e) => {
                        fi.handleInputChange(e, fi.setTotalRepairEst);
                    }}
                />
            </label>
            <br />
            <label>
                Expected cost to be paid by customer after insurnace coverage:
                <input
                    type="number"
                    onChange={(e) => {
                        fi.handleInputChange(e, fi.setAmtPayable);
                    }}
                />
            </label>
            <br />
            <label>
                Customer interested for repair:
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {fi.isInterested}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setIsInterested("Yes");
                                }}
                            >
                                Yes
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setIsInterested("No");
                                }}
                            >
                                No
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                    fi.setIsInterested("Not Sure");
                                }}
                            >
                                Not sure
                            </button>
                        </li>
                    </ul>
                </div>
            </label>
            <br />
        </>
    );
};

const ImgPrevComp = (ipc) => {
    return (
        <div className="preview-panel-img my-5">
            <h3>PREVIEW IMAGES</h3>
            <div className="images">
                {ipc.panelImage &&
                    ipc.panelImage.map((image, index) => {
                        return (
                            <>
                                <div className="image" key={image}>
                                    <img
                                        src={image}
                                        alt={"panelImgs"}
                                        height="200"
                                    />
                                    <p>{index + 1}</p>
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            ipc.setPanelImage(
                                                ipc.panelImage.filter(
                                                    (e) => e !== image
                                                )
                                            );
                                        }}
                                    >
                                        Delete Image
                                    </button>
                                </div>
                            </>
                        );
                    })}
            </div>
        </div>
    );
};
