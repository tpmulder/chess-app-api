// WARNING: STRONGLY COUPLED TO CUSTOMLABELS !!
export default interface PaginationResult {
    items: any[],
    totalItems: number
    pageSize: number
    totalPages: number
    currentPage: number
    slNo: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
}