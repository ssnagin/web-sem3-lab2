import {ElementController} from "../../modules/ElementController";

export default

class CoordsTable implements ElementController<HTMLTableElement> {

    rootElement!: HTMLTableElement;

    tbody : HTMLTableSectionElement | null = null;

    clearBtn : HTMLButtonElement | null = null;

    private localCounter : number = 1;
    
    setRootElement(el: HTMLTableElement): void {
        this.rootElement = el;

        this.tbody = this.rootElement.querySelector("tbody");
        
        if (!this.tbody) {
            this.tbody = this.rootElement.createTBody();
        }

        console.log("TBODY", this.tbody);

        this.clearBtn = document.querySelector("#clear-table");
        this.clearBtn?.addEventListener("click", () => this.clear());

        this.initializeTable();
    }

    private initializeTable(): void {
        if (this.tbody) {
            this.tbody.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Время</th>
                    <th>Наносекунды</th>
                    <th>x</th>
                    <th>y</th>
                    <th>r</th>
                    <th>Ответ</th>
                </tr>`;
            this.localCounter = 1;
        }
    }

    constructor(table : HTMLTableElement) {
        this.setRootElement(table);
    }
    
    clear(): void {
        if (!this.tbody) {
            console.error("TBODY is not initialized");
            return;
        }
        
        this.tbody.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Время</th>
                <th>Наносекунды</th>
                <th>x</th>
                <th>y</th>
                <th>r</th>
                <th>Ответ</th>
            </tr>`;
        this.localCounter = 1;
    }

    add(element : HTMLElement) : void {
        this.increment();
        this.tbody!.appendChild(element);
    }

    addRow(row : string) : void {
        this.increment();
        this.tbody!.innerHTML += row;
    }

    private increment() {
        this.localCounter++;
    }

    public getCounter() : number {
        return this.localCounter;
    }
}