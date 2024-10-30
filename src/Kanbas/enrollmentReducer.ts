import { createSlice } from "@reduxjs/toolkit";
import * as db from "./Database"; 

const initialState = { enrollments: db.enrollments }; 

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { courseId, userId } }) => {
      const newEnrollment = { 
         _id: new Date().getTime().toString(), 
         course: courseId, 
         user: userId 
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenroll: (state, { payload: { courseId, userId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.course === courseId && e.user === userId)
      );
    },
   
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
 