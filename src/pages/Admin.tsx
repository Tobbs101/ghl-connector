import { Users, Shield, Mail, Clock, Edit2, Trash2, X } from "lucide-react";
import { users as initialUsers } from "../data/mockData";
import { useState } from "react";
import type { User, UserRole, UserStatus } from "../types";

type ModalType = "add" | "edit" | "delete" | null;

const Admin = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User" as UserRole,
    status: "Active" as UserStatus,
  });

  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });
    setModalType("add");
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModalType("edit");
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setUsers([...users, newUser]);
    closeModal();
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? { ...user, status: formData.status }
          : user
      )
    );
    closeModal();
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    closeModal();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700";
      case "Manager":
        return "bg-blue-100 text-blue-700";
      case "User":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getRoleIcon = (role: string) => {
    if (role === "Admin") return <Shield className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white px-8 py-10 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-slate-900" />
              <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">
                Admin Panel
              </h1>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Manage users and their roles across your organization
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
          >
            + Add User
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {users.length}
              </p>
            </div>
            <Users className="h-8 w-8 text-slate-400" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Admins</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {users.filter((u) => u.role === "Admin").length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Users</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {users.filter((u) => u.status === "Active").length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-emerald-100" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Users ({users.length})
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* {getRoleIcon(user.role)} */}
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {user.joinedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add User Modal */}
      {modalType === "add" && (
        <div className="fixed inset-0 z-50 top-[-32px] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                Add New User
              </h3>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  placeholder="user@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as UserRole,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Status
                </label>
                <div className="mt-2 flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Active account
                    </p>
                    <p className="text-xs text-slate-500">
                      User can access the system
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        status:
                          formData.status === "Active" ? "Inactive" : "Active",
                      })
                    }
                    className={`flex h-8 w-16 items-center rounded-full transition ${
                      formData.status === "Active"
                        ? "bg-lumeo justify-end"
                        : "bg-slate-200 justify-start"
                    }`}
                  >
                    <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-700">
                      {formData.status === "Active" ? "On" : "Off"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={!formData.name || !formData.email}
                className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {modalType === "edit" && selectedUser && (
        <div className="fixed inset-0 z-50 top-[-32px] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                Edit User
              </h3>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Account Status
                </label>
                <div className="mt-2 flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {formData.status === "Active" ? "Active" : "Disabled"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formData.status === "Active"
                        ? "User can access the system"
                        : "User cannot access the system"}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        status:
                          formData.status === "Active" ? "Inactive" : "Active",
                      })
                    }
                    className={`flex h-8 w-16 items-center rounded-full transition ${
                      formData.status === "Active"
                        ? "bg-lumeo justify-end"
                        : "bg-slate-200 justify-start"
                    }`}
                  >
                    <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-700">
                      {formData.status === "Active" ? "On" : "Off"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === "delete" && selectedUser && (
        <div className="fixed inset-0 z-50 top-[-32px] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                Delete User
              </h3>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <Trash2
                      strokeWidth={1.8}
                      className="h-5 w-5 text-red-600"
                    />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-red-900">
                      {selectedUser.name}{" "}
                      <span className="text-[11px] font-semibold text-gray-800">
                        ({selectedUser.role})
                      </span>
                    </p>
                    <p className="text-[13px] mt-1 text-gray-700">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
