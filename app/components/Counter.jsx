import React, { useEffect, useState } from "react";
import { useCountStore } from "../stores/count";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const SCxHeader = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
`;
const SCxHeaderButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  border-radius: 8px;
`;

export default function Counter() {

  const [innerCount, setInnerCount] = useState(0);

  useEffect(() => {
    console.log("Counter mounted");
  }, [])

  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);

  const handleClick = () => {
    increment();
  };

  return (
    <div>
      <SCxHeader>
        innerCount---{innerCount}
        <button onClick={() => setInnerCount(innerCount + 1)}>+1</button>
        <br />
        Counter---{count}
        <SCxHeaderButton onClick={handleClick}>+1</SCxHeaderButton>
        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/about">About</Link>
      </SCxHeader>
    </div>
  );
}
