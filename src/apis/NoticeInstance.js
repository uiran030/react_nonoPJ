import axios from "axios";

// 토큰 값 생성
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiUk9MRV9BRE1JTiIsImlzcyI6ImJ1ZGR5IiwiZXhwIjoxNjY1MDcwMjE5LCJpYXQiOjE2NjUwNjMwMTksInVzZXJJZCI6OSwidXNlcm5hbWUiOiJldWlyYW4ifQ.ySKN74AzegPz-aWrJXlHd4Bud1yZdrQ82Nx6nZSXEys";

// axionsInstance 생성
const Instance = axios.create({
  baseURL: "http://3.39.53.3:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default Instance;
