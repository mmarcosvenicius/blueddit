const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (response, page, limit) => {
    const { count: totalItems, rows: data } = response;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { data, totalItems, totalPages, currentPage };
};


module.exports = { getPagination, getPagingData };