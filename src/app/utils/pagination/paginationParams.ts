import PaginationOptions from "./paginationOptions";

export default class PaginationParams {
    searchQuery?: any
    options: PaginationOptions

    constructor(pageNumber?: number, pageSize?: number, searchQuery?: string, includes?: string, selects?: string, sort?: string) {
        this.searchQuery = searchQuery ? this.getQuery(searchQuery) : undefined;

        this.options = {
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: pageSize ? (pageSize > 50 ? 50 : pageSize) : 10,
            includes: includes ? includes.split(',').join(' ') : undefined,
            selects: selects ? selects.split(',').join(' ') : undefined
        }

        // WARNING: STRONGLY COUPLED TO PAGINATIONRESULT !!
        this.options.customLabels = {
            totalDocs: 'totalItems',
            docs: 'items',
            limit: 'pageSize',
            page: 'currentPage',
            pagingCounter: 'slNo',
            meta: 'pagination'
        };

        if (sort) {
            const arr = sort.split(':'); 
            let desc = false;

            if (arr.length > 1 && arr[1] === 'desc' || arr.length > 1 && arr[1] === 'descending')
                desc = true;

            this.options.sort = {[arr[0]]: desc ? -1 : 1 };
        }
    }

    private getQuery(searchQuery: string) {
        let query: any = {};

        const and = '%';
        const or = '|';

        let statement: typeof and | typeof or;

        if (searchQuery.split(and).length > 1)
            statement = and;
        else
            statement = or;

        const criteria = searchQuery.split(statement);

        criteria.forEach((e) => {
            const prop = e.substring(0, e.lastIndexOf("["));
            const val = e.substring(e.lastIndexOf("]") + 1);
            const operator = e.substring(e.lastIndexOf("[") + 1, e.lastIndexOf("]"));

            if (prop || val || operator)
                query[prop] = {[`$${operator}`]: isNaN(parseInt(val, 10)) ? val : parseInt(val, 10) }
        });

        if(statement === or)
            return { $or: [query] }

        return query;
    }
}