import React, { useState } from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import msLogo from "../imgs/ms-logo.jpg";

export default function CustReportGen() {
    // const currDate = new Date();

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const currDate = dd + "/" + mm + "/" + yyyy;

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
    const [numOfPanels, setNumOfPanels] = useState("");
    const [panelDetails, setPanelDetails] = useState("");
    const [panelDamageType, setPanelDamageType] = useState("");
    const [panelDamageLocation, setPanelDamageLocation] = useState("");
    // const [panelImage, setPanelImage] = useState("");

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
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
                1: { columnWidth: "auto" },
                2: { fontStyle: "bold" },
                3: { columnWidth: "auto" },
            },
        };

        doc.addImage(msLogo, 20, 20, 200, 40);
        const dealerData = [
            ["Dealer Name:", dealerName, "", ""],
            ["City/Location:", dealerLocation, "", ""],
            ["Date", dealerDate, "", ""],
        ];

        doc.autoTable(["DEALER DETAILS", "", "", ""], dealerData, tableConfig);

        const customerData = [
            ["Name of the customer", customerName, "", ""],
            ["Mobile Number", customerMobile, "", ""],
            ["Email Id", customerEmail, "", ""],
        ];
        doc.autoTable(
            ["CUSTOMER DETAILS", ""],
            customerData,
            tableConfig
        );

        const vehicleData = [
            ["Vehicle Registration Number", vehicleRegNo, "", ""],
            ["Vehicle Model", vehicleModel, "", ""],
            ["Odometer Reading: ", odoReading, "", ""],
            ["Sale Date", vehicleSaleDate, "", ""],
            ["Chassis Number", vehicleChassisNo, "", ""],
            ["DAMAGE DETAILS", "", "", ""],
            ["Number of Panel damaged", numOfPanels, "", ""],
        ];
        doc.autoTable(["VEHICLE DETAILS", "", "", ""], vehicleData);

        // Add table to the PDF
        // Save the PDF

        doc.addPage();
        doc.addImage(msLogo, 20, 20, 200, 40);
        const panelsData = [
            ["Which body panel(s) require repair?", panelDetails, "", ""],
            [
                "What type of damage is present on the panel(s)?",
                panelDamageType,
                "",
                "",
            ],
            [
                "Where is the damage located on the panel(s)?",
                panelDamageLocation,
                "",
                "",
            ],
        ];
        doc.autoTable(["PANEL 1", "", "", ""], panelsData, tableConfig);

        doc.addPage();
        doc.setFont("Helvetica", "bold");
        doc.text(0, 0, "DEALER DETAILS");
        doc.save("customer-report.pdf");
    };

    return (
        <div className="customer-input">
            <form onSubmit={handleSubmit}>
                <label>
                    Dealer Name:
                    <input
                        type="text"
                        value={dealerName}
                        onChange={(e) => handleInputChange(e, setDealerName)}
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
                        onChange={(e) => handleInputChange(e, setDealerDate)}
                    />
                </label>
                <br />
                <hr />
                <label>
                    Customer Name:
                    <input
                        type="text"
                        value={customerName}
                        placeholder={"Anup Mahato"}
                        onChange={(e) => handleInputChange(e, setCustomerName)}
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
                        onChange={(e) => handleInputChange(e, setCustomerEmail)}
                    />
                </label>
                <br />
                <hr />
                <label>
                    Vehicle Registration Number:
                    <input
                        type="text"
                        value={vehicleRegNo}
                        onChange={(e) => handleInputChange(e, setVehicleRegNo)}
                    />
                </label>
                <br />
                <label>
                    Vehicle Model:
                    <input
                        type="text"
                        value={vehicleModel}
                        onChange={(e) => handleInputChange(e, setVehicleModel)}
                    />
                </label>
                <br />
                <label>
                    Vehicle Model:
                    <input
                        type="text"
                        value={odoReading}
                        placeholder={"10000 km"}
                        onChange={(e) => handleInputChange(e, setOdoReading)}
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
                <label>
                    Number of Panels:
                    <input
                        type="number"
                        value={numOfPanels}
                        onChange={(e) => handleInputChange(e, setNumOfPanels)}
                    />
                </label>
                <br />
                <label>
                    Panel Details:
                    <input
                        type="text"
                        value={panelDetails}
                        onChange={(e) => handleInputChange(e, setPanelDetails)}
                    />
                </label>
                <br />
                <label>
                    Panel Damage Type:
                    <input
                        type="text"
                        value={panelDamageType}
                        onChange={(e) =>
                            handleInputChange(e, setPanelDamageType)
                        }
                    />
                </label>
                <br />
                <label>
                    Panel Damage Location:
                    <input
                        type="text"
                        value={panelDamageLocation}
                        onChange={(e) =>
                            handleInputChange(e, setPanelDamageLocation)
                        }
                    />
                </label>
                <br />
                <label>
                    Panel Image:
                    <input
                        type="file"
                        multiple
                        // onChange={(e) => setPanelImage(e.target.files)}
                    />
                </label>
                <br />
                <Button type="submit">Generate Report</Button>
            </form>
        </div>
    );
}
