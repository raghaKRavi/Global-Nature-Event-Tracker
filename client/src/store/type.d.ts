export interface InitialStateProps {
    isLoading: boolean,
    error: string | null,
    headers: Object
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
    categories: categories
}

export interface EventGeoJsonProperties {
    id: string,
    title: string,
    description: string,
    closed: string,
    categories: Array<categories>,
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
    coordinates: Array<number> | Array<Array<number>>
}

export type categories = {
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
    category?: Array<string>,
    days?: number,
    start?: string,
    end?: string,
    minimumLong?: number,
    maximumLong?: number,
    minimumLat?: number,
    maximumLat?: number,
}
