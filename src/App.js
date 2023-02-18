/* eslint-disable */
import { DataProvider } from "./components/DataProvider";
import FormInput from "./components/FormInput";
import CheckDelete from "./components/CheckDelete";
import List from "./components/List";
import Status from "./components/Status";
import './App.scss';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <h1><span role="img" aria-label="ledger">📒</span><span>TO-DO</span> LIST</h1>
        <FormInput />
        <CheckDelete />
        <List />
        <Status />
      </div>
    </DataProvider>
  );
}

export default App;
