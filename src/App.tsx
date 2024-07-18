import BottomBar from "./components/organs/BottomBar";
import Router from "./Router";
import { useGlobalStore } from "./store/store";

function App() {
  const showBar = useGlobalStore((state) => state.showBottomBar);
  return (
    <>
      <Router />
      {showBar && <BottomBar />}
    </>
  );
}

export default App;
