export interface InitialStateProps {
    isLoading: boolean,
    error: string | null,
    headers: Object
}

export interface IEonetState {
    categories: ICategory[],
    eventsParam: IEventParams,
    selectedCategories: Array<string>,
    coordinatesDetails: any[],
    visuals: IVisuals[],
    responseCategories: Array<string>,
    magnitudeData: Array<MetaData>
}

export interface IVisuals {
    count: number,
    category: string,
    metadata: MetaData[]
}

export type MetaData = {
    id: string,
    mValue: number,
    mUnit: string,
    date: string,
    goejson: {}
}

export interface EonetGeoJsonInitialState {
    success: boolean,
    body: Array<EventGeoJsonBodyStruct>
}

export interface ResponseBodyType {
    [key: string]: Array<EventGeoJsonBodyStruct>
}

export interface EventGeoJsonBodyStruct extends EventGeoJsonProperties {
    geometry: geometry,
    categories: ICategory
}

export interface EventGeoJsonProperties {
    id: string,
    title: string,
    description: string,
    closed: string,
    categories: Array<ICategory>,
    date: string,
    geometryDates: Array<string>,
    magnitudeValue: string,
    magnitudeUnit: number,
    sources: Array<sources>
}

export type sources = {
    id: string,
    url: string
}

export type geometry = {
    type: string,
    coordinates: Array<number>
}

export type geoJsonGeometry = geometry & {
    coordinates: Array<Array<number>>
}

export interface ICategory {
    id: string,
    title: string
}

export enum EventStatus {
    ALL = "all",
    OPEN = "open",
    CLOSE = "close"
}

export interface EventRequestObject {
    status?: string,
    limit?: number,
    source?: string,
    category?: string,
    days?: number,
    start?: string,
    end?: string,
    minimumLong?: number,
    maximumLong?: number,
    minimumLat?: number,
    maximumLat?: number,
}

export interface IEventParams {
    // status?: string,
    // limit?: string,
    // source?: string,
    // category?: string,
    // days?: string,
    // start?: string,
    // end?: string,
    // minimumLong?: string,
    // maximumLong?: string,
    // minimumLat?: string,
    // maximumLat?: string,
    [key: string]: string
}
