export default interface PaginationOptions {
    pageNumber: number
    pageSize: number
    customLabels?: any
    selects?: string
    includes?: string
    sort?: Record<string, number>
}