<script setup>
import {
    ref,
    onMounted
} from 'vue'

import {
    useRouter
} from 'vue-router'

import api from '../services/api'

const router = useRouter()

const jadwals = ref([])

const getJadwal = async () => {

    try {

        const response = await api.get(
            '/barter-requests'
        )

        jadwals.value = response.data.data

    } catch (error) {

        console.log(error)
    }
}

const getStatusClass = (status) => {

    if (status === 'selesai') {

        return 'success'
    }

    if (status === 'berjalan') {

        return 'process'
    }

    return 'pending'
}

onMounted(() => {

    getJadwal()
})
</script>

<template>

<div class="page">

    <div class="header">

        <button
            class="back-btn"
            @click="$router.back()"
        >
            ← Back
        </button>

        <div>

            <h1>
                Jadwal Belajar
            </h1>

            <p>
                Daftar sesi barter & jadwal pembelajaran
            </p>

        </div>

    </div>

    <div class="jadwal-grid">

        <div
            class="jadwal-card"
            v-for="jadwal in jadwals"
            :key="jadwal.id"
        >

            <div class="card-top">

                <div class="badge">

                    Session #{{ jadwal.id }}

                </div>

                <div
                    class="status"
                    :class="getStatusClass(jadwal.status)"
                >

                    {{ jadwal.status }}

                </div>

            </div>

            <div class="content">

                <div class="info">

                    <span class="icon">
                        📅
                    </span>

                    <div>

                        <small>
                            Tanggal
                        </small>

                        <p>
                            {{ jadwal.session_date }}
                        </p>

                    </div>

                </div>

                <div class="info">

                    <span class="icon">
                        ⏰
                    </span>

                    <div>

                        <small>
                            Durasi
                        </small>

                        <p>
                            {{ jadwal.duration }} menit
                        </p>

                    </div>

                </div>

                <div class="info">

                    <span class="icon">
                        📝
                    </span>

                    <div>

                        <small>
                            Catatan
                        </small>

                        <p>
                            {{ jadwal.notes || 'Tidak ada catatan' }}
                        </p>

                    </div>

                </div>

                <button
                    v-if="jadwal.status === 'selesai'"
                    class="rating-btn"
                    @click="router.push('/ratings')"
                >

                    ⭐ Beri Rating

                </button>

            </div>

        </div>

    </div>

</div>

</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

* {

    margin: 0;

    padding: 0;

    box-sizing: border-box;
}

.page {

    min-height: 100vh;

    background:
        radial-gradient(
            circle at top,
            #1c2450,
            #0f1117 45%
        );

    padding: 40px 24px;

    font-family:
        'Plus Jakarta Sans',
        sans-serif;
}

.header {

    max-width: 1200px;

    margin: auto;

    margin-bottom: 34px;

    display: flex;

    align-items: center;

    gap: 20px;
}

.back-btn {

    padding: 12px 18px;

    border: none;

    border-radius: 14px;

    background: #1a1d27;

    color: white;

    border:
        1px solid #2a2d3a;

    cursor: pointer;

    transition: .2s;

    font-size: 14px;

    font-weight: 600;
}

.back-btn:hover {

    border-color: #4f7cff;

    background: #202538;

    transform:
        translateY(-2px);
}

.header h1 {

    color: #eef0f8;

    font-size: 34px;

    margin-bottom: 6px;
}

.header p {

    color: #7f859f;

    font-size: 14px;
}

.jadwal-grid {

    max-width: 1200px;

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(340px, 1fr));

    gap: 24px;
}

.jadwal-card {

    background:
        rgba(26,29,39,0.95);

    border:
        1px solid rgba(255,255,255,0.06);

    border-radius: 28px;

    overflow: hidden;

    transition: .25s;

    backdrop-filter: blur(14px);
}

.jadwal-card:hover {

    transform:
        translateY(-6px);

    border-color: #4f7cff;

    box-shadow:
        0 18px 30px rgba(0,0,0,0.3);
}

.card-top {

    padding: 22px 24px;

    background: #16192a;

    border-bottom:
        1px solid #2a2d3a;

    display: flex;

    justify-content: space-between;

    align-items: center;
}

.badge {

    padding: 6px 14px;

    border-radius: 999px;

    background: #252a3d;

    border:
        1px solid #3a3f55;

    color: #9aa4d6;

    font-size: 12px;

    font-weight: 600;
}

.status {

    padding: 8px 14px;

    border-radius: 12px;

    font-size: 12px;

    font-weight: 700;

    text-transform: capitalize;
}

.pending {

    background: rgba(250,204,21,0.15);

    color: #facc15;
}

.process {

    background: rgba(59,130,246,0.15);

    color: #60a5fa;
}

.success {

    background: rgba(34,197,94,0.15);

    color: #4ade80;
}

.content {

    padding: 24px;

    display: flex;

    flex-direction: column;

    gap: 20px;
}

.info {

    display: flex;

    gap: 14px;

    align-items: flex-start;
}

.icon {

    width: 46px;

    height: 46px;

    border-radius: 14px;

    background: #252a3d;

    display: flex;

    justify-content: center;

    align-items: center;

    flex-shrink: 0;

    font-size: 18px;
}

.info small {

    color: #6f7693;

    font-size: 12px;
}

.info p {

    color: #eef0f8;

    margin-top: 4px;

    line-height: 1.6;

    font-size: 14px;
}

.rating-btn {

    margin-top: 10px;

    border: none;

    padding: 14px;

    border-radius: 16px;

    background:
        linear-gradient(
            135deg,
            #facc15,
            #eab308
        );

    color: black;

    font-weight: 700;

    cursor: pointer;

    transition: .2s;
}

.rating-btn:hover {

    transform:
        translateY(-2px);

    box-shadow:
        0 10px 20px rgba(250,204,21,0.2);
}

@media(max-width: 768px) {

    .page {

        padding: 24px 16px;
    }

    .header {

        flex-direction: column;

        align-items: flex-start;
    }

    .header h1 {

        font-size: 28px;
    }

}

</style>