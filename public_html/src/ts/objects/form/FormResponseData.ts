export interface FormResponseData {
    status: string,
    coordinates: Coordinates[],
    time: string
    nanoseconds: string
}

export interface Coordinates {
    result: string,
    x: string,
    y: string,
    r: string
}