let listCourses = document.querySelector('list-courses');

const coursesApi = 'http://localhost:3000/courses';


function start () {
    getCourses(function(courses){
        console.log(courses);
    })
}

start();


function getCourses () {
    fetch(coursesApi)
        .then(function(response) {
            return response.json();
        })
        .then(requestIdleCallback)
}
