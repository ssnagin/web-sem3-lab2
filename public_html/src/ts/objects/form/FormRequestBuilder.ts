// import RequestBuilder from "../../modules/requests/builders/RequestBuilder";
import CustomForm from "./CustomForm";


interface CoordinateSchema {
    x: number;
    y: number;
    r: number;
};

interface ResultSchema {
    coordinates: CoordinateSchema[];
};

// export default

// class FormRequestBuilder extends RequestBuilder<CustomForm> {

//     public build(form : CustomForm) : object {
        
        // let res: ResultSchema = {
        //     coordinates: []
        // };

        // let activeCheckboxes = form.getActiveCheckboxes();

        // console.log("ACTIVE CHECKBOXES", activeCheckboxes);

        // activeCheckboxes.forEach(activeCheckbox => {

        //     let result: CoordinateSchema = { x: 0, y: 0, r: 0 };

        //     result.x = Number.parseInt(
        //         form.activeButton!.getAttribute("value") as string
        //     );

        //     result.y = Number.parseFloat(
        //         form.activeTextField!.value as string
        //     );
        //     result.r = Number.parseInt(
        //         activeCheckbox.value as string
        //     )

        //     res.coordinates.push(result);
        // });

        // return res;
//     }
// }