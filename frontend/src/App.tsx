import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./share/components";
import { AuthPage, ChatPage, MainPage, ProfilePage } from "./pages";
import { observer } from "mobx-react-lite";
import { useAuth } from "./lib/hooks/useAuth";

const App = observer(() => {
  const { user, error } = useAuth();

  return (
    <>
      {user && !error && user.id !== "" ? (
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
          </Routes>
        </Layout>
      ) : (
        <AuthPage />
      )}
    </>
  );
});

export default App;
