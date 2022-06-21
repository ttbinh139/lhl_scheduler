import React from "react";
import { useEffect } from "react";


import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("On save - application component");
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then((data) => {
        console.log("Put successfull", data);
        transition(SHOW);
      })
      .catch(err => {
        console.log(err);
        transition(ERROR_SAVE, true);
      });
    
  };

  const onCancelInterview = function() {
    console.log("On cancel - application component");
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        console.log(err);
        transition(ERROR_DELETE, true);
      })
  }

/*   const onEdit = function() {
    console.log("Edit");
    transition(EDIT);
  } */

  return (
    <article className="appointment">
      <Header time={props.time} />
     {/*  {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {!props.interview && <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          confirmCancel={() => transition(CONFIRM_DELETE)} 
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()} /> }
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back()} /> }
      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={onCancelInterview}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onSave={save} 
        onCancel={() => back()}  
        />
      )}
    </article>
  );
};

export default Appointment;