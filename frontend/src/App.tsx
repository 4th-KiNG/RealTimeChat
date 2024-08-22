import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./share/components";
import { AuthPage, ChatPage, MainPage, ProfilePage } from "./pages";
import { observer } from "mobx-react-lite";
import { useAuth } from "./lib/hooks/useAuth";

const App = observer(() => {
  const { user, error } = useAuth();
  if (!user || error || user.id === "") return <AuthPage />;
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Routes>
      </Layout>
    </>
  );
});

export default App;
