const courseSearch = document.getElementById("course-search")
const searchResults = document.getElementById("search-results")

courseSearch.addEventListener("keyup", queryCourses)

function queryCourses() {
    const courseSearchValue = courseSearch.value;
    if (courseSearchValue.length < 1) {
        searchResults.innerHTML = ""
        return;
    } 
    fetchCourses(courseSearchValue)
}

function fetchCourses(query) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "http://courses_server.local/courses.txt", true)
    xhr.onload = function() {
        if (this.status == 200) {
            const filteredCourses = filterCourses(query, this.responseText.split("\n"));
            searchResults.innerHTML = ""
            const listCollection = createList(filteredCourses);
            searchResults.innerHTML = listCollection;
        } else {
            console.log(`An error has occured. Status code - ${this.status}`)
        }
    }
    xhr.onerror = function () {
        console.log("Unexpected Error")
    }
    xhr.send();
}

function filterCourses (query, courses) {
    const filteredCourses = courses.filter((course) => 
            course.toLowerCase().startsWith(query)
        )
    return filteredCourses;
}

function createList(courses) {
    let listCollection = "";
    for (let i = 0; i < courses.length; i++) {
        listCollection = listCollection + `<li>${courses[i]}</li>`
    }
    return listCollection;
}