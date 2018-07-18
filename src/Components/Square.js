import React from "react";
import styled from "styled-components";

const StyledSquare = styled.button`
  background: #fff;
  height: 200px;
  width: 200px;
  border: 2px solid;
  float: left;
  margin: 10px;
`;

function Square(props) {
  const style = { backgroundColor: props.value };
  return <StyledSquare onClick={() => props.onClick()} style={style} />;
}

export default Square;
