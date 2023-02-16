import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditVideoView from "./components/EditVideoView";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SingleVideoView from "./components/SingleVideoView";
import Upload from "./components/Upload";
import { UserContextProvider } from "./utils/UserProvider";
import { VideoProvider } from "./utils/VideoContext";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <VideoProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/watch/:id" element={<SingleVideoView />} />
                <Route path="/edit/:id" element={<EditVideoView />} />
              </Routes>
            </Router>
          </VideoProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
