import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import TaskPage from "@pages/TaskPage";
import { Provider } from "react-redux";
import { store } from "@entities/model/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
