import React, { JSX } from "react";

export const convertNewlinesToBreaks = (text: string): JSX.Element[] => {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};
