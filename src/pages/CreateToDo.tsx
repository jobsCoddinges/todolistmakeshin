import { useSetRecoilState, useRecoilValue } from "recoil";
import { categorys, IToDos, ToDos } from "../atom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
interface IToDo {
  ToDo: string;
}
const AddButton = styled(motion.button)`
  border: none;
  border-radius: 3px;
  width: 45px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
`;
const ToDoInput = styled.input`
  height: 30px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
`;
const CreateToDo = () => {
  const category = useRecoilValue(categorys);
  const setToDos = useSetRecoilState(ToDos);
  const { register, handleSubmit, setValue } = useForm<IToDo>();
  const onVaild = ({ ToDo }: IToDo) => {
    setToDos((todos) => {
      return [...todos, { id: Date.now(), text: ToDo, category: category }];
    });
    setValue("ToDo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onVaild)}>
        <ToDoInput
          {...register("ToDo", { required: true })}
          type="text"
          placeholder="What To Do?"
        />
        <AddButton>Add</AddButton>
      </form>
    </>
  );
};

export default CreateToDo;
