const CreateCSV = () => {
    function downloadTableAsCsv(table_id, separator = ",") {
        var rows = document.querySelectorAll("table#" + table_id + " tr");
        var csv = [];
        for (var i = 0; i < rows.length; i++) {
            var row = [],
                cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++) {
                var data = cols[j].innerText
                    .replace(/(\r\n|\n|\r)/gm, "")
                    .replace(/(\s\s)/gm, " ");
                data = data.replace(/"/g, '""');
                // console.log(data);
                if (data.split(" ")[0] === "First") {
                    row.push(
                        data.split(" ").slice(0, 2).join(" ") +
                            " " +
                            data.split(" ")[2].slice(0, 4)
                    );
                } else {
                    row.push('"' + data + '"');
                }
            }
            csv.push(row.join(separator));
        }
        var csv_string = csv.join("\n");
        var now = new Date();
        var formattedDateTime =
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0") +
            "_" +
            String(now.getHours()).padStart(2, "0") +
            "H" +
            String(now.getMinutes()).padStart(2, "0") +
            "M" +
            String(now.getSeconds()).padStart(2, "0") +
            "S";

        var filename = "export_" + table_id + "_" + formattedDateTime + ".csv";

        var link = document.createElement("a");
        link.style.display = "none";
        link.setAttribute("target", "_blank");
        link.setAttribute(
            "href",
            "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
        );
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div>
            <button
                onClick={() => downloadTableAsCsv("table")}
                className=" px-4 py-2 bg-blue-500 text-white rounded">
                Download as CSV
            </button>
        </div>
    );
};

export default CreateCSV;
