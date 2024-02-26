import "./App.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import TestDropZone from "./components/testDropZone";

function App() {
  return (
    <div>
      <TestDropZone />
    </div>
  );
}

export default App;
