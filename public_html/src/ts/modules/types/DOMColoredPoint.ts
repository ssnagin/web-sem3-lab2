import pickRandomColor from "../color/RandomColorPicker";

export default

class DOMColoredPoint extends DOMPoint {

    color: string = pickRandomColor();

    constructor(color?: string, x?: number, y?: number, z?: number, w?: number) {
        super(x,y,z,w);

        if (color == undefined) return;
        this.color = color;
    }
}