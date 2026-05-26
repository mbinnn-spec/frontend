    <script setup>
    import {
        ref,
        onMounted
    } from 'vue'

    import api from '../services/api'

    const users = ref([])

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const editId = ref(null)
    const role = ref('siswa')

    const getUsers = async () => {

        try {

            const response = await api.get('/users')

            users.value = response.data.data

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

    onMounted(() => {

        getUsers()
    })
    </script>

    <template>

    <div class="page">

        <div class="header">

            <h1>
                Dashboard Guru
            </h1>

            <p>
                Kelola akun pengguna Skill Exchange
            </p>

        </div>

        <div class="top-grid">

            <div class="form-card">

                <h2>
                    ➕ Tambah User
                </h2>

                <input
                    v-model="name"
                    type="text"
                    placeholder="Nama"
                    class="input"
                >

                <input
                    v-model="email"
                    type="email"
                    placeholder="Email"
                    class="input"
                >

                <input
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
                {{ editId ? 'Update User' : 'Tambah User' }}
                </button>

            </div>

            <div class="stats-card">

                <h2>
                    📊 Statistik
                </h2>

                <div class="stat-box">

                    <h3>
                        {{ users.length }}
                    </h3>

                    <p>
                        Total User
                    </p>

                </div>

            </div>

        </div>

        <div class="table-card">

            <h2>
                👥 Daftar User
            </h2>

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
                            {{ user.role }}
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

    </div>

    </template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');


        .page {

        min-height: 100vh;

        background: #0f1117;

        padding: 40px 24px;

        font-family:
            'Plus Jakarta Sans',
            sans-serif;
    }

    .header {

        max-width: 1200px;

        margin: auto;

        margin-bottom: 30px;
    }

    .header h1 {

        color: #eef0f8;

        font-size: 32px;

        margin-bottom: 8px;

        font-weight: 700;
    }

    .header p {

        color: #7f859f;

        font-size: 14px;
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

        background: #1a1d27;

        border:
            1px solid #2a2d3a;

        border-radius: 24px;

        padding: 28px;

        box-shadow:
            0 10px 30px rgba(0,0,0,0.25);
    }

    .form-card h2,
    .stats-card h2,
    .table-card h2 {

        color: #eef0f8;

        margin-bottom: 20px;

        font-size: 22px;

        font-weight: 700;
    }

    .input {

        width: 100%;

        padding: 16px;

        margin-bottom: 16px;

        border-radius: 14px;

        border:
            1px solid #2a2d3a;

        background: #252a3d;

        color: white;

        outline: none;

        font-size: 14px;

        transition: .2s;
    }

    .input:focus {

        border-color: #4f7cff;

        box-shadow:
            0 0 0 3px rgba(79,124,255,0.15);
    }

    .input::placeholder {

        color: #6f7693;
    }

    .add-btn {

        width: 100%;

        padding: 16px;

        border: none;

        border-radius: 14px;

        background: #4f7cff;

        color: white;

        font-weight: 600;

        font-size: 14px;

        cursor: pointer;

        transition: .2s;
    }

    .add-btn:hover {

        background: #3a67f0;

        transform: translateY(-2px);
    }

    .stat-box {

        background: #252a3d;

        border-radius: 18px;

        padding: 35px 20px;

        text-align: center;

        border:
            1px solid #303650;
    }

    .stat-box h3 {

        color: white;

        font-size: 42px;

        margin-bottom: 10px;

        font-weight: 700;
    }

    .stat-box p {

        color: #7f859f;

        font-size: 14px;
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

        padding: 18px 16px;

        text-align: left;

        border-bottom:
            1px solid #2a2d3a;
    }

    th {

        color: #7f859f;

        font-size: 13px;

        font-weight: 600;

        text-transform: uppercase;

        letter-spacing: .04em;
    }

    td {

        color: #eef0f8;

        font-size: 14px;
    }

    tr {

        transition: .2s;
    }

    tbody tr:hover {

        background: rgba(255,255,255,0.02);
    }

    .action-buttons {

        display: flex;

        align-items: center;

        gap: 12px;
    }

    .edit-btn,
    .delete-btn {

        border: none;

        padding: 10px 18px;

        border-radius: 12px;

        font-size: 13px;

        font-weight: 600;

        cursor: pointer;

        transition: .2s;

        display: flex;

        align-items: center;

        justify-content: center;

        gap: 6px;

        min-width: 110px;
    }

    .edit-btn {

        background: #4f7cff;

        color: white;
    }

    .edit-btn:hover {

        background: #3b6cf6;

        transform: translateY(-2px);
    }

    .delete-btn {

        background: #ef4444;

        color: white;
    }

    .delete-btn:hover {

        background: #dc2626;

        transform: translateY(-2px);
    }

    @media(max-width: 768px) {

        .page {

            padding: 24px 16px;
        }

        .top-grid {

            grid-template-columns: 1fr;
        }

        .header h1 {

            font-size: 26px;
        }

        .table-card {

            padding: 20px;
        }

        table {

            font-size: 14px;
        }

        th,
        td {

            padding: 14px 10px;
        }

        .action-buttons {

            flex-direction: column;

            align-items: stretch;
        }

        .edit-btn,
        .delete-btn {

            width: 100%;
        }

    }
</style>