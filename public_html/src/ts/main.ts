'use strict'

import '../sass/style.sass';
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


    const table : HTMLTableElement | null = document?.querySelector("#sn-form-result-table");

    coordsTable = new CoordsTable(table!);


    const canvases : NodeListOf<HTMLCanvasElement> | null = document.querySelectorAll(".sn-canvas-container > div > canvas");

    for (let i = 0; i < canvases.length; i++) {
        let plane : Plane2D = new Plane2D(i + 1, canvases.item(i));
        planes.add(plane);
    }

}