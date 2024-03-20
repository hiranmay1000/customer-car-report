import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import jsPDF from "jspdf";
import "jspdf-autotable";
import msLogo from "../imgs/ms-logo.jpg";
import msLogoHead from "../imgs/ms-logo-png-v.png";
import FinalizeCustData from "./FinalizeCustData";
import ImgPrevComp from "./ImgPrevComp";
import LogoBanner from "./LogoBanner";
import Footer from "./Footer";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import RenderNewPanels from "./RenderNewPanels";




export default function CustReportGen() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const defCurrDate = dd + "-" + mm + "-" + yyyy;

    const [dealerName, setDealerName] = useState("Bhandari Auto");
    const [dealerLocation, setDealerLocation] = useState("Kolkata");
    const [dealerDate, setDealerDate] = useState(defCurrDate);

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
    const [panelData, setPanelData] = useState([]);
 

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    // Vehicle number is in capital
    const handleInputChangeForRegNum = (e, setter) => {
        let val = e.target.value.toUpperCase(); 
        setter(val);
    }




    const addDetailsToPdf = (doc) => {
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

        doc.addImage(msLogo, 30, 15, 85, 18); // Maruti Suzuki logo top left
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
                1: { cellWidth: "auto" },
                2: { fontStyle: "bold" },
                3: { cellWidth: "auto" },
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
                1: { cellWidth: "auto" },
                2: { fontStyle: "bold" },
            },
        };

        // Damaged panels data
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
    }


    const addImagesToPdf = async (mydoc) => {
        // const mydoc = new jsPDF("portrait", "px", "a4", "false");
        let x = 0; // Current x-coordinate for the image
        let y = 0; // Current y-coordinate for the image
        const pageWidth = mydoc.internal.pageSize.getWidth();
        const pageHeight = mydoc.internal.pageSize.getHeight();

        for (let i = 0; i < panelImage.length; i++) {
            const img = new Image();
            img.src = panelImage[i];
            await new Promise((resolve) => {
                img.onload = () => resolve();
            });

            const isLandscape = img.width > img.height;

            let width, height, rotation;
            if (isLandscape) {
                width = pageWidth / 2; // Adjust image width for landscape pictures
                height = (img.height * width) / img.width;
                rotation = 0; // No rotation needed for landscape images
            } else {
                width = pageWidth / 2; // Adjust image width for portrait pictures
                height = (img.height * width) / img.width;
                // rotation = -90; /// Rotate portrait images by 90 degrees
            }

            // Check if there is enough space on the current line for the image
            if (x + width > pageWidth) {
                // Move to the next line
                x = 0;
                y += height;
                
                // Check if the image exceeds the page height
                if (y + height > pageHeight) {
                    mydoc.addPage(); // Add a new page if not enough space
                    x = 0; // Reset x-coordinate for the new page
                    y = 0; // Reset y-coordinate for the new page
                }
            }

            // Add the image to the mydocument with border space
            const borderSpace = 7; // Adjust border space as needed
            if (rotation === -90) {
                // Shift the x-coordinate for rotated images to avoid overlap
                mydoc.addImage(img, "JPEG", x + borderSpace, y +  borderSpace, height - 2 * borderSpace, width - 2 * borderSpace, '', 'FAST', rotation);
            } else {
                mydoc.addImage(img, "JPEG", x + borderSpace, y + borderSpace, width - 2 * borderSpace, height - 2 * borderSpace, '', 'FAST', rotation);
            }
            
            // Update x-coordinate for the next image
            x += width;

            // If there are more images and space is still available, add a new page
            if (i !== panelImage.length - 1 && y + height > pageHeight) {
                mydoc.addPage();
                x = 0; // Reset x-coordinate for the new page
                y = 0; // Reset y-coordinate for the new page
            }
        }

        mydoc.save("customer-report");
    };





    const handleDateFormat = (date) => {
        const breakDate = date.split("-");
        let yyyy = breakDate[0];
        let mm = breakDate[1];
        let dd = breakDate[2];

        const formattedDate = dd + "-" + mm + "-" + yyyy;
        console.log(formattedDate);
        return formattedDate;
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








        
    const handleSubmit = (e) => {
        e.preventDefault();
        const doc = new jsPDF("portrait", "px", "a4", "false"); // Initialize blank pdf page

        // add details
        addDetailsToPdf(doc);

        // add images
        if (panelImage.length > 0) {
            doc.addPage();
            addImagesToPdf(doc);
        }
    };



    



    return (
        <>
            <div className="customer-input">
                <div className="hero-logo">
                    <img src={msLogoHead} alt="Maruti Suzuki" />
                </div>
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
                    <label>
                        Dealer Date:
                        <input
                            type="date"
                            onChange={(e) =>
                                setDealerDate(handleDateFormat(e.target.value))
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
                            placeholder={"Full name"}
                            onChange={(e) =>
                                handleInputChange(e, setCustomerName)
                            }
                        />
                    </label>
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
                            type="text" value={vehicleRegNo} placeholder="WB66T5888"
                            onChange={(e) =>
                                handleInputChangeForRegNum(e, setVehicleRegNo)
                            }
                        />
                    </label>
                    <label>
                        Vehicle Model:
                        <input
                            type="text" value={vehicleModel} placeholder="Dezire ZXI+"
                            onChange={(e) =>
                                handleInputChange(e, setVehicleModel)
                            }
                        />
                    </label>
                    <label>
                        Odometer Reading:
                        <input
                            type="number"
                            value={odoReading} placeholder={"In Km"} onChange={(e) =>
                                handleInputChange(e, setOdoReading)
                            }
                        />
                    </label>
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
                    <label>
                        Sale Date:
                        <input
                            type="date"
                            onChange={(e) =>
                                setVehicleSaleDate(
                                    handleDateFormat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <br />

                    <hr />
                    <br />
                    <h3>PANEL DETAILS</h3>
                    <br />
                    <div>
                        {/* <div>{renderNewPanels()}</div> */}
                        <RenderNewPanels 
                            panelData = {panelData}
                            setPanelData = {setPanelData}
                            panels = {panels}
                        />
                    </div>

                    <div id="add-rmv-panel-btn">
                        <button type="button" id="delete-panel-btn" onClick={deletePanel}>
                            <FaMinusCircle />
                        </button>
                        <button type="button" id="add-panel-btn" onClick={addPanel}>
                            <FaPlusCircle />
                        </button>
                    </div>

                    <br />
                    <h3 style={{textAlign: "center"}}>Total damaged panels: {cntDamagedPanel}</h3>
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
                    <p><strong>Note: </strong>Please upload images in<span style={{background: "#9accff"}}> <em>landscape mode</em> </span> only</p>
                    <br />
                    <label>
                        Panel Image:
                        <input id="image-upload-box" style={{height: "150px"}} type="file" multiple name="images" onChange={onSelectImgFile}/>
                    </label>

                    <br />
                    <ImgPrevComp
                        panelImage={panelImage}
                        setPanelImage={setPanelImage}
                    />
                    <br />
                    <hr />
                    <hr />
                    <Tippy content="Download PDF">
                        <div id="gen-report-btn-container">
                            <Button type="submit">Generate Report</Button>
                        </div>
                    </Tippy>
                    <hr />
                    <hr />

                </form>

                <LogoBanner />
            </div>

            <Footer />
        </>
    );
}
