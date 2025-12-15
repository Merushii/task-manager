import { useSelector } from "react-redux"
import Login from "./components/Login"
import TaskList from "./components/TaskList"

function App() {
  const token = useSelector(state => state.auth.token)

  return token ? <TaskList /> : <Login />
}

export default App
