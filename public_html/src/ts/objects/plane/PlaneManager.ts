import {Plane2D} from "./Plane2D";

export default

class PlaneManager {

    public plane2Dlist : Array<Plane2D> = new Array();
    
    public add(plane : Plane2D) : void {
        this.plane2Dlist.push(plane);
    }

    public get(index : number) : Plane2D {
        return this.plane2Dlist[index] as Plane2D;
    }

    public getByRadius(radius : number) : Plane2D | null {
        for (var i = 0; i < this.plane2Dlist.length; i++) {
            var plane = this.get(i);
            if (plane.radius == radius) return plane;
        }

        return null;
    }
}