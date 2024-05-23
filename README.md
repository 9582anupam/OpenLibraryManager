# Open Library Manager

This project is an admin dashboard to list book records in a tabular format. The data is populated from the Open Library API. The dashboard includes pagination, sorting, search, and the ability to download current results in CSV format.

## Features

1. **Data Fetching from API**
   - Utilizes the [Open Library API](https://openlibrary.org/developers/api) to fetch book records.

2. **Table Columns**
   - `title`
   - `author name`
   - `ratings average`
   - `first publish year`
   - `subject`
   - `author birth date`
   - `author top work`

3. **Pagination**
   - Default: 10 books per page
   - Options to change to 50 or 100 books per page

4. **Sorting**
   - Ascending and descending sort on publish year

5. **Search by Author**
   - Search books by author's name

6. **CSV Download**
   - Download the current table results in CSV format

7. **Error Handling**
   - Utilizes `react-error-boundary` for error handling

8. **Loading Animation**
   - Utilizes `react-loading` for loading animations

## Technologies Used

- ReactJS
- Tailwind CSS
- Axios
- react-loading
- react-error-boundary

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository

    `git clone https://github.com/9582anupam/OpenLibraryManager`

2. Navigate to the project directory

    `cd OpenLibraryManager`

3. Install the dependencies

    Axios:

    `npm install axios`
    or
    `yarn add axios`


    React Error Boundary:

    `npm install react-error-boundary`
    or
    `yarn add react-error-boundary`


    React Loading:

    `npm install react-loading`
    or
    `yarn add react-loading`


### Running the Application

To start the application, run:

`npm start`

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Hosting

The application can be hosted online using platforms like Vercel, Netlify, or GitHub Pages.

## Usage

- The dashboard displays a table of books with the specified columns.
- Use the pagination controls to navigate through pages.
- Use the sorting controls on each column header to sort the data.
- Use the search bar to find books by author name.
- Click the "Download CSV" button to download the current table data in CSV format.

## Folder Structure

- `src`
  - `components`
    - `BookTable.js`: Component to display book records in a table
    - `CreateCSV.js`: Component to handle CSV downloads
    - `DashboardText.js`: Component for dashboard header text
    - `PaginationComponent.js`: Component for pagination controls
    - `RecordsPerPage.js`: Component to change the number of records per page
    - `Home.js`: Component contain all other components and main functionalities
    - `Loading.js`: Component to how loading animation
  - `App.js`: Main application component
  - `App.css`: Empty
  - `index.js`: Entry point of the application
  - `index.css`: Global styles using Tailwind CSS
- `public`
    - `index.html`: main HTML file
    - `fav.svg`: favicon image

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Name - [Anupam](mailto:9582anupamk@gmail.com)

Repository Link: [https://github.com/9582anupam/OpenLibraryManager](https://github.com/9582anupam/OpenLibraryManager)

Live Link: https://open-library-manager.vercel.app/
