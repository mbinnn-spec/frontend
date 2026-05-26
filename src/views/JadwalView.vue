    <script setup>
    import {
        ref,
        onMounted
    } from 'vue'

    import api from '../services/api'

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

                    <div class="status">

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

                </div>

            </div>

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
    }

    .header h1 {

        color: #eef0f8;

        font-size: 32px;

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

        background: #1a1d27;

        border:
            1px solid #2a2d3a;

        border-radius: 24px;

        overflow: hidden;

        transition: .25s;
    }

    .jadwal-card:hover {

        transform:
            translateY(-5px);

        border-color: #4f7cff;
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

        padding: 6px 12px;

        border-radius: 12px;

        background: #4f7cff;

        color: white;

        font-size: 12px;

        font-weight: 600;
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

        width: 42px;

        height: 42px;

        border-radius: 12px;

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

    @media(max-width: 768px) {

        .page {

            padding: 24px 16px;
        }

        .header {

            flex-direction: column;

            align-items: flex-start;
        }

        .header h1 {

            font-size: 26px;
        }

    }
    </style>