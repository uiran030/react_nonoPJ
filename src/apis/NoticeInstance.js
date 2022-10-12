import axios from "axios";

// 토큰 값 생성
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiUk9MRV9BRE1JTiIsImlzcyI6ImJ1ZGR5IiwiZXhwIjoxNjY1NTg5MDc0LCJpYXQiOjE2NjU1ODE4NzQsInVzZXJJZCI6OSwidXNlcm5hbWUiOiJldWlyYW4ifQ.eAs7WZJlgQbfXdWC4nV2g_kQ9r8ikM4g4X0eHb8ctjs";

// axionsInstance 생성
const Instance = axios.create({
  baseURL: "http://3.39.53.3:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default Instance;
