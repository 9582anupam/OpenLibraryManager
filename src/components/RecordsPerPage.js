const RecordsPerPage = ({postsPerPage, handlePostsPerPageChange}) => {
    return (
        <div className="flex justify-center sm:justify-end pb-10 sm:pb-0">
            <label className="mr-2 text-gray-400" >Records per page:</label>
            <select
                name="record"
                value={postsPerPage}
                onChange={handlePostsPerPageChange}
                className="border border-gray-400 bg-blue-500 rounded px-2 py-1 text-white">
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
};

export default RecordsPerPage;
