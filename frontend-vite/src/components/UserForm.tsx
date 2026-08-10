import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import type { User, UserFormData } from "../types";

const initialForm: UserFormData = {
  nome: "",
  email: "",
  fone: "",
  data_nascimento: "",
};

const normalizeDate = (value?: string) =>
  value ? String(value).slice(0, 10) : "";

interface UserFormProps {
  onEdit: User | null;
  setOnEdit: (user: User | null) => void;
  getUsers: () => Promise<void>;
}

export default function UserForm({ onEdit, setOnEdit, getUsers }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!onEdit) {
      setForm(initialForm);
      return;
    }
    setForm({
      nome: onEdit.nome || "",
      email: onEdit.email || "",
      fone: onEdit.fone || "",
      data_nascimento: normalizeDate(onEdit.data_nascimento),
    });
  }, [onEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setOnEdit(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(form).some((v) => !String(v).trim())) {
      toast.error("Preencha todos os campos.");
      return;
    }

    try {
      setSaving(true);
      const response = onEdit
        ? await api.put(`/usuarios/${onEdit.id}`, form)
        : await api.post("/usuarios", form);

      toast.success(response.data.message || "Salvo com sucesso.");
      handleCancel();
      await getUsers();
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Nao foi possivel salvar o usuario.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="panel form-panel">
      <h2 className="panel-title">{onEdit ? "Editar usuario" : "Novo usuario"}</h2>
      <p className="panel-desc">
        {onEdit
          ? "Atualize os dados selecionados."
          : "Preencha os dados para adicionar um novo usuario."}
      </p>

      <label className="field">
        Nome
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
      </label>
      <label className="field">
        E-mail
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="nome@email.com" />
      </label>
      <label className="field">
        Telefone
        <input name="fone" value={form.fone} onChange={handleChange} placeholder="(11) 99999-9999" />
      </label>
      <label className="field">
        Data de nascimento
        <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} />
      </label>

      <div className="actions">
        {onEdit && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Salvando..." : onEdit ? "Salvar alteracoes" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}
