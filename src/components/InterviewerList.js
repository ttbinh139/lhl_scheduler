import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

function InterviewerList(props) {

  const intereviewerItems = props.interviewers.map((item) => {
    return <InterviewerListItem 
            key={item.id} 
            name={item.name}
            avatar={item.avatar}
            selected={item.id === props.interviewer} 
            setInterviewer={props.setInterviewer} 
            />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {intereviewerItems}
      </ul>
    </section>
  );
};

export default InterviewerList;