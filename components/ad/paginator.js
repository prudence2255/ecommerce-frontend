import ReactPaginate from 'react-paginate';
import * as A from 'components/adminImports';



const Paginator = () => {
    const {meta} = A.useSelector(A.adsSelector);

    const router = A.useRouter();
const handlePagination = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;
    router.push({
        pathname: currentPath,
        query: currentQuery,
    });
}
    return (
        <>
        <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    subContainerClassName={'pages pagination'}
                    initialPage={meta.current_page - 1}
                    pageCount={meta.last_Page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePagination}
                />
        </>
    )
}



export default Paginator;