var tableData = data;


function appendTable(data) {
    d3.select("tbody").html("");
    data.forEach((selection) => {
        var tableRow = d3.select("tbody").append("tr");
        Object.values(selection).forEach((value) => {
            var tableData = tableRow.append("td");
            tableData.text(value);
        });
    })
}

appendTable(tableData);


function clickEvent() {
    d3.event.preventDefault();
    var state = d3.select("#state").property("value");
    var filterDateTime = tableData;
    if (state) {
        filterDateTime = filterDateTime.filter((row) => row.state_name === state);
    }
    appendTable(filterDateTime);
}

d3.selectAll("#filter-btn").on("click", clickEvent);