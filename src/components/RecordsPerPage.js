const RecordsPerPage = ({postsPerPage, handlePostsPerPageChange}) => {
    return (
        <div className="flex justify-center sm:justify-end pb-10 sm:pb-0">
            <label className="mr-2">Records per page:</label>
            <select
                name="record"
                value={postsPerPage}
                onChange={handlePostsPerPageChange}
                className="border border-gray-300 rounded px-2 py-1">
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
};

export default RecordsPerPage;
