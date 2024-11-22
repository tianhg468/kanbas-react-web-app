import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
    _id: string;
    user: string;
    course: string;
    date?: string;
}

interface EnrollmentState {
    enrollments: Enrollment[];
    loading: boolean;
    error: string | null;
}

// Initialize with empty array instead of Database
const initialState: EnrollmentState = {
    enrollments: [], // Remove Database dependency
    loading: false,
    error: null
};

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, { payload }) => {
            state.enrollments = payload;
            state.loading = false;
            state.error = null;
        },
        addEnrollment: (state, { payload: { _id, user, course } }) => {
            state.enrollments.push({
                _id,
                user,
                course,
                date: new Date().toISOString()
            });
        },
        removeEnrollment: (state, { payload: { user, course } }) => {
            state.enrollments = state.enrollments.filter(
                (e) => !(e.user === user && e.course === course)
            );
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        }
    }
});

export const {
    setEnrollments,
    addEnrollment,
    removeEnrollment,
    setError,
    setLoading
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import * as db from "./Database"; 

// const initialState = { enrollments: db.enrollments }; 

// const enrollmentSlice = createSlice({
//   name: "enrollments",
//   initialState,
//   reducers: {
//     enroll: (state, { payload: { courseId, userId } }) => {
//       const newEnrollment = { 
//          _id: new Date().getTime().toString(), 
//          course: courseId, 
//          user: userId 
//       };
//       state.enrollments = [...state.enrollments, newEnrollment];
//     },
//     unenroll: (state, { payload: { courseId, userId } }) => {
//       state.enrollments = state.enrollments.filter(
//         (e) => !(e.course === courseId && e.user === userId)
//       );
//     },
   
//   },
// });

// export const { enroll, unenroll } = enrollmentSlice.actions;
// export default enrollmentSlice.reducer;
 
