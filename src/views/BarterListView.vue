    <script setup>
    import { ref, onMounted } from 'vue'
    import api from '../services/api'

    const barters = ref([])

    const getBarters = async () => {

    try {

        const response = await api.get('/barter-requests')

        barters.value = response.data

    } catch (error) {

        console.log(error)

    }

    }

    onMounted(() => {

    getBarters()

    })
    </script>

    <template>

    <div class="page">

    <div class="header">

        <div class="badge">

        <span class="badge-dot" />

        Barter Activity

        </div>

        <h1>
        List Pengajuan Barter
        </h1>

        <p>
        Pantau status barter skill
        yang telah kamu ajukan.
        </p>

    </div>

    <div
        v-if="barters.length"
        class="barter-list"
    >

        <div
        class="barter-card"
        v-for="barter in barters"
        :key="barter.id"
        >

        <div class="accent-line" />

        <div class="top">

            <div>

            <h2>
                Barter Skill
            </h2>

            <p class="mentor">

                {{ barter.requester_name }}

            </p>

            </div>

            <div class="status pending">

            {{ barter.status }}

            </div>

        </div>

        <div class="bottom">

            <span>
            📅 {{ barter.session_date }}
            </span>

        </div>

        </div>

    </div>

    <div
        v-else
        class="empty-state"
    >

        <div class="empty-icon">
        🤝
        </div>

        <h2>
        Belum Ada Pengajuan
        </h2>

        <p>
        Kamu belum melakukan barter skill.
        </p>

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

    max-width: 900px;

    margin: auto;

    margin-bottom: 34px;
    }

    .badge {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    background: #252a3d;

    border:
        1px solid #3a3f55;

    color: #8b95c9;

    font-size: 11px;

    font-weight: 600;

    padding: 5px 12px;

    border-radius: 999px;

    text-transform: uppercase;

    margin-bottom: 18px;
    }

    .badge-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: #6c7dd4;
    }

    .header h1 {

    color: #eef0f8;

    font-size: 38px;

    margin-bottom: 12px;
    }

    .header p {

    color: #7f859f;

    line-height: 1.8;
    }

    .barter-list {

    max-width: 900px;

    margin: auto;

    display: flex;

    flex-direction: column;

    gap: 22px;
    }

    .barter-card {

    position: relative;

    background: #1a1d27;

    border:
        1px solid #2a2d3a;

    border-radius: 24px;

    padding: 28px;

    overflow: hidden;
    }

    .accent-line {

    position: absolute;

    top: 0;

    left: 28px;

    right: 28px;

    height: 2px;

    background:
        linear-gradient(
        90deg,
        #6c7dd4,
        #4f7cff,
        transparent
        );
    }

    .top {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 18px;
    }

    .top h2 {

    color: #eef0f8;

    margin-bottom: 8px;
    }

    .mentor {

    color: #7f859f;

    font-size: 14px;
    }

    .status {

    padding: 8px 14px;

    border-radius: 999px;

    font-size: 12px;

    font-weight: 600;

    text-transform: uppercase;
    }

    .pending {

    background:
        rgba(255, 184, 0, 0.12);

    color: #ffb800;
    }

    .bottom {

    color: #7f859f;

    font-size: 14px;
    }

    .empty-state {

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    margin-top: 120px;
    }

    .empty-icon {

    font-size: 72px;

    margin-bottom: 20px;
    }

    .empty-state h2 {

    color: #eef0f8;

    margin-bottom: 12px;
    }

    .empty-state p {

    color: #7f859f;
    }
    </style>    