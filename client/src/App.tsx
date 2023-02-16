import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/views/HomeView";
import Login from "./components/views/LoginView";
import Navbar from "./components/Navbar";
import Register from "./components/views/RegisterView";
import SingleVideoView from "./components/views/SingleVideoView";
import Upload from "./components/views/UploadView";
import { UserContextProvider } from "./utils/UserContext";
import { VideoProvider } from "./utils/VideoContext";
import SearchView from "./components/views/SearchView";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="h-full w-full">
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
                <Route path="/search/:query" element={<SearchView />} />
              </Routes>
            </Router>
          </VideoProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
