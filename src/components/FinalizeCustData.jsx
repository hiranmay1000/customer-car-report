import React from "react";

export default function FinalizeCustData(fi) {
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
}
