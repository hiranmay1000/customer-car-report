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
    const [numOfPanels, setNumOfPanels] = useState("");
    const [panelDetails, setPanelDetails] = useState("");
    const [panelDamageType, setPanelDamageType] = useState("");
    const [panelDamageLocation, setPanelDamageLocation] = useState("");
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
                1: { columnWidth: "auto" },
                2: { fontStyle: "bold" },
                3: { columnWidth: "auto" },
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
                "Vehicle Registration Number",
                vehicleRegNo,
                "Vehicle Model",
                vehicleModel,
            ],
            [
                "Odometer Reading: ",
                odoReading,
                "Chassis Number",
                vehicleChassisNo,
            ],
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
            ["Number of Panel damaged", numOfPanels, "", ""],
            ["", "", "", ""],
            ["PANEL 1"],
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
            ["", "", "", ""],
            ["PANEL 2"],
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
        doc.autoTable(["DAMAGE DETAILS", "", "", ""], damageData, tableConfig2);

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

        // Save the PDF to a local file
        // doc.save("example.pdf");

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

    const formHandle = (e) => {
        document.getElementById("form").innerHTML =
            "<label>Input: <input type='text' /></label>";
    };

    return (
        <>
            <div className="customer-input">
                <form onSubmit={handleSubmit} onClick={formHandle}>
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
                    <div id="form"></div>
                    <br />
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

const ImgPrevComp = (ipc) => {
    return (
        <div className="preview-panel-img my-5">
            <h3>PREVIEW</h3>
            <div className="images">
                {ipc.panelImage &&
                    ipc.panelImage.map((image, index) => {
                        return (
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
                        );
                    })}
            </div>
        </div>
    );
};
