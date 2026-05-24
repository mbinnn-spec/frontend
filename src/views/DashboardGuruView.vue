<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const users = ref([])

const getUsers = async () => {

    try {

        const response = await api.get('/users')

        users.value = response.data.user.role

    } catch (error) {

        console.log(error)
    }
}

onMounted(() => {
    getUsers()
})
</script>

<template>

<div class="container">

    <div class="navbar">
        <h2>Dashboard Guru</h2>
    </div>

    <div class="stats">

        <div class="stat-card">
            <h3>Total User</h3>
            <p>{{ users.length }}</p>
        </div>

        <div class="stat-card">
            <h3>Monitoring</h3>
            <p>Aktif</p>
        </div>

    </div>

    <div class="table-container">

        <h2>Daftar Akun</h2>

        <table>

            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                </tr>
            </tbody>

        </table>

    </div>

</div>

</template>

<style scoped>

.container {
    min-height: 100vh;
    background: #edf2f7;
}

.navbar {
    background: #4f8cff;
    color: white;
    padding: 20px;
}

.stats {
    display: flex;
    gap: 20px;
    padding: 20px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 15px;
    width: 200px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.table-container {
    background: white;
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.table-container table {
    width: 100%;
    border-collapse: collapse;
}

.table-container th,
.table-container td {
    border-bottom: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

</style>
