import toast from "react-hot-toast";
import api from "../services/api";
import type { User } from "../types";

interface UserGridProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setOnEdit: (user: User | null) => void;
}

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export default function UserGrid({ users, setUsers, setOnEdit }: UserGridProps) {
  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(`Excluir ${user.nome}?`);
    if (!confirmed) return;

    try {
      const { data } = await api.delete(`/usuarios/${user.id}`);
      setUsers((current) => current.filter((item) => item.id !== user.id));
      setOnEdit(null);
      toast.success(data.message || "Usuario excluido.");
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Nao foi possivel excluir o usuario.";
      toast.error(msg);
    }
  };

  return (
    <div className="panel">
      <div className="grid-header">
        <h2 className="panel-title">Usuarios cadastrados</h2>
      </div>

      {!users.length ? (
        <div className="empty">Nenhum usuario cadastrado.</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Telefone</th>
                <th>Nascimento</th>
                <th style={{ textAlign: "right" }}>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="name">{user.nome}</span>
                    <span className="email">{user.email}</span>
                  </td>
                  <td>{user.fone}</td>
                  <td>{formatDate(user.data_nascimento)}</td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="action-btn action-edit" onClick={() => setOnEdit(user)}>
                        Editar
                      </button>
                      <button type="button" className="action-btn action-delete" onClick={() => handleDelete(user)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
