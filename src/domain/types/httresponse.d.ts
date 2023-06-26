export interface HttpResponse{
    message?:string
    status: number
    data:Payload
}
export interface Payload{
    id: number,
    permissions:Permission[]
}

