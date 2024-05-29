const fetchData = async (page, itemperpage) => {
    const response = await fetch('https://fakestoreapi.com/products/');
    const data = await response.json();

    const totalItems = data.length;
    const start = (page - 1) * itemperpage;
    const end = start + itemperpage;
    const paginatedItems = data.slice(start, end);

    return {
        items: paginatedItems,
        totalItems,
    };
};

export default fetchData;