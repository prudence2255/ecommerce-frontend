import ReactPaginate from 'react-paginate';
import * as A from 'components/adminImports';



const Paginator = ({pages}) => { 
 const router = A.useRouter();
const handlePagination = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;
    router.push({
        pathname: currentPath,
        query: currentQuery,
    });
    window.scrollTo(0, 0) 
}
A.useEffect(() => {
    return () => {}
},[pages])
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
                    initialPage={pages.current_page - 1}
                    pageCount={pages.last_page}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={handlePagination}
                />
        </>
    )
}



export default Paginator;