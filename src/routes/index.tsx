import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { db, auth } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";

type Todos = {
  id: string;
  title: string;
  completed: boolean;
};
let todos: Todos[] = [];

const fetchTodos = async () => {
  const querySnapshot = await getDocs(
    collection(db, "todos", auth.currentUser!.uid, "items")
  );
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};

export const Route = createFileRoute("/")({
  loader: async () => {
    todos = (await fetchTodos()) as Todos[];
    console.log(todos);
  },
  staleTime: 1_000,
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <div className="p-2">{auth?.currentUser?.email}</div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </>
  );
}
