'use strict'

import '../sass/style.sass';
import DOMColoredPoint from './modules/types/DOMColoredPoint';
import CustomForm from './objects/form/CustomForm';
import { LabCounter } from './objects/labCounter/LabCounter';
import { Plane2D } from './objects/plane/Plane2D';
import PlaneManager from './objects/plane/PlaneManager';
import CoordsTable from './objects/table/CoordsTable';


var planes : PlaneManager = new PlaneManager();
var coordsTable : CoordsTable | null = null;
var customForm : CustomForm | null = null;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

async function onDOMContentLoaded() {

    // COUNTER

    const labCounter = new LabCounter(
        document.getElementById("counter")!
    );

    // TABLE

    // const table : HTMLTableElement | null = document?.querySelector("#sn-form-result-table");
    
    // coordsTable = new CoordsTable(table!);

    // PLANES

    const canvases : NodeListOf<HTMLCanvasElement> | null = document.querySelectorAll(".sn-canvas-container > div > canvas");
    
    let radius = 1;
    for (let i = 0; i < canvases.length; i++) {
        let plane : Plane2D = new Plane2D(radius, canvases.item(i));
        planes.add(plane);
        radius += 0.5;
    }

    // @ts-ignore
    window.dots.forEach(dot => {

        let color : string = Plane2D.POINT_HIT_COLOR

        if (dot.hit == false) {color = Plane2D.POINT_MISS_COLOR}
        let point = new DOMColoredPoint(color, dot.x, dot.y, dot.r)
        planes.getByRadius(point.z)?.throwPoint(point)
    })

    const radiusRadios = document.querySelectorAll('input[name="R"]') as NodeListOf<HTMLInputElement>;
    radiusRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const r = parseFloat(radio.value);
            showPlaneByRadius(r);
        });
    });

    // FORM

    const defaultForm : HTMLElement | null = document?.querySelector(".sn-default-form");

    customForm = new CustomForm(defaultForm!);

    // ОБРАБОТКА БРОСКА
    document.addEventListener("sn-throw-point", (event) => (snThrowPointEvent(event)))

    showPlaneByRadius(1);
}

function snThrowPointEvent(event : Event) {
    const point : DOMPoint = (event as CustomEvent).detail;

    console.log("Отправляем в полет: ", point);

    customForm?.updateCoordinates(point.x, point.y, point.z);
    
    customForm?.submitButton?.click();
}

function showPlaneByRadius(targetRadius: number) {
    const containers = document.querySelectorAll(".sn-canvas-container > div");
    containers.forEach(container => {
        const r = parseFloat(container.getAttribute("data-radius") || "0");
        if (Math.abs(r - targetRadius) < 1e-6) {
            container.classList.remove("hidden");
        } else {
            container.classList.add("hidden");
        }
    });
}