import { IToDos, ToDos } from "../atom";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
const ToDoStyled = styled(motion.div)`
  display: flex;
  margin-top: 20px;
`;
const ToDoLi = styled.div`
  font-size: 20px;
  color: white;
`;
const ToDoBtn = styled.button`
  background-color: #49a7cc;
  border: 1px solid gray;
  margin-left: 10px;
  cursor: pointer;
`;
const ToDo = ({ id, text, category }: IToDos) => {
  const [ToDo, setToDo] = useRecoilState(ToDos);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo((todos) => {
      const targetIndex = todos.findIndex((todo) => todo.id === id);
      return [
        ...todos.slice(0, targetIndex),
        { id: id, text: text, category: value },
        ...todos.slice(targetIndex + 1),
      ];
    });
  };
  const btnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setToDo((todos) => {
      const copyToDos = [...todos];
      const newToDos = copyToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
  };
  return (
    <ToDoStyled
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToDoLi>{text}</ToDoLi>
      {category !== "TO_DO" && (
        <ToDoBtn onClick={onClick} value="TO_DO">
          TO_DO
        </ToDoBtn>
      )}
      {category !== "DOING" && (
        <ToDoBtn onClick={onClick} value="DOING">
          DOING
        </ToDoBtn>
      )}
      {category !== "DONE" && (
        <ToDoBtn onClick={onClick} value="DONE">
          DONE
        </ToDoBtn>
      )}
      <ToDoBtn onClick={btnClick}>X</ToDoBtn>
    </ToDoStyled>
  );
};

export default React.memo(ToDo);
