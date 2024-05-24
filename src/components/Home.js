import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import CreateCSV from "./CreateCSV";
import DashboardText from "./DashboardText";
import BooksTable from "./BookTable";
import PaginationComponent from "./PaginationComponent";
import RecordsPerPage from "./RecordsPerPage";



const Home = () => {

    // states/vars
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const npage = Math.ceil(totalRecords / postsPerPage);
    const [isLoading, setIsLoading] = useState(true);
    const [api1, setApi1] = useState(
        "https://openlibrary.org/search.json?q=random&fields=author_key,ratings_average,author_name,title,first_publish_year,subject"
    );
    const [authorName, setAuthorName] = useState("random"); // random so that results are not specific to a subject P.S. random is not a special query
    const [yearSort, setYearSort] = useState("default");
    const [selectedSortOption, setSelectedSortOption] = useState("default");


    // fetching data from api
    const fetchData = useCallback(() => {
        setIsLoading(true); // to show loading animation while data is fetching

        // calculating amount of data to be fetched according to post per page
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

    // handle previous page button
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // handle next page button
    const nextPage = () => {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    // handle setting current page 
    const changeCurrPage = (n) => {
        setCurrentPage(n);
    };

    // handle post per page button(10/50/100)
    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    // return pagination numbers to display. delta show how many numbers to show after current page and before current page number
    const getPaginationNumbers = () => {
        const delta = 1;
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

    // handle first publish year sorting by calling api again with sort parameters 
    const handleYearSort = (event) => {
        const year = event.target.value;
        setSelectedSortOption(year);
        setYearSort(year);
        console.log(authorName);
        if (year === "default" && year !== "Sort") {
            setApi1(
                `https://openlibrary.org/search.json?q=${authorName}&fields=author_key,ratings_average,author_name,title,first_publish_year,subject`
            );
        } else if (year !== "Sort") {
            setApi1(
                `https://openlibrary.org/search.json?q=${authorName}&fields=author_key,ratings_average,author_name,title,first_publish_year,subject&sort=${year}`
            );
        }
        setCurrentPage(1); // sending to first page on anytype of sorting rather than staying on the same page
    };

    // handle author name search button by calling the api again with query as author name
    const handleAuthorSearch = () => {
        const name = document.getElementById("authorName").value;
        setAuthorName(name);
        if (yearSort === "default") {
            setApi1(
                `https://openlibrary.org/search.json?q=${name}&fields=author_key,ratings_average,author_name,title,first_publish_year,subject`
            );
        } else {
            setApi1(
                `https://openlibrary.org/search.json?q=${name}&fields=author_key,ratings_average,author_name,title,first_publish_year,subject&sort=${yearSort}`
            );
        }
        setCurrentPage(1);
    };


    // UI
    return (
        <div className="px-4 sm:px-5 bg-gray-900 min-h-screen">
            <DashboardText/> 

            <div className="py-10">
                {isLoading ? (
                    <ReactLoading type="bars" color="#9ca3af" className="mx-auto top-[30vh] relative"/>
                ) : (
                    <div>
                        <BooksTable {...{handleAuthorSearch, handleYearSort, selectedSortOption, data, currentPage, postsPerPage}}/>

                        <div className="flex items-center justify-around flex-col md:flex-row gap-5 pt-10">
                            <PaginationComponent {...{prevPage, nextPage, changeCurrPage, getPaginationNumbers, currentPage}}/>

                            <CreateCSV />

                            <RecordsPerPage {...{postsPerPage, handlePostsPerPageChange}}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
