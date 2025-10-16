'use strict'

import '../sass/style.sass';
import { LabCounter } from './objects/labCounter/LabCounter';


document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

async function onDOMContentLoaded() {

    // COUNTER

    const labCounter = new LabCounter(
        document.getElementById("counter")!
    );

}