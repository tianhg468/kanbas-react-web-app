import { useDispatch, useSelector } from "react-redux";
import { add } from "./addReducer";
import { useState } from "react";

export default function AddRedux() {
  const dispatch = useDispatch();
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: any) => state.addReducer);
  return (
    <div className="w-25" id="wd-add-redux">
      <h1> Add Redux </h1>
      <h2>
        {a} + {b} = {sum}
      </h2>
      <input
        type="number"
        defaultValue={a}
        onChange={(e) => setA(parseInt(e.target.value))}
        className="form-control"
      />
      <input
        type="number"
        defaultValue={b}
        onChange={(e) => setB(parseInt(e.target.value))}
        className="form-control"
      />
      <button
        className="btn btn-primary"
        id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </button>
      <hr />
    </div>
  );
}
