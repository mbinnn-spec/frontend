<script setup>
import {
    ref,
    onMounted
} from 'vue'

import api from '../services/api'

import {
    useRouter
} from 'vue-router'

const router = useRouter()

const users = ref([])
const barterRequests = ref([])

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('siswa')

const editId = ref(null)

const getUsers = async () => {

    try {

        const response = await api.get('/users')

        users.value = response.data.data

    } catch (error) {

        console.log(error)
    }
}

const getBarterRequests = async () => {

    try {

        const response = await api.get(
            '/barter-requests'
        )

        barterRequests.value =
            response.data.data

    } catch (error) {

        console.log(error)
    }
}

const selectUser = (user) => {

    editId.value = user.id

    name.value = user.name

    email.value = user.email

    role.value = user.role
}

const addUser = async () => {

    try {

        if (editId.value) {

            await api.put(`/users/${editId.value}`, {

                name: name.value,

                email: email.value,

                role: role.value
            })

            alert('User berhasil diupdate')

        } else {

            await api.post('/users', {

                name: name.value,

                email: email.value,

                password: password.value,

                role: role.value
            })

            alert('User berhasil ditambahkan')
        }

        editId.value = null

        name.value = ''
        email.value = ''
        password.value = ''
        role.value = 'siswa'

        getUsers()

    } catch (error) {

        console.log(error)

        alert('Terjadi error')
    }
}

const deleteUser = async (id) => {

    try {

        await api.delete(`/users/${id}`)

        alert('User berhasil dihapus')

        getUsers()

    } catch (error) {

        console.log(error)

        alert('Gagal hapus user')
    }
}

const updateStatus = async (
    id,
    status
) => {

    try {

        await api.put(

            `/barter-requests/${id}`,

            {
                status: status
            }
        )

        getBarterRequests()

    } catch (error) {

        console.log(error)
    }
}

const logout = () => {

    localStorage.removeItem('user')

    router.push('/')
}

onMounted(() => {

    getUsers()

    getBarterRequests()
})
</script>

<template>

<div class="page">

    <div class="header-wrapper">

        <div class="header">

            <div>

                <div class="badge">
                    👨‍🏫 Admin Panel
                </div>

                <h1>
                    Dashboard Guru
                </h1>

                <p>
                    Kelola akun & barter Skill Exchange
                </p>

            </div>

            <button
                class="logout-btn"
                @click="logout"
            >
                ⏻ Logout
            </button>

        </div>

    </div>

    <div class="top-grid">

        <div class="form-card">

            <div class="card-title">

                <span>
                    ✨
                </span>

                <h2>
                    {{ editId ? 'Edit User' : 'Tambah User' }}
                </h2>

            </div>

            <input
                v-model="name"
                type="text"
                placeholder="Nama lengkap"
                class="input"
            >

            <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="input"
            >

            <input
                v-if="!editId"
                v-model="password"
                type="password"
                placeholder="Password"
                class="input"
            >

            <select
                v-model="role"
                class="input"
            >

                <option value="siswa">
                    Siswa
                </option>

                <option value="guru">
                    Guru
                </option>

            </select>

            <button
                @click="addUser"
                class="add-btn"
            >

                {{ editId ? '💾 Update User' : '➕ Tambah User' }}

            </button>

        </div>

        <div class="stats-card">

            <div class="card-title">

                <span>
                    📊
                </span>

                <h2>
                    Statistik
                </h2>

            </div>

            <div class="stat-box">

                <h3>
                    {{ users.length }}
                </h3>

                <p>
                    Total Pengguna
                </p>

            </div>

        </div>

    </div>

    <div class="table-card">

        <div class="card-title">

            <span>
                👥
            </span>

            <h2>
                Daftar User
            </h2>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Nama</th>

                    <th>Email</th>

                    <th>Role</th>

                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-for="user in users"
                    :key="user.id"
                >

                    <td>
                        {{ user.name }}
                    </td>

                    <td>
                        {{ user.email }}
                    </td>

                    <td>

                        <span
                            class="role-badge"
                            :class="user.role"
                        >

                            {{ user.role }}

                        </span>

                    </td>

                    <td class="action-buttons">

                        <button
                            class="edit-btn"
                            @click="selectUser(user)"
                        >

                            ✏️ Edit

                        </button>

                        <button
                            class="delete-btn"
                            @click="deleteUser(user.id)"
                        >

                            🗑 Hapus

                        </button>

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

    <div class="table-card barter-section">

        <div class="card-title">

            <span>
                🔄
            </span>

            <h2>
                Request Barter
            </h2>

        </div>

        <div
            class="barter-card"
            v-for="barter in barterRequests"
            :key="barter.id"
        >

            <div class="barter-info">

                <h3>
                    {{ barter.requester_name }}
                </h3>

                <p>
                    📅 {{ barter.session_date }}
                </p>

                <p>
                    ⏰ {{ barter.duration }} menit
                </p>

                <p>
                    📝 {{ barter.notes || 'Tidak ada catatan' }}
                </p>

            </div>

            <div class="barter-right">

                <div
                    class="status-badge"
                    :class="barter.status"
                >

                    {{ barter.status }}

                </div>

                <div class="barter-actions">

                    <button
                        v-if="
                            barter.status ===
                            'menunggu'
                        "
                        class="process-btn"
                        @click="
                            updateStatus(
                                barter.id,
                                'berjalan'
                            )
                        "
                    >

                        ACC

                    </button>

                    <button
                        v-if="
                            barter.status ===
                            'berjalan'
                        "
                        class="success-btn"
                        @click="
                            updateStatus(
                                barter.id,
                                'selesai'
                            )
                        "
                    >

                        Selesaikan

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.page {

    min-height: 100vh;

    background:
        radial-gradient(
            circle at top,
            #1b2140,
            #0f1117 45%
        );

    padding: 40px 24px;

    font-family:
        'Plus Jakarta Sans',
        sans-serif;
}

