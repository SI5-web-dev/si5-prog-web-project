import {Offcanvas} from "react-bootstrap";
import React, { useImperativeHandle, useState} from "react";

import "../styles/CanvasInfosEssence.css"


const CanvasInfosEssence = React.forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => ({

        getAlert() {
            handleShow();
        }

    }));

    return (
        <div id="canvasInfos">
            <Offcanvas show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.nameStation}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    info station
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
})

export default CanvasInfosEssence;
