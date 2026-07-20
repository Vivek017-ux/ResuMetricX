import axios from "axios";


export const baseURLL = "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: baseURLL,
});

export const generateResume = async (description) => {

    const Response = await axiosInstance.post("/api/v1/resume/generate", {
        userDescription : description,
    });

   return Response.data
}