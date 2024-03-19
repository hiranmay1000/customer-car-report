import React, {useEffect, useState} from "react";
import "../styles/Footer.scss";
import { AiFillMail } from "react-icons/ai";

export default function Footer() {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        fetch("https://api.countapi.xyz/update/getdamagereport/visits/?amount=1")
        .then((res) => res.json())
        .then((res) => {
            setVisitorCount(res.value);
        });

    }, []);

    return (
        <div className="footer">
            <div className="total-vistor">
                <h5>TOTAL VISITORS</h5>
                <h5 id="update-visitor">{visitorCount}</h5>
            </div>
            <br />
            <div className="dev-mess">
                <h3>DEVELOPER SIDE </h3>
                <a href="mailto:hiranmay1000@gmail.com">
                    Report any issue here <AiFillMail />
                </a>
            </div>
        </div>
    );
}
