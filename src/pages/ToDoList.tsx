import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue, useRecoilState } from "recoil";
import { categorys, IToDos, selectToDos, ToDos } from "../atom";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import React, { useState } from "react";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled(motion.h1)`
  font-size: 50px;
  margin-bottom: 40px;
  color: whitesmoke;
`;
const ToDoSelect = styled.select`
  position: relative;
  left: 80px;
  top: 10px;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  border: 1px solid gray;
`;

const ToDoList = () => {
  const [category, setCategory] = useRecoilState(categorys);
  const selecToDo = useRecoilValue(selectToDos);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <Wrapper>
        <Title animate={{ rotateY: 360 }} transition={{ duration: 3 }}>
          To Do
        </Title>
        <CreateToDo />
        <ToDoSelect onInput={onInput}>
          <option value="TO_DO">TO_DO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </ToDoSelect>
        <ul>
          {selecToDo.map((todo) => (
            <AnimatePresence>
              <ToDo
                key={todo.id}
                id={todo.id}
                text={todo.text}
                category={todo.category}
              />
            </AnimatePresence>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default ToDoList;
