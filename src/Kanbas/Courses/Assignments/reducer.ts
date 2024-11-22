import { createSlice } from "@reduxjs/toolkit" ;

const initialState = { assignments: [], }; 
const assignmentsSlice = createSlice({ 
    name: "assignments" , 
    initialState, 
    reducers: { 
        addAssignment: (state, { payload: assignment }) => { 
            const newAssignment: any = { 
                _id: assignment._id, 
                title: assignment.title, 
                description: assignment.description,
                course: assignment.course,
                points: assignment.points,
                dueDate: assignment.dueDate,
                availableFrom: assignment.availableFrom,
                availableUntil: assignment.availableUntil,
            };
            state.assignments = [...state.assignments, newAssignment] as any; 
        }, 
        deleteAssignment: (state, { payload: assignmentId }) => { 
            state.assignments = state.assignments.filter( 
                (a: any) => a._id !== assignmentId); 
        }, 
        updateAssignment: (state, { payload: assignment }) => { 
            state.assignments = state.assignments.map(
                (a: any) => a._id === assignment._id ? assignment : a ) as any; 
        },   
        setAssignments: (state, { payload: assignments }) => {
            state.assignments = assignments;
        },
    }, 
}); 
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions; 
export default assignmentsSlice.reducer;