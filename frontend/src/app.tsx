import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoListScreen from "./components/screens/todo-list-screen";
import "./app.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen overflow-x-hidden">
        <TodoListScreen />
      </div>
    </QueryClientProvider>
  );
};

export default App;
