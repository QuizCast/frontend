"use client";

import { useDispatch, useSelector } from "react-redux";
import { removeIncompleteQuestions } from "../../store/Slices/userSlice";

const Qdisplay = () => {
  const dispatch = useDispatch();
  const incompleteQuestions = useSelector((state) => state.user.incompleteQuestions);

  const handleRemove = (id) => {
    dispatch(removeIncompleteQuestions(id));
  };

  return (
    <div>
      {incompleteQuestions.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>
          <button onClick={() => handleRemove(q.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Qdisplay;