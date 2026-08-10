import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import Grid from "./components/Grid";
import api from "./services/api";
import GlobalStyle from "./styles/global";

const Page = styled.main`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 64px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 28px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Eyebrow = styled.span`
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  color: #111827;
  font-size: clamp(30px, 5vw, 44px);
  line-height: 1.05;
  margin-top: 8px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-top: 10px;
  max-width: 620px;
  line-height: 1.6;
`;

const Count = styled.div`
  background: #111827;
  color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
`;

const Content = styled.section`
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Empty = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/usuarios");
      setUsers(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const countLabel = useMemo(
    () => `${users.length} ${users.length === 1 ? "usuário" : "usuários"}`,
    [users.length]
  );

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header>
          <div>
            <Eyebrow>Gestão de usuários</Eyebrow>
            <Title>Cadastro de usuários</Title>
            <Subtitle>
              Cadastre, consulte, edite e remova usuários em uma única tela.
            </Subtitle>
          </div>
          <Count>{countLabel}</Count>
        </Header>

        <Content>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          {loading ? (
            <Empty>Carregando usuários...</Empty>
          ) : (
            <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
          )}
        </Content>
      </Page>
      <ToastContainer autoClose={3000} position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
