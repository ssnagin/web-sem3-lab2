'use strict'

import '../sass/style.sass';
import CustomForm from './objects/form/CustomForm';
import { LabCounter } from './objects/labCounter/LabCounter';
import Plane2D from './objects/plane/Plane2D';
import PlaneManager from './objects/plane/PlaneManager';
import CoordsTable from './objects/table/CoordsTable';


var planes : PlaneManager = new PlaneManager();
var coordsTable : CoordsTable | null = null;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

async function onDOMContentLoaded() {

    // COUNTER

    const labCounter = new LabCounter(
        document.getElementById("counter")!
    );

    // TABLE

    const table : HTMLTableElement | null = document?.querySelector("#sn-form-result-table");

    coordsTable = new CoordsTable(table!);

    // PLANES

    const canvases : NodeListOf<HTMLCanvasElement> | null = document.querySelectorAll(".sn-canvas-container > div > canvas");

    for (let i = 0.5; i < canvases.length; i++) {
        let plane : Plane2D = new Plane2D(i + 1, canvases.item(i));
        planes.add(plane);
    }

    // FORM

    const defaultForm : HTMLElement | null = document?.querySelector(".sn-default-form");

    const form = new CustomForm(
        defaultForm!
    );
}