import { configureStore } from "@reduxjs/toolkit" ; 
import modulesReducer from "../Courses/Modules/reducer" ; 
import accountReducer from "../Account/reducer" ;
import assignmentsReducer from "../Courses/Assignments/reducer";
import enrollmentReducer from "../enrollmentReducer";
import courseReducer from "../Courses/courseReducer";

const store = configureStore({ 
    reducer: { 
        modulesReducer, 
        accountReducer,
        assignmentsReducer,
        enrollmentReducer,
        courseReducer
    }, 
}); 

export default store;