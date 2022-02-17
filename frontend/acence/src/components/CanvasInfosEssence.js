import { Offcanvas } from "react-bootstrap";
import React, { useImperativeHandle, useState } from "react";
import "../styles/components/_canvasInfosEssence.scss"

const CanvasInfosEssence = React.forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useImperativeHandle(ref, () => ({

        getAlert() {
            handleShow();
        }

    }));

    function ShowServices() {
        let services = [];
        props.list.map(station => {
            if (station[2] === props.nameStation) {
                Array.prototype.forEach.call(station[5].service, service => {
                    services.push(service);
                })
            }
        })

        return (
            <>
                <div>Services :</div>
                <ul> {services.map(service => <li key={Math.random().toString(36).substring(2, 11)}>{service}</li>)} </ul>
            </>
        )
    }

    return (
        <div className="canvasInfos">
            <Offcanvas show={show} onHide={handleClose} placement="bottom">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.nameStation}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ShowServices />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
})

export default CanvasInfosEssence;
