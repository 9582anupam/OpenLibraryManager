const BooksTable = ({handleAuthorSearch, handleYearSort, selectedSortOption, data, currentPage, postsPerPage}) => {
    return (
        <div className="overflow-x-auto rounded-lg ">
            <table
                className="border border-black w-full text-center text-sm text-gray-400"
                id="table">
                <thead className="bg-gray-800 font-medium text-center text-lg">
                    <tr className="">
                        <th className="px-6 py-3 tracking-wider text-center">
                            S. No.
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            <p className="px-6 py-3  text-center tracking-wider">Author Name</p>
                            <input
                                placeholder="Author Name"
                                className="px-2 rounded-sm w-full bg-gray-900"
                                id="authorName"></input>
                            <button
                                className="bg-gray-900 px-1 py-0.5 mt-1 rounded-sm  text-gray-400"
                                onClick={handleAuthorSearch}>
                                Search
                            </button>
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            Ratings Average
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            <p className="px-6 py-3  text-center tracking-wider">First Publish Year</p>
                            <select
                                id="yearSort"
                                onChange={handleYearSort}
                                value={selectedSortOption} // Add this line
                                className="mt-2 block w-full bg-gray-900">
                                <option value="default">default</option>
                                <option value="new">new</option>
                                <option value="old">old</option>
                            </select>
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            Subject
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            Birth Date
                        </th>
                        <th className="px-6 py-3  text-center tracking-wider">
                            Top Work
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-black bg-opacity-20" : ""}>
                            <td className="border border-none px-4 py-2">
                                {index + 1 + (currentPage - 1) * postsPerPage}
                            </td>
                            <td className="border border-none px-4 py-2">
                                {item.title || "N/A"}
                            </td>
                            <td className="border border-none px-4 py-2">
                                {item.author_name?.[0] || "N/A"}
                            </td>
                            <td className="border border-none px-4 py-2">
                                {item.ratings_average
                                    ? item.ratings_average.toFixed(1)
                                    : "N/A"}
                            </td>
                            <td className="border border-none px-4 py-2">
                                {item.first_publish_year || "N/A"}
                            </td>
                            <td className="border border-none px-4 py-2">
                                {Array.isArray(item.subject)
                                    ? item.subject.slice(0, 3).join(", ")
                                    : "N/A"}
                            </td>
                            <td className="border border-none px-4 py-2">
                                {item.birth_date}
                            </td>
                            <td className="border border-none px-4 py-2">
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
