import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { userApi } from '../api/Userapi';
import UserForm from '../components/UserForm';
import ConfirmDialog from '../components/ConfirmDialog';

export default function UsersPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  // Modals & Forms
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null); // null = add new
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterRole) params.role = filterRole;
      const { data } = await userApi.getAll(params);
      setUsers(data);
    } catch (err) {
      setError('Không thể tải danh sách người dùng.');
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [filterRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Client-side search logic
  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      (u.fullName || '').toLowerCase().includes(term) ||
      (u.email || '').toLowerCase().includes(term) ||
      (u.phone || '').includes(term)
    );
  });

  // Filter display users: Admin sees all, non-admin only sees themselves
  const displayUsers = currentUser?.role === 'Admin'
    ? filteredUsers
    : filteredUsers.filter(u => String(u.id) === String(currentUser?.id));

  // Handle Add/Edit Form submit
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    setFormError(null);
    try {
      if (editUser) {
        // Edit mode (PUT)
        await userApi.update(editUser.id, { ...editUser, ...formData });
        showToast('Cập nhật người dùng thành công!');
      } else {
        // Create mode (POST)
        // Check if role is 'User' -> shouldn't be allowed, handled by UI, but double check
        if (currentUser.role === 'User') {
          throw new Error('Bạn không có quyền thực hiện hành động này.');
        }
        await userApi.create(formData);
        showToast('Thêm người dùng mới thành công!');
      }
      setShowForm(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lỗi khi gửi biểu mẫu.');
      showToast(err.message || 'Lỗi khi gửi biểu mẫu.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  // Toggle status (active/inactive) using PATCH with optimistic update
  const handleToggleStatus = async (user) => {
    // Only Admin and Manager can change status
    if (currentUser.role === 'User') {
      showToast('Bạn không có quyền thay đổi trạng thái.', 'error');
      return;
    }

    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    // Optimistic Update
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
    );

    try {
      await userApi.patch(user.id, { status: newStatus });
      showToast(`Đã thay đổi trạng thái của ${user.fullName} thành công.`);
    } catch (err) {
      // Revert status on failure
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: user.status } : u))
      );
      showToast('Cập nhật trạng thái thất bại.', 'error');
    }
  };

  // Disable handler (D is disable)
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await userApi.patch(deleteTarget.id, { status: 'inactive' });
      showToast(`Đã khóa tài khoản '${deleteTarget.fullName}' thành công.`);
      setDeleteTarget(null);
      fetchUsers();
    } catch (err) {
      showToast('Khóa tài khoản thất bại.', 'error');
      setDeleteTarget(null);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-message toast-${toast.type}`}>
          <div className="toast-content">
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navbar Header */}
      <header className="dashboard-header">
        <div className="header-brand">
          <h1>Hệ thống Quản lý</h1>
          <span className="subtitle">FER202 Dashboard</span>
        </div>
        <div className="header-user">
          <div className="user-profile">
            <div className="user-avatar">{currentUser?.fullName?.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <span className="user-name">{currentUser?.fullName}</span>
              <span className={`badge-role badge-${currentUser?.role?.toLowerCase()}`}>
                {currentUser?.role}
              </span>
            </div>
          </div>
          <button className="btn btn-logout" onClick={() => { logout(); navigate('/'); }}>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Board */}
      <main className="dashboard-content">
        <div className="content-card">
          {/* Controls Bar: Only show search, filters, and add options to Admin */}
          {currentUser?.role === 'Admin' && (
            <div className="controls-bar">
              <div className="search-filter-group">
                <div className="search-input-wrapper" style={{ width: '100%' }}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, email, SĐT..."
                    className="form-control-custom"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="form-select-custom filter-select"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="">Tất cả vai trò</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </select>
              </div>

              <button
                className="btn btn-primary-gradient"
                onClick={() => {
                  setEditUser(null);
                  setFormError(null);
                  setShowForm(true);
                }}
              >
                + Thêm thành viên
              </button>
            </div>
          )}

          {/* Table display */}
          <div className="table-responsive">
            {loading ? (
              <div className="table-loader">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Đang tải dữ liệu...</span>
                </div>
                <p className="mt-2">Đang tải danh sách thành viên...</p>
              </div>
            ) : error ? (
              <div className="table-error alert alert-danger">{error}</div>
            ) : displayUsers.length === 0 ? (
              <div className="table-empty">
                <p>Không tìm thấy thành viên nào phù hợp.</p>
              </div>
            ) : (
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Vai trò</th>
                    {currentUser?.role === 'Admin' && <th>Trạng thái</th>}
                    <th>Ngày tham gia</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((user) => (
                    <tr key={user.id} className="table-row">
                      <td className="fw-semibold text-white-custom">{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className={`badge-role badge-${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      {currentUser?.role === 'Admin' && (
                        <td>
                          <div className="form-check form-switch-custom d-flex justify-content-center">
                            <input
                              type="checkbox"
                              className="custom-switch-input"
                              checked={user.status === 'active'}
                              onChange={() => handleToggleStatus(user)}
                              id={`status-switch-${user.id}`}
                            />
                            <label
                              className={`status-label ${user.status}`}
                              htmlFor={`status-switch-${user.id}`}
                              style={{ cursor: 'pointer' }}
                            >
                              {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                            </label>
                          </div>
                        </td>
                      )}
                      <td>{user.createdAt}</td>
                      <td>
                        <div className="action-buttons-group">
                          {(currentUser?.role === 'Admin' || String(user.id) === String(currentUser?.id)) && (
                            <button
                              className="btn btn-sm btn-primary-custom"
                              onClick={() => {
                                setEditUser(user);
                                setFormError(null);
                                setShowForm(true);
                              }}
                              title="Chỉnh sửa"
                            >
                              Sửa
                            </button>
                          )}
                          {currentUser?.role === 'Admin' && (
                            <button
                              className="btn btn-sm btn-danger-custom ms-2"
                              onClick={() => setDeleteTarget(user)}
                              title="Khóa tài khoản"
                            >
                              Khóa
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* User Form Modal */}
      <UserForm
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setEditUser(null);
        }}
        onSubmit={handleFormSubmit}
        user={editUser}
        loading={formLoading}
        error={formError}
        isAdmin={currentUser?.role === 'Admin'}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        show={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Xác nhận khóa tài khoản"
        message={`Bạn có chắc chắn muốn khóa tài khoản của thành viên "${deleteTarget?.fullName}"?`}
      />
    </div>
  );
}
