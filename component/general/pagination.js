

import ReactPaginate from 'react-paginate';

const Pagination = ({handlePageClick, pageCount, currentPage}) => {
    
    return pageCount > 0 ? <div>
                <div className="fullPaginationDisplay">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        forcePage={currentPage}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        className="rpPagination"
                        containerClassName="rpPagination"
                        previousClassName="rectangleButtonSecondary paginationLink"
                        previousLinkClassName="rectangleButtonSecondary sidePadding"
                        nextClassName="rectangleButtonSecondary paginationLink"
                        nextLinkClassName="rectangleButtonSecondary sidePadding"
                        pageClassName="squareButtonSecondary paginationLink"
                        pageLinkClassName="squareButtonSecondary"
                        activeClassName="squareButtonPrimary paginationLink"
                        activeLinkClassName="squareButtonPrimary"
                        breakClassName="paginationBreak paginationLink"
                        breakLinkClassName="paginationBreak no-link"
                        disabledClassName="rectangleButtonGrey paginationLink"
                        disabledLinkClassName="rectangleButtonGrey"
                    />
                </div>

                <div className="mobilePaginationDisplay">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        className="rpPagination"
                        containerClassName="rpPagination"
                        previousClassName="rectangleButtonSecondary sidePadding paginationLink"
                        nextClassName="rectangleButtonSecondary sidePadding paginationLink"
                        pageClassName="squareButtonSecondary paginationLink"
                        pageLinkClassName="squareButtonSecondary paginationLink"
                        activeClassName="squareButtonPrimary paginationLink"
                        activeLinkClassName="squareButtonPrimary paginationLink"
                        breakClassName="paginationBreak paginationLink"
                        breakLinkClassName="paginationBreak no-link paginationLink"
                        disabledClassName="rectangleButtonGrey paginationLink"
                    />
                </div>
    </div> : <></>
}

export default Pagination;