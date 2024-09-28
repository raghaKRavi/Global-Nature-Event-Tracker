import { ICategoryData } from "./ICategoryData";
import { ISourceData } from "./ISourceData";

export interface IEventData {
    id: string,
    title: string,
    description: string,
    closed: string,
    categories: Array<ICategoryData>,
    sources: Array<ISourceData>,
    geometry: Array<IGeometryData>
}

export interface IGeometryData {
    magnitudeValue: number,
    magnitudeUnit: string,
    date: string,
    type: string,
    coordinates: Array<number>
}