export

interface ElementController<T extends HTMLElement> {
    rootElement : T | null;
    setRootElement(el : T | null) : void;
}