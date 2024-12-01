import { useEffect, useState } from 'react';

const usePagination = (items= [], page = 1, perPage = 12) => {
    const [activePage, setActivePage] = useState( page )
    const totalPages = Math.ceil(items.length / perPage)
    const offset = perPage * (activePage - 1)
    const paginatedItems = items.slice(offset, perPage * activePage)

    const handlePage = () => {
        setActivePage( items.length > 0 ? 1 : 0)
    }

    useEffect(()=>{
        setActivePage(items.length > 0 ? page : 0)
    },[ items ])

    return {
        activePage,
        nextPage: ()=> setActivePage(p => p < totalPages ? p + 1 : p),
        previousPage: ()=> setActivePage(p => p > 1 ? p - 1 : p),
        totalPages,
        totalItems: items.length,
        items: paginatedItems,
        handlePage
    }
}

export default usePagination;