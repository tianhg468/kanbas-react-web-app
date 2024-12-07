import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import FacultyRoute from "../../Account/FacultyRoute";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  // const createModuleForCourse = async () => {
  //   if (!cid) return;
  //   const newModule = { name: moduleName, course: cid };
  //   const module = await coursesClient.createModuleForCourse(cid, newModule);
  //   dispatch(addModule(module));
  // };
  // const createModuleForCourse = async () => {
  //   try {
  //     if (!cid || !moduleName.trim()) return;

  //     const newModule = {
  //       name: moduleName,
  //       course: cid,
  //       description: "New module",
  //     };

  //     const createdModule = await coursesClient.createModuleForCourse(
  //       cid,
  //       newModule
  //     );

  //     if (createdModule && createdModule._id) {
  //       dispatch(addModule(createdModule));
  //       setModuleName("");
  //     }
  //   } catch (error) {
  //     console.error("Error creating module:", error);
  //   }
  // };
  const generateRandomId = () => {
    const randomNumbers = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `M${randomNumbers}`;
  };
  const createModuleForCourse = async () => {
    try {
      if (!cid || !moduleName.trim()) return;

      const newModuleId = generateRandomId();
      console.log("new id: ", newModuleId);

      const newModule = {
        _id: newModuleId,
        name: moduleName,
        course: cid,
        description: "New module",
      };

      const createdModule = await coursesClient.createModuleForCourse(
        cid,
        newModule
      );

      if (createdModule) {
        dispatch(addModule(createdModule));
        setModuleName("");
      }
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error removing module:", error);
    }
  };

  const saveModule = async (module: any) => {
    try {
      console.log("Saving module:", module);

      const moduleId = module?._id;
      if (!moduleId) {
        throw new Error("Module ID is missing from module object");
      }

      const moduleData = {
        _id: moduleId,
        name: module.name,
        course: module.course || cid,
      };

      console.log("Module data being sent:", moduleData);

      const updatedModule = await modulesClient.updateModule(
        moduleId,
        moduleData
      );

      console.log("Server response:", updatedModule); // Debug log

      dispatch(
        updateModule({
          ...module,
          ...updatedModule,
          editing: false,
        })
      );
    } catch (error) {
      console.error("Error saving module:", error);
      await fetchModules();
    }
  };
  const handleEditClick = (module: any) => {
    console.log("Module being edited:", module); // Debug log
    if (module && module._id) {
      dispatch(editModule(module._id));
    } else {
      console.error("Invalid module or missing ID:", module);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleNameUpdate = (module: any, newName: string) => {
    // if (!module?._id) {
    //   console.error("Cannot update module without ID");
    //   return;
    // }
    dispatch(
      updateModule({
        ...module,
        name: newName,
      })
    );
  };

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />

      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
          <li
            key={module._id}
            className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  value={module.name || ""}
                  onChange={(e) => handleNameUpdate(module, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const currentModule = modules.find(
                        (m: any) => m._id === module._id
                      );
                      if (currentModule) {
                        saveModule(currentModule);
                      }
                    }
                  }}
                />
              )}
              <FacultyRoute>
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={() => removeModule(module._id)}
                  editModule={() => handleEditClick(module)}
                />
              </FacultyRoute>
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li
                    key={lesson._id}
                    className="wd-lesson list-group-item p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <FacultyRoute>
                      <LessonControlButtons />
                    </FacultyRoute>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
