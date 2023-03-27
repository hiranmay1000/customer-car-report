import React from "react";

import ciaz from "../imgs/ciaz.png";
import baleno from "../imgs/baleno.png";
import dzire from "../imgs/dzire.png";
import ertiga from "../imgs/ertiga.png";
import ignis from "../imgs/ignis.png";
import scross from "../imgs/scross.png";
import swift from "../imgs/swift.png";
import swiftsport from "../imgs/swiftsport.png";
import vitara from "../imgs/vitara.png";
import xl7 from "../imgs/xl7.png";
import alto from "../imgs/alto.png";
import spresso from "../imgs/spresso.png";
import celerio from "../imgs/celerio.png";
import jimmy from "../imgs/jimmy.png";
import scrossNorm from "../imgs/scross-norm.png";

import "../styles/LogoBanner.scss";

export default function LogoBanner() {
    return (
        <div className="logo-banner my-5">
            <div className="logo-scroller">
                <img src={ciaz} alt="" />
                <img src={dzire} alt="" />
                <img src={ertiga} alt="" />
                <img src={baleno} alt="" />
                <img src={ignis} alt="" />
                <img src={vitara} alt="" />
                <img src={scrossNorm} alt="" />
                <img src={scross} alt="" />
                <img src={swift} alt="" />
                <img src={swiftsport} alt="" />
                <img src={xl7} alt="" />
                <img src={alto} alt="" />
                <img src={spresso} alt="" />
                <img src={celerio} alt="" />
                <img src={jimmy} alt="" />
            </div>
        </div>
    );
}
