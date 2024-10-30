import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database"; 

const initialState = { courses: db.courses }; 

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
        const newCourse = {
            _id: new Date().getTime().toString(), 
            name: course.name,
            number: "New Number",
            startDate: "yyyy-mm-dd",
            endDate: "yyyy-mm-dd",
            image: "/images/reactjs.jpg",
            description: course.description,
          };
        state.courses = [...state.courses, newCourse] as any; 
      },

    deleteCourse: (state, {payload: courseId}) => {
        state.courses = state.courses.filter((course) => course._id !== courseId);
    },

    updateCourse: (state, {payload: course}) => {
        state.courses = state.courses.map((c) => {if (c._id === course._id) {
            return course;
          } else {
            return c;
          }});
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } = courseSlice.actions;
export default courseSlice.reducer;