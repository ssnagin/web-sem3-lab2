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

    public activeTextField : HTMLInputElement | null = null;
    public dropdownButton : HTMLInputElement | null = null;
    public activeRadioButton : HTMLInputElement | null = null;

    submitButton: HTMLElement | null = null;

    constructor(form: HTMLElement) {
        this.setRootElement(form);

        this.submitForm();

        this.activeTextField!.oninput = (event) => {
            this.submitForm();
        }
        this.dropdownButton!.onchange = (event) => {
            this.submitForm();
        }
    }

    public setRootElement(element: HTMLElement): void {
        this.rootElement = element;
        this.errorElement = document.getElementById("error-field");
        
        this.dropdownButton = document.querySelector(".sn-default-form #x");
        console.log(this.dropdownButton?.value);
        // TEXT FIELD

        this.activeTextField = document.querySelector("#CoordY");
        this.activeTextField?.addEventListener("input", (e) => {
            CustomFormFormatter.formatFloatUserInput(e.target as HTMLInputElement);
        });

        // SUBMIT BUTTON

        // var submitBtn : HTMLElement | null = document.getElementById("form-submit");
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

    getActiveCheckboxes() : Array<HTMLInputElement> {

        let res : HTMLInputElement[] = new Array<HTMLInputElement>;

        let radiobtns : NodeListOf<HTMLInputElement> = document.querySelectorAll("#sn-form-1 input[type='radio']:checked");
        
        if (radiobtns.length != 1) return res;

        radiobtns.forEach((checkbox : HTMLInputElement) => {
            if (checkbox.checked) res.push(checkbox);
        });

        return res;
    }
    
    public submitForm() : void {

        try {
            CustomFormValidator.validate(this);
            this.errorElement!.innerHTML = "";

        } catch (error) {

            let e : FormValidationError = error as FormValidationError;
            this.errorElement!.innerHTML = e.name + " : " + e.message;
            
            return;
        }

        // let requestData = requestBuilder.buildJSON(this);

        // console.log("REQUEST DATA : ", requestData);
        
        // RequestManager.getInstance().sendRequest("/fcgi-bin/server.jar", requestData);
    }
}

