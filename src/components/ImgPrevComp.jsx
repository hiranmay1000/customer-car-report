import React from "react";

export default function ImgPrevComp(ipc) {
    return (
        <div className="preview-panel-img my-5">
            <h3>PREVIEW IMAGES</h3>
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
}
