import { ElementController } from "../../modules/ElementController";

export

class LabCounter implements ElementController<HTMLElement> {

    rootElement: HTMLElement | null = null;

    internalCounter = 1;

    constructor(rootElement : HTMLElement) {
        this.setRootElement(rootElement);
    }

    setRootElement(el: HTMLElement | null): void {
        this.rootElement = el;
        this.rootElement!.addEventListener("click", () => this.increment());
    }

    private setValue() {
        this.rootElement!.innerHTML = this.internalCounter.toString();
        this.internalCounter -= 1;
    }

    private increment() {
        this.setValue()
    }
    
}