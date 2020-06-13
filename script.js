$(document).ready(function(){
    // Create a query for URL using user criteria
    function createURL() {
        var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${userInput}&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M`;
        var userInput = "";

        var searchTerm = $("searchTerm").val().trim();

        // For a provided start year
        var startYear = $("#startYearInput").val().trim();

        if (startYear) {
            startYear = parseInt(startYear) + "0101";
        }

        // For a provided end year
        var endYear = $("#endYearInput").val().trim();

        if (endYear) {
            endYear = parseInt(endYear) + "1231";
        }

        userInput = searchTerm + startYear + endYear;

        return queryURL;
    }

    // Function to show articles
    function appendArticles(NYTData) {
        var numberOfRecords = $("#numberOfRecords").val();

        // Create for loop to go through amount of articles
        for ( var i = 0; i < numberOfRecords; i++) {
            var article = NYTData.response.docs[i];

            // Create a list and append to article section of html
            var articleList = $("<ul>");
            $("#top-articles").append(articleList);

            // Create list items
            var articleListItem = $("<li>");
            articleListItem.append(article.headline.main);
            articleListItem.append(article.web_url);
            articleListItem.append(article.byLine);

            // Append list items to list
            articleList.append(articleListItem);
        }
    }

    // Function to empty articles
    function clear() {
        $("#top-articles").empty();
    }

    // Click Event Handlers

    // Search Button
    $("#searchBtn").on("click", function(event) {
        // To make "enter" work like click
        event.preventDefault();

        // to clear previous articles if any
        clear();

        // Call the URL creation function
        var queryURL = createURL();

        // Another ajax call to grab API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(appendArticles());
    });

    // Clear Button
    $("clearBtn").on("click", clear());
});

// TIPS FROM JUSTIN
// define jquery objects (anything using at top)
// start function (define logic that will interact with logic) (functions in the middle)
// jquery to assign functions to click events (event handlers bottom)