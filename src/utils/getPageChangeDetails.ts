import { PageChangeEvent } from "../types/pageChangeEvent";

export const getPageChangeDetails = (event: PageChangeEvent) => {
    const currentPage = Math.floor(event.first / event.rows) + 1;
    const rowsPerPage = event.rows;

    return {
        currentPage,
        rowsPerPage
    }
}
