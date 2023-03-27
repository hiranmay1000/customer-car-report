import React, { useState } from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import msLogo from "../imgs/ms-logo.jpg";
import FinalizeCustData from "./FinalizeCustData";
import ImgPrevComp from "./ImgPrevComp";
import LogoBanner from "./LogoBanner";

export default function CustReportGen(main) {
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

    const [totalRepairEst, setTotalRepairEst] = useState(0);
    const [amtPayable, setAmtPayable] = useState(0);
    const [custPolicy, setCustPolicy] = useState("N/A");
    const [policyType, setPolicyType] = useState("N/A");
    const [insuProvider, setInsuProvider] = useState("N/A");
    const [isInterested, setIsInterested] = useState("N/A");

    const [panelImage, setPanelImage] = useState([]);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const marutiLogo = () => {
        doc.addImage(msLogo, 30, 15, 85, 18);
    };

    const doc = new jsPDF("portrait", "px", "a4", "false");
    const handleSubmit = (e) => {
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

        const tableConfigVehicle = {
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
            tableConfigVehicle
        );

        // Third Table
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

        const tableConfigPanels = {
            head: [
                [
                    {
                        content: "DAMAGE DETAILS",
                        colSpan: 4,
                        styles: { halign: "center" },
                    },
                ],
            ],
            headStyles: {
                fillColor: [116, 116, 112],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                colSpan: 4,
                halign: "center",
            },
            columnStyles: {
                0: { fontStyle: "bold" },
                1: { columnWidth: "auto" },
                2: { fontStyle: "bold" },
            },
        };

        const allPanelData = panelData.map((panel, index) => {
            const { bodyPanel, damageType, damageSeverity, remarks } = panel;
            return [
                ["PANEL " + (index + 1)],
                ["Body Panel: ", bodyPanel, "Damage Type: ", damageType],
                ["Damage Severity: ", damageSeverity, "Remarks:", remarks],
                ["", "", "", ""],
            ];
        });
        doc.autoTable(["", "", "", ""], allPanelData.flat(), tableConfigPanels);

        const finalizeData = [
            ["Customer has active policy ", custPolicy],
            ["Type of policy ", policyType],
            ["Name of insurance provider ", insuProvider],
            ["Total damaged panel", cntDamagedPanel],
            ["Total repair estimate ", totalRepairEst],
            ["Amount payble by customer", amtPayable],
            ["Customer interested for repair ", isInterested],
        ];
        doc.autoTable(
            ["REPAIR ESTIMATE AND CUSTOMER PREFERENCES", "", ""],
            finalizeData,
            tableConfigFinalize
        );

        // IMAGE PAGE
        // const PAGE_WIDTH = 595; // A4 page width in pixels
        // const PAGE_HEIGHT = 841; // A4 page height in pixels
        // const MAX_IMAGE_WIDTH = PAGE_WIDTH - 60; // Maximum width available for the image on the page
        // const MAX_IMAGE_HEIGHT = PAGE_HEIGHT - 60; // Maximum height available for the image on the page

        // var cnt = 0;
        for (let i = 0; i < panelImage.length; i++) {
            doc.addPage();
            doc.addImage(panelImage[i], "JPEG", 30, 60, 180, 100);
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
    const handleInputChange2 = (val, index, key) => {
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
                                    handleInputChange2(
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
                                    handleInputChange2(
                                        e.target.value,
                                        index,
                                        "damageType"
                                    )
                                }
                            >
                                <option>Select</option>
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
                        <br />
                        <label>
                            Remarks:
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
                        <br />
                    </div>
                </div>
            </>
        ));
    };

    return (
        <>
            <br />
            <br />
            <div className="customer-input">
                <h1>FILL THE FORM</h1>
                <br />
                <form onSubmit={handleSubmit} spellCheck={"false"}>
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
                    {/* <GetInputs /> */}

                    <button type="button" id="add-panel-btn" onClick={addPanel}>
                        Add Damage Panel
                    </button>
                    <button
                        type="button"
                        id="delete-panel-btn"
                        onClick={deletePanel}
                    >
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

                    <br />
                    <br />

                    <hr />
                    <br />

                    <FinalizeCustData
                        handleInputChange={handleInputChange}
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

                <LogoBanner/>
            </div>
        </>
    );
}
