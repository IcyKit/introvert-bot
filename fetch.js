import axios from "axios";

export const fetchCourses = async (choice) => {
  const { data } = await axios.get(
    `https://api-production.kube.artforintrovert.ru/api/v3/courses?offset=0&categoryId=${choice}&limit=200&enableLanguages=false`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiNjUwOWExZjJmYmU4ZDdhZmMzYmE0MDMyIiwicyI6IjE2OTU3MzE4OTEuMDkyMDY2IiwiZXhwaXJlc0F0IjoiMjAyMy0wOS0yNlQxNjozODoxMS4wOTIwNzAxNzYrMDM6MDAiLCJmaW5nZXJwcmludCI6IiJ9.sdZp53N8K2yius1yXAjhjGgvAB7JdN-wH_kcYJdQa2U",
      },
    }
  );
  const getRandomCourse = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };
  const course = getRandomCourse(data.data.courses);
  return {
    title: course?.title,
    id: course?.id,
  };
};

fetchCourses();
