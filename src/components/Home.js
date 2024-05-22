import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import CreateCSV from "./CreateCSV";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [api1, setApi1] = useState(
        "https://openlibrary.org/search.json?q=comedy&fields=author_key,ratings_average,author_name,title,first_publish_year,subject"
    );

    const npage = Math.ceil(totalRecords / postsPerPage);

    const fetchData = useCallback(() => {
        setIsLoading(true);

        const limit = postsPerPage;
        const offset = (currentPage - 1) * postsPerPage;

        axios
            .get(`${api1}&limit=${limit}&offset=${offset}`)
            .then((response) => {
                const books = response.data.docs;
                setTotalRecords(response.data.numFound);

                const authorPromises = books.map((book) => {
                    const authorName = book.author_name?.[0];
                    return axios
                        .get(
                            `https://openlibrary.org/search/authors.json?q=${authorName}`
                        )
                        .then((authorResponse) => {
                            const authorData = authorResponse.data.docs[0];
                            return {
                                ...book,
                                birth_date: authorData?.birth_date || "N/A",
                                top_work: authorData?.top_work || "N/A",
                            };
                        });
                });

                Promise.all(authorPromises).then((updatedBooks) => {
                    setData(updatedBooks);
                    setIsLoading(false);
                });
            })
            .catch((error) => {
                console.log(`Error while fetching data: ${error}`);
                setIsLoading(false);
            });
    }, [currentPage, postsPerPage, api1]);

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
        setCurrentPage(1);
    };

    const getPaginationNumbers = () => {
        const delta = 2;
        const range = [];
        range.push(1);
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i >= 2 && i <= npage - 1) {
                range.push(i);
            }
        }
        range.push(npage);

        return range;
    };

    const handleYearSort = (event) => {
        console.log(event.target.value);
        if (event.target.value === "default") {
            setApi1(
                "https://openlibrary.org/search.json?q=comedy&fields=author_key,ratings_average,author_name,title,first_publish_year,subject"
            );
            setCurrentPage(1); // sending to first page on anytype of sorting rather than staying on the same page
        } else if (event.target.value === "new") {
            setApi1(
                "https://openlibrary.org/search.json?q=comedy&fields=author_key,ratings_average,author_name,title,first_publish_year,subject&sort=new"
            );
            setCurrentPage(1);
        } else if (event.target.value === "old") {
            setApi1(
                "https://openlibrary.org/search.json?q=comedy&fields=author_key,ratings_average,author_name,title,first_publish_year,subject&sort=old"
            );
            setCurrentPage(1);
        }
    };

    return (
        <div className="px-4 sm:px-5">
            <h1 className="text-center text-2xl sm:text-4xl font-bold pt-5 text-blue-500">
                Admin Dashboard
            </h1>

            <div className="my-10">
                {isLoading ? (
                    <ReactLoading
                        type="bars"
                        color="#3b82f6"
                        className="mx-auto top-[30vh] relative"
                    />
                ) : (
                    <div>
                        <div className="overflow-x-auto">
                            <table className="border border-black w-full text-center" id="table">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-400 px-4 py-2 font-bold">
                                            S. No.
                                        </th>
                                        <th className="border border-gray-400 px-4 py-2 font-bold">
                                            Title
                                        </th>
                                        <th className="border border-gray-400 px-4 py-2 font-bold">
                                            Author Name
                                        </th>
                                        <th className="border border-gray-400 px-4 py-2 font-bold">
                                            Ratings Average
                                        </th>
                                        <th className="border border-gray-400 px-4 py-2">
                                            <p className="font-bold">
                                                First Publish Year
                                            </p>
                                            <select
                                                onChange={handleYearSort}
                                                className="mt-2 block w-full">
                                                <option>Sort</option>
                                                <option value="default">
                                                    default
                                                </option>
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
                                            className={
                                                index % 2 === 0
                                                    ? "bg-gray-100"
                                                    : ""
                                            }>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {index +
                                                    1 +
                                                    (currentPage - 1) *
                                                        postsPerPage}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {item.title || "N/A"}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {item.author_name?.[0] || "N/A"}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {item.ratings_average
                                                    ? item.ratings_average.toFixed(
                                                          1
                                                      )
                                                    : "N/A"}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {item.first_publish_year ||
                                                    "N/A"}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {Array.isArray(item.subject)
                                                    ? item.subject
                                                          .slice(0, 3)
                                                          .join(", ")
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

                        <div className="flex items-center justify-around flex-col md:flex-row gap-5 pt-10">
                            <ul className="flex gap-2 justify-center sm:py-0">
                                <li>
                                    <div
                                        onClick={prevPage}
                                        className="cursor-pointer px-3 py-1 border border-gray-300 rounded">
                                        Prev
                                    </div>
                                </li>
                                {getPaginationNumbers().map((n, i) => (
                                    <li key={i}>
                                        {typeof n === "number" ? (
                                            <div
                                                onClick={() =>
                                                    changeCurrPage(n)
                                                }
                                                className={`cursor-pointer px-3 py-1 border border-gray-300 rounded ${
                                                    currentPage === n
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white text-black"
                                                }`}>
                                                {n}
                                            </div>
                                        ) : (
                                            <span className="px-3 py-1 text-red-500">
                                                {n}
                                            </span>
                                        )}
                                    </li>
                                ))}
                                <li>
                                    <div
                                        onClick={nextPage}
                                        className="cursor-pointer px-3 py-1 border border-gray-300 rounded">
                                        Next
                                    </div>
                                </li>
                            </ul>
                            
                            <CreateCSV/>

                            <div className="flex justify-center sm:justify-end pb-10 sm:pb-0">
                                <label className="mr-2">
                                    Records per page:
                                </label>
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
                            
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Home;
