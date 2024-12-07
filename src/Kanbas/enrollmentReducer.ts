import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
    _id: string;
    user: string;
    course: string;
    enrollmentDate: string;
    status: 'ENROLLED' | 'DROPPED' | 'COMPLETED';
}

interface EnrollmentState {
    enrollments: Enrollment[];
    loading: boolean;
    error: string | null;
}

const initialState: EnrollmentState = {
    enrollments: [],
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
        addEnrollment: (state, { payload }) => {
            state.enrollments.push(payload);
        },
        removeEnrollment: (state, { payload: { user, course } }) => {
            state.enrollments = state.enrollments.filter(
                e => !(e.user === user && e.course === course)
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

