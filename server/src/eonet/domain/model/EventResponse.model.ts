export interface EventResponse {
    id: string,
    title: string,
    description: string | null,
    closed: string | null,
    date: string,
    magnitudeValue: number,
    magnitudeUnit: string
}

interface EventData {
    mgValue: number,
    mgUnit: string,
    date: string,
    coordinates: Array<number>,

}