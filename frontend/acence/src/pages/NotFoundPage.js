import gsap from "gsap/all";
import {Linear} from 'gsap';
import { useContext} from 'react';
import {ThemeContext} from "../context/ThemeContext";

function NotFoundPage() {
    const { theme } = useContext(ThemeContext);
    function animate() {
        let t1 = gsap.timeline();
        let t2 = gsap.timeline();
        let t3 = gsap.timeline();

        t1.to("#cog1",
            {
                transformOrigin: "50% 50%",
                rotation: "+=360",
                repeat: -1,
                ease: Linear.easeNone,
                duration: 8
            });

        t2.to("#cog2",
            {
                transformOrigin: "50% 50%",
                rotation: "-=360",
                repeat: -1,
                ease: Linear.easeNone,
                duration: 8
            });

        t3.fromTo("#wrong-para",
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 1,
                stagger: {
                    repeat: -1,
                    yoyo: true
                }
            });
    }
    window.onload = animate ;

    return (
        <div className={`notFoundPage ${theme}`}>
            <div id="container404">
                <h1 id="first-four">4</h1>
                <div id="cog-wheel1">
                    <div id="cog1">
                        <div id="top"></div>
                        <div id="down"></div>
                        <div id="left-top"></div>
                        <div id="left-down"></div>
                        <div id="right-top"></div>
                        <div id="right-down"></div>
                        <div id="left"></div>
                        <div id="right"></div>
                    </div>
                </div>

                <div id="cog-wheel2">
                    <div id="cog2">
                        <div id="top"></div>
                        <div id="down"></div>
                        <div id="left-top"></div>
                        <div id="left-down"></div>
                        <div id="right-top"></div>
                        <div id="right-down"></div>
                        <div id="left"></div>
                        <div id="right"></div>
                    </div>
                </div>
                <h1 id="second-four">4</h1>
                <p id="wrong-para">Uh Oh! Page non trouv??e!</p>
            </div>
        </div>
    )
}

export default NotFoundPage;