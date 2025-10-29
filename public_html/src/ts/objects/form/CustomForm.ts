import { ElementController } from "../../modules/ElementController";
import FormValidationError from "../../modules/form/errors/FormValidationError";
// import { RequestManager } from "../../modules/requests/RequestManager";
import { CustomFormFormatter } from "./CustomFormFormatter";
import CustomFormValidator from "./CustomFromValidator";
// import FormRequestBuilder from "./FormRequestBuilder";

export default 

class CustomForm implements ElementController<HTMLElement> {

    rootElement : HTMLElement | null = null;

    errorElement : HTMLElement | null = null;

    activeTextField : HTMLInputElement | null = null;
    dropdownButton : HTMLInputElement | null = null;
    activeRadioButton : HTMLInputElement | null = null;

    submitButton: HTMLElement | null = null;

    constructor(form: HTMLElement) {
        this.setRootElement(form!);

        this.initListeners();

        this.validateValues();
    }

    private initListeners() {
        
        this.activeTextField!.oninput = (event) => {
            this.validateValues();
        }
        this.activeTextField?.addEventListener("input", (e) => {
            CustomFormFormatter.formatFloatUserInput(e.target as HTMLInputElement);
            this.validateValues();
        });
        // this.activeTextField?.addEventListener("change", (e) => {
        //     CustomFormFormatter.formatFloatUserInput(e.target as HTMLInputElement);
        //     this.validateValues();
        // });

        this.dropdownButton!.onchange = (event) => {
            this.validateValues();
        }

        const radios = this.rootElement!.querySelectorAll('input[name="z"]');
        radios.forEach(radio => {
            radio.addEventListener("change", () => this.validateValues());
        });
    }

    public setRootElement(element: HTMLElement): void {
        this.rootElement = element;
        this.errorElement = this.rootElement!.querySelector("#error-field");
        
        this.dropdownButton = this.rootElement!.querySelector("#x");
        console.log(this.dropdownButton?.value);
        // TEXT FIELD
        this.activeTextField = this.rootElement!.querySelector("#CoordY");

        // SUBMIT BUTTON

        this.submitButton = this.rootElement!.querySelector("#form-submit");
        // submitBtn?.addEventListener("click", (e : MouseEvent) => this.submitForm());
    }

    // private handleActiveButton(event: MouseEvent) {

    //     const clickedButton = event.target as HTMLInputElement;
        
    //     if (clickedButton.value == "reset") {
    //         this.activeButton = null;
    //         return;
    //     }

    //     this.activeButton = clickedButton;
    // }

    getActiveRadiobtns() : Array<HTMLInputElement> {

        let res : HTMLInputElement[] = new Array<HTMLInputElement>;

        let radiobtns : NodeListOf<HTMLInputElement> = document.querySelectorAll("#sn-form-1 input[type='radio']:checked");
        
        if (radiobtns.length != 1) return res;

        radiobtns.forEach((checkbox : HTMLInputElement) => {
            if (checkbox.checked) res.push(checkbox);
        });

        return res;
    }

    private roundToAllowedX(x: number): string {
        // Находим ближайшее из allowedXValues

        let allowedXValues : string[] = [];

        this.dropdownButton!.querySelectorAll("option").forEach(el => {
            allowedXValues.push(String(el.value));
        })

        let closest = allowedXValues[0];
        let minDiff = Math.abs(x - parseFloat(closest));
        for (let val of allowedXValues) {
            let diff = Math.abs(x - parseFloat(val));
            if (diff < minDiff) {
                closest = val;
                minDiff = diff;
            }
        }
        return closest;
    }


    public updateCoordinates(x: number, y: number, r: number): void;
    public updateCoordinates(point: DOMPoint): void;

    public updateCoordinates(xOrPoint: number | DOMPoint, y?: number, r?: number): void {
        if (xOrPoint instanceof DOMPoint) {

            this.updateCoordinates(xOrPoint.x, xOrPoint.y, xOrPoint.z);
            return;
        }

        const x = xOrPoint;
        const yVal = y!;
        const rVal = r!;

        if (this.dropdownButton) {
            const correctedX = this.roundToAllowedX(x);
            this.dropdownButton.value = correctedX;
        }
        if (this.activeTextField) {
            this.activeTextField.value = String(yVal);
            CustomFormFormatter.formatFloatUserInput(this.activeTextField);
        }

        const radios = this.rootElement!.querySelectorAll('input[name="z"]') as NodeListOf<HTMLInputElement>;
        radios.forEach(radio => {
            radio.checked = (radio.value === String(rVal));
        });

        this.validateValues(); // сразу валидируем после обновления
    }
    
    public validateValues() : void {

        try {
            CustomFormValidator.validate(this);
            this.errorElement!.innerHTML = "";

            this.submitButton!.hidden = false;

        } catch (error) {
            
            this.submitButton!.hidden = true;

            let e : FormValidationError = error as FormValidationError;
            this.errorElement!.innerHTML = e.name + " : " + e.message;
            
            return;
        }

        // let requestData = requestBuilder.buildJSON(this);

        // console.log("REQUEST DATA : ", requestData);
        
        // RequestManager.getInstance().sendRequest("/fcgi-bin/server.jar", requestData);
    }
}

