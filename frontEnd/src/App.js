import Header from "./components/header";
import { Box } from "@mui/material";
import "./App.css";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="App">
      <Box width={"70vw"} height={400}>
        <Header />
        <Graph />
      </Box>
    </div>
  );
}

export default App;
