const BooksTable = ({handleAuthorSearch, handleYearSort, selectedSortOption, data, currentPage, postsPerPage}) => {
    return (
        <div className="overflow-x-auto">
            <table
                className="border border-black w-full text-center"
                id="table">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2 font-bold">
                            S. No.
                        </th>
                        <th className="border border-gray-400 px-4 py-2 font-bold">
                            Title
                        </th>
                        <th className="border border-gray-400 px-4 py-2 ">
                            <p className="font-bold">Author Name</p>
                            <input
                                placeholder="Author Name"
                                className="px-2 rounded-sm w-full"
                                id="authorName"></input>
                            <button
                                className="bg-gray-300 px-1 py-0.5 mt-1 rounded-md"
                                onClick={handleAuthorSearch}>
                                Search
                            </button>
                        </th>
                        <th className="border border-gray-400 px-4 py-2 font-bold">
                            Ratings Average
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            <p className="font-bold">First Publish Year</p>
                            <select
                                id="yearSort"
                                onChange={handleYearSort}
                                value={selectedSortOption} // Add this line
                                className="mt-2 block w-full">
                                <option value="default">default</option>
                                <option value="new">new</option>
                                <option value="old">old</option>
                            </select>
                        </th>
                        <th className="border border-gray-400 px-4 py-2 font-bold">
                            Subject
                        </th>
                        <th className="border border-gray-400 px-4 py-2 font-bold">
                            Birth Date
                        </th>
                        <th className="border border-gray-400 px-4 py-2 font-bold">
                            Top Work
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="border border-gray-400 px-4 py-2">
                                {index + 1 + (currentPage - 1) * postsPerPage}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.title || "N/A"}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.author_name?.[0] || "N/A"}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.ratings_average
                                    ? item.ratings_average.toFixed(1)
                                    : "N/A"}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.first_publish_year || "N/A"}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {Array.isArray(item.subject)
                                    ? item.subject.slice(0, 3).join(", ")
                                    : "N/A"}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.birth_date}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.top_work}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
