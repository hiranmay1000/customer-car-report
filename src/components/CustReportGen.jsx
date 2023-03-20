import React, { useState } from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import myImgs from "../custImg/bw-desktop.jpg";

export default function CustReportGen() {
    const [dealerName, setDealerName] = useState("");
    const [dealerLocation, setDealerLocation] = useState("");
    const [dealerDate, setDealerDate] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [vehicleRegNo, setVehicleRegNo] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleSaleDate, setVehicleSaleDate] = useState("");
    const [vehicleChassisNo, setVehicleChassisNo] = useState("");
    const [numOfPanels, setNumOfPanels] = useState("");
    const [panelDetails, setPanelDetails] = useState("");
    const [panelDamageType, setPanelDamageType] = useState("");
    const [panelDamageLocation, setPanelDamageLocation] = useState("");
    const [panelImage, setPanelImage] = useState("");

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const doc = new jsPDF("portrait", "px", "a4", "false");
        doc.addImage(panelImage, "jpg", 65, 20, 200, 400);
        doc.addPage();

        const tableData = [
            ["DEALER DETAILS", "", "", ""],
            ["Dealer Name:", dealerName, "", ""],
            ["City/Location:", dealerLocation, "", ""],
            ["Date", dealerDate, "", ""],
            ["CUSTOMER DETAILS", "", "", ""],
            ["Name of the customer", customerName, "", ""],
            ["Mobile Number", customerMobile, "", ""],
            ["Email Id", customerEmail, "", ""],
            ["VEHICLE DETAILS", "", "", ""],
            ["Vehicle Registration Number", vehicleRegNo, "", ""],
            ["Vehicle Model", vehicleModel, "", ""],
            ["Odometer Reading: ", vehicleModel, "", ""],
            ["Sale Date", vehicleSaleDate, "", ""],
            ["Chassis Number", vehicleChassisNo, "", ""],
            ["DAMAGE DETAILS", "", "", ""],
            ["Number of Panel damaged", numOfPanels, "", ""],
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

        // Configure table layout and styling
        const tableConfig = {
            styles: { halign: "left" },
            columnStyles: {
                0: { fontStyle: "bold" },
                1: { columnWidth: "auto" },
                2: { fontStyle: "bold" },
                3: { columnWidth: "auto" },
            },
        };
        // Add table to the PDF
        doc.autoTable(["", "", "", ""], tableData, tableConfig);
        // Save the PDF
        doc.save("customer-report.pdf");
    };

    return (
        <div>
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
                <label>
                    Customer Name:
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => handleInputChange(e, setCustomerName)}
                    />
                </label>
                <br />
                <label>
                    Customer Mobile:
                    <input
                        type="text"
                        value={customerMobile}
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
                        onChange={(e) => handleInputChange(e, setCustomerEmail)}
                    />
                </label>
                <br />
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
                        onChange={(e) => setPanelImage(e.target.files[0])}
                    />
                </label>
                <br />
                <Button type="submit">Generate Report</Button>
            </form>
        </div>
    );
}