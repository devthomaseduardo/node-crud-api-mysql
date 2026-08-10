import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import UserForm from "./components/UserForm";
import UserGrid from "./components/UserGrid";
import api from "./services/api";
import type { User } from "./types";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [onEdit, setOnEdit] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<User[]>("/usuarios");
      setUsers(data);
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Nao foi possivel carregar os usuarios.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const countLabel = useMemo(
    () => `${users.length} ${users.length === 1 ? "usuario" : "usuarios"}`,
    [users.length]
  );

  return (
    <main className="page">
      <header className="header">
        <div>
          <span className="eyebrow">Gestao de usuarios</span>
          <h1 className="title">Cadastro de usuarios</h1>
          <p className="subtitle">
            Cadastre, consulte, edite e remova usuarios em uma unica tela.
            Conectado a API Node + MySQL.
          </p>
        </div>
        <div className="count">{countLabel}</div>
      </header>

      <section className="content">
        <UserForm onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        {loading ? (
          <div className="panel empty">Carregando usuarios...</div>
        ) : (
          <UserGrid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
        )}
      </section>
    </main>
  );
}
