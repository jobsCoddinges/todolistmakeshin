import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "TO_DO",
  storage: localStorage,
});
export interface IToDos {
  id: number;
  text: string;
  category: string;
}

export const ToDos = atom<IToDos[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categorys = atom<"TO_DO" | "DOING" | "DONE">({
  key: "category",
  default: "TO_DO",
});

export const selectToDos = selector({
  key: "selectToDo",
  get: ({ get }) => {
    const toDos = get(ToDos);
    const category = get(categorys);
    return [...toDos.filter((todo) => todo.category === category)];
  },
});
