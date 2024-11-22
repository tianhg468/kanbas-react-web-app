import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Types for better TypeScript support
interface Enrollment {
    _id: string;
    user: string;
    course: string;
    date: string;
}

export const findCoursesByUser = async (userId: string): Promise<Enrollment[]> => {
    const response = await axios.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const enrollUserInCourse = async (userId: string, courseId: string): Promise<Enrollment> => {
    const response = await axios.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string): Promise<void> => {
    await axios.delete(`${USERS_API}/${userId}/courses/${courseId}`);
};