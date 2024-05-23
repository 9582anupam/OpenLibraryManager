const PaginationComponent = ({prevPage, nextPage, changeCurrPage, getPaginationNumbers, currentPage}) => {
    return (
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
                            onClick={() => changeCurrPage(n)}
                            className={`cursor-pointer px-3 py-1 border border-gray-300 rounded ${
                                currentPage === n
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-black"
                            }`}>
                            {n}
                        </div>
                    ) : (
                        <span className="px-3 py-1 text-red-500">{n}</span>
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
    );
};

export default PaginationComponent;
