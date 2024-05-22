import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const npage = Math.ceil(totalRecords / postsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const fetchData = useCallback(() => {
        setIsLoading(true);

        const limit = postsPerPage;
        const offset = (currentPage - 1) * postsPerPage;

        axios.get(`https://openlibrary.org/search.json?q=comedy&fields=author_key,ratings_average,author_name,title,first_publish_year,subject&limit=${limit}&offset=${offset}`)
            .then(response => {
                const books = response.data.docs;
                setTotalRecords(response.data.numFound);

                const authorPromises = books.map(book => {
                    const authorName = book.author_name?.[0];
                    return axios.get(`https://openlibrary.org/search/authors.json?q=${authorName}`)
                        .then(authorResponse => {
                            const authorData = authorResponse.data.docs[0];
                            return {
                                ...book,
                                birth_date: authorData?.birth_date || 'N/A',
                                top_work: authorData?.top_work || 'N/A'
                            };
                        });
                });

                Promise.all(authorPromises).then(updatedBooks => {
                    setData(updatedBooks);
                    setIsLoading(false);
                });
            })
            .catch(error => {
                console.log(`Error while fetching data: ${error}`);
                setIsLoading(false);
            });
    }, [currentPage, postsPerPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);




    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changeCurrPage = (n) => {
        setCurrentPage(n);
    };

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when posts per page changes
    };

    return (
        <div className="px-5">
            <h1 className="text-center text-4xl font-bold pt-5 text-blue-500">Admin Dashboard</h1>

            <div className="my-10">
                {isLoading ? (
                    <ReactLoading type="bars" color="#9ca3af" className="mx-auto" />
                ) : (
                    <div>
                        <table className="border border-black w-full text-center">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-400 px-4 py-2 font-bold">S. No.</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">Title</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">Author Name</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">Ratings Average</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">First Publish Year</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">Subject</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">Birth Date</th>
                                    <th className="border border-gray-400 px-4 py-2 font-bold">Top Work</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td className="border border-gray-400 px-4 py-2">{index + 1 + (currentPage - 1) * postsPerPage}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.title || 'N/A'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.author_name?.[0] || 'N/A'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.ratings_average || 'N/A'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.first_publish_year || 'N/A'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{Array.isArray(item.subject) ? item.subject.slice(0, 3).join(', ') : 'N/A'}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.birth_date}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.top_work}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div>
                            <ul className="flex gap-3 justify-center py-10">
                                <li>
                                    <div onClick={prevPage} className="cursor-pointer px-3 py-1 border border-gray-300 rounded">Prev</div>
                                </li>
                                {numbers.map((n, i) => (
                                    <li key={i}>
                                        <div
                                            onClick={() => changeCurrPage(n)}
                                            className={`cursor-pointer px-3 py-1 border border-gray-300 rounded ${currentPage === n ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                        >
                                            {n}
                                        </div>
                                    </li>
                                ))}
                                <li>
                                    <div onClick={nextPage} className="cursor-pointer px-3 py-1 border border-gray-300 rounded">Next</div>
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center pb-10">
                            <label className="mr-2">Records per page:</label>
                            <select name="record" value={postsPerPage} onChange={handlePostsPerPageChange} className="border border-gray-300 rounded px-2 py-1">
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;