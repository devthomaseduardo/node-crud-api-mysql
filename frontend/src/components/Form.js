import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../services/api";

const Panel = styled.form`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.05);
  position: sticky;
  top: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const Heading = styled.h2`
  color: #111827;
  font-size: 20px;
  margin-bottom: 6px;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 22px;
`;

const Field = styled.label`
  display: block;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  margin-top: 7px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const Button = styled.button`
  flex: 1;
  height: 44px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  background: ${(props) => (props.$secondary ? "#f3f4f6" : "#2563eb")};
  color: ${(props) => (props.$secondary ? "#374151" : "#fff")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const initialForm = {
  nome: "",
  email: "",
  fone: "",
  data_nascimento: "",
};

const normalizeDate = (value) => (value ? String(value).slice(0, 10) : "");

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const [form, setForm] = useState(initialForm);
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

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleCancel = () => {
    setOnEdit(null);
    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(form).some((value) => !value.trim())) {
      toast.warn("Preencha todos os campos.");
      return;
    }

    try {
      setSaving(true);
      const response = onEdit
        ? await api.put(`/usuarios/${onEdit.id}`, form)
        : await api.post("/usuarios", form);

      toast.success(response.data.message);
      handleCancel();
      await getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Não foi possível salvar o usuário.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Panel onSubmit={handleSubmit}>
      <Heading>{onEdit ? "Editar usuário" : "Novo usuário"}</Heading>
      <Description>
        {onEdit ? "Atualize os dados selecionados." : "Preencha os dados para adicionar um novo usuário."}
      </Description>

      <Field>
        Nome
        <Input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" />
      </Field>
      <Field>
        E-mail
        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="nome@email.com" />
      </Field>
      <Field>
        Telefone
        <Input name="fone" value={form.fone} onChange={handleChange} placeholder="(11) 99999-9999" />
      </Field>
      <Field>
        Data de nascimento
        <Input name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} />
      </Field>

      <Actions>
        {onEdit && (
          <Button type="button" $secondary onClick={handleCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : onEdit ? "Salvar alterações" : "Cadastrar"}
        </Button>
      </Actions>
    </Panel>
  );
};

export default Form;