.header-wrapper {

    max-width: 1200px;

    margin: auto;

    margin-bottom: 30px;
}

.header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;
}

.badge {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding: 8px 14px;

    border-radius: 999px;

    background:
        rgba(79,124,255,0.15);

    color: #8fa8ff;

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 18px;

    border:
        1px solid rgba(79,124,255,0.25);
}

.header h1 {

    color: #eef0f8;

    font-size: 38px;

    margin-bottom: 10px;

    font-weight: 700;
}

.header p {

    color: #8a90ac;

    font-size: 15px;
}

.logout-btn {

    border: none;

    background:
        linear-gradient(
            135deg,
            #ef4444,
            #dc2626
        );

    color: white;

    padding: 14px 22px;

    border-radius: 16px;

    font-weight: 600;

    cursor: pointer;

    transition: .25s;
}

.logout-btn:hover {

    transform:
        translateY(-3px);
}

.top-grid {

    max-width: 1200px;

    margin: auto;

    display: grid;

    grid-template-columns:
        2fr 1fr;

    gap: 24px;

    margin-bottom: 24px;
}

.form-card,
.stats-card,
.table-card {

    background:
        rgba(26,29,39,0.92);

    backdrop-filter: blur(14px);

    border:
        1px solid rgba(255,255,255,0.06);

    border-radius: 28px;

    padding: 28px;
}

.card-title {

    display: flex;

    align-items: center;

    gap: 12px;

    margin-bottom: 22px;
}

.card-title span {

    width: 42px;

    height: 42px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        rgba(79,124,255,0.15);

    font-size: 18px;
}

.card-title h2 {

    color: #eef0f8;

    font-size: 22px;

    font-weight: 700;
}

.input {

    width: 100%;

    padding: 16px 18px;

    margin-bottom: 16px;

    border-radius: 16px;

    border:
        1px solid #2f354d;

    background: #252a3d;

    color: white;

    outline: none;
}

.input:focus {

    border-color: #4f7cff;
}

.add-btn {

    width: 100%;

    border: none;

    padding: 16px;

    border-radius: 16px;

    background:
        linear-gradient(
            135deg,
            #4f7cff,
            #3b6cf6
        );

    color: white;

    font-weight: 700;

    cursor: pointer;
}

.stat-box {

    height: 220px;

    border-radius: 24px;

    background:
        linear-gradient(
            135deg,
            #252a3d,
            #1e2233
        );

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;
}

.stat-box h3 {

    font-size: 54px;

    color: white;
}

.stat-box p {

    color: #8a90ac;
}

.table-card {

    max-width: 1200px;

    margin: auto;

    overflow-x: auto;
}

table {

    width: 100%;

    border-collapse: collapse;
}

th,
td {

    padding: 18px 14px;

    text-align: left;

    border-bottom:
        1px solid rgba(255,255,255,0.06);
}

th {

    color: #7d84a2;

    font-size: 13px;
}

td {

    color: #eef0f8;
}

.role-badge {

    padding: 8px 14px;

    border-radius: 999px;

    font-size: 12px;

    font-weight: 600;
}

.role-badge.siswa {

    background:
        rgba(79,124,255,0.15);

    color: #8fa8ff;
}

.role-badge.guru {

    background:
        rgba(34,197,94,0.15);

    color: #4ade80;
}

.action-buttons {

    display: flex;

    gap: 12px;
}

.edit-btn,
.delete-btn {

    border: none;

    padding: 11px 18px;

    border-radius: 14px;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    color: white;
}

.edit-btn {

    background:
        linear-gradient(
            135deg,
            #4f7cff,
            #3b6cf6
        );
}

.delete-btn {

    background:
        linear-gradient(
            135deg,
            #ef4444,
            #dc2626
        );
}

.barter-section {

    margin-top: 24px;
}

.barter-card {

    background: #252a3d;

    border:
        1px solid #303650;

    border-radius: 22px;

    padding: 22px;

    margin-top: 18px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;
}

.barter-info h3 {

    color: white;

    margin-bottom: 10px;
}

.barter-info p {

    color: #8a90ac;

    font-size: 14px;

    margin-bottom: 6px;
}

.barter-right {

    display: flex;

    flex-direction: column;

    align-items: flex-end;

    gap: 14px;
}

.status-badge {

    padding: 8px 14px;

    border-radius: 999px;

    font-size: 12px;

    font-weight: 700;

    text-transform: capitalize;
}

.status-badge.menunggu {

    background:
        rgba(250,204,21,0.15);

    color: #facc15;
}

.status-badge.berjalan {

    background:
        rgba(59,130,246,0.15);

    color: #60a5fa;
}

.status-badge.selesai {

    background:
        rgba(34,197,94,0.15);

    color: #4ade80;
}

.barter-actions {

    display: flex;

    gap: 12px;
}

.process-btn,
.success-btn {

    border: none;

    padding: 12px 18px;

    border-radius: 14px;

    color: white;

    font-weight: 700;

    cursor: pointer;
}

.process-btn {

    background:
        linear-gradient(
            135deg,
            #3b82f6,
            #2563eb
        );
}

.success-btn {

    background:
        linear-gradient(
            135deg,
            #22c55e,
            #16a34a
        );
}

@media(max-width: 768px) {

    .page {

        padding: 24px 16px;
    }

    .header {

        flex-direction: column;

        align-items: flex-start;
    }

    .top-grid {

        grid-template-columns: 1fr;
    }

    .barter-card {

        flex-direction: column;

        align-items: flex-start;
    }

    .barter-right {

        width: 100%;

        align-items: stretch;
    }

}
</style>