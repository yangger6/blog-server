export interface IHttpQuery {
    limit?: number,
    page?: number,
    pageSize?: number,
    sortBy?: string,
    order?: 'asc' | 'desc'
}
