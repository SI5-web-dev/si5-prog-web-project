import gsap from "gsap/all";
import {Linear} from 'gsap';

function NotFoundPage() {
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
            <p id="wrong-para">Uh Oh! Page non trouvée!</p>
        </div>
    )
}

export default NotFoundPage;