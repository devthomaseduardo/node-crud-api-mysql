import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../services/api";

const Panel = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
`;

const Header = styled.div`
  padding: 20px 22px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  color: #111827;
  font-size: 18px;
`;

const TableWrap = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

const Th = styled.th`
  padding: 13px 18px;
  text-align: left;
  color: #6b7280;
  background: #f9fafb;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Td = styled.td`
  padding: 16px 18px;
  border-top: 1px solid #f3f4f6;
  color: #374151;
  font-size: 14px;
`;

const Name = styled.strong`
  display: block;
  color: #111827;
  margin-bottom: 3px;
`;

const Email = styled.span`
  color: #6b7280;
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Action = styled.button`
  border: 1px solid ${(props) => (props.$danger ? "#fecaca" : "#dbeafe")};
  background: ${(props) => (props.$danger ? "#fff7f7" : "#eff6ff")};
  color: ${(props) => (props.$danger ? "#b91c1c" : "#1d4ed8")};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Empty = styled.div`
  padding: 56px 24px;
  text-align: center;
  color: #6b7280;
`;

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Excluir ${user.nome}?`);
    if (!confirmed) return;

    try {
      const { data } = await api.delete(`/usuarios/${user.id}`);
      setUsers((current) => current.filter((item) => item.id !== user.id));
      setOnEdit(null);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Não foi possível excluir o usuário.");
    }
  };

  return (
    <Panel>
      <Header>
        <Title>Usuários cadastrados</Title>
      </Header>

      {!users.length ? (
        <Empty>Nenhum usuário cadastrado.</Empty>
      ) : (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th>Usuário</Th>
                <Th>Telefone</Th>
                <Th>Nascimento</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <Td>
                    <Name>{user.nome}</Name>
                    <Email>{user.email}</Email>
                  </Td>
                  <Td>{user.fone}</Td>
                  <Td>{formatDate(user.data_nascimento)}</Td>
                  <Td>
                    <Actions>
                      <Action type="button" onClick={() => setOnEdit(user)}>Editar</Action>
                      <Action type="button" $danger onClick={() => handleDelete(user)}>Excluir</Action>
                    </Actions>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </Panel>
  );
};

export default Grid;
