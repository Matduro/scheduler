import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("PROPS", props);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {}}
          onEdit={() => {}}
        />
      )}
      {mode === CREATE && (
        <Form
          name=""
          interviewers={props.interviewers}
          interviewer={null}
          onCancel={() => back()}
        />
      )}
      {/* {mode === EDIT && (
        <Form
          name=""
          interviewers={props.interviewers}
          interviewer={null}
          onCancel={() => back()}
          
        />
      )} */}
    </article>
  );
}

// {props.interview ? (
//   <Show
//     student={props.interview.student}
//     interviewer={props.interview.interviewer}
//   />
// ) : (
//   <Empty />
// )}
