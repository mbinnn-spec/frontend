<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const ratings = ref([])

const getRatings = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) return

        const response = await api.get(`/ratings?user_id=${user.id}`)
        ratings.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getRatings()
})

const menus = [
    // {
    //     title: 'Barter',
    //     desc: 'Lihat pengajuan barter',
    //     icon: '🤝',
    //     path: '/barters'
    // },
    {
        title: 'Daftar Skill',
        desc: 'Lihat skill yang tersedia',
        icon: '📚',
        path: '/skills'
    },
    {
        title: 'Chat',
        desc: 'Chat mentor & murid',
        icon: '💬',
        path: '/chat'
    },
    {
        title: 'Jadwal',
        desc: 'Lihat jadwal belajar',
        icon: '📅',
        path: '/jadwal'
    },
    // {
    //     title: 'Rating',
    //     desc: 'Beri rating sesi',
    //     icon: '⭐',
    //     path: '/ratings'
    // }
    ]
    </script>

    <template>

    <div class="page">

    <div class="hero">

        <div class="hero-content">

        <div class="badge">

            <span class="badge-dot" />

            Dashboard Murid

        </div>

        <h1>
            Selamat Datang 👋
        </h1>

        <p>
            Kelola pembelajaran, cari skill baru,
            dan mulai barter skill dengan komunitas.
        </p>

        </div>

    </div>

    <div class="menu-grid">

        <div
        class="menu-card"
        v-for="menu in menus"
        :key="menu.title"
        @click="router.push(menu.path)"
        >

        <div class="accent-line" />

        <div class="icon">

            {{ menu.icon }}

        </div>

        <h2>

            {{ menu.title }}

        </h2>

        <p>

            {{ menu.desc }}

        </p>

        <button class="open-btn">

            Buka Menu

        </button>

        </div>

    </div>

    <div class="rating-history">

        <div class="section-title">

            <span>⭐</span>

            <h2>Riwayat Rating</h2>

        </div>

        <div v-if="ratings.length === 0" class="empty-state">
            Belum ada rating yang diberikan.
        </div>

        <div v-else class="rating-cards">

            <div
                v-for="item in ratings"
                :key="item.id"
                class="history-card"
            >

                <div class="card-header">

                    <h3>{{ item.skill ? item.skill.name : 'Skill tidak ditemukan' }}</h3>

                    <div class="rating-stars">
                        <span
                            v-for="s in 5"
                            :key="s"
                            class="star-small"
                            :class="{ active: item.rating >= s }"
                        >
                            ★
                        </span>
                    </div>

                </div>

                <p class="comment">{{ item.comment || 'Tidak ada komentar' }}</p>

                <p class="date">📅 {{ new Date(item.created_at).toLocaleDateString() }}</p>

            </div>

        </div>

    </div>

    </div>

    <div
    class="menu-card profile-card"
    @click="router.push('/profile')"
>


    <div class="icon">
        👤
    </div>

    <h2>
        Profile
    </h2>

    <p>
        Lihat informasi akun
    </p>

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

    .hero {

    max-width: 1200px;

    margin: auto;

    margin-bottom: 40px;
    }

    .hero-content {

    background:
        linear-gradient(
        180deg,
        #16192a,
        #121521
        );

    border:
        1px solid #2a2d3a;

    border-radius: 30px;

    padding: 50px;

    position: relative;

    overflow: hidden;
    }

    .hero-content::before {

    content: '';

    position: absolute;

    top: -120px;

    right: -120px;

    width: 260px;

    height: 260px;

    border-radius: 50%;

    background:
        radial-gradient(
        rgba(79,124,255,0.18),
        transparent
        );
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

    letter-spacing: .05em;

    text-transform: uppercase;

    padding: 5px 12px;

    border-radius: 999px;

    margin-bottom: 18px;
    }

    .badge-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: #6c7dd4;
    }

    .hero h1 {

    color: #eef0f8;

    font-size: 42px;

    margin-bottom: 14px;
    }

    .hero p {

    color: #7f859f;

    line-height: 1.8;

    max-width: 620px;
    }

    .menu-grid {

    max-width: 1200px;

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(260px, 1fr));

    gap: 24px;
    }

    .menu-card {

    position: relative;

    background: #1a1d27;

    border:
        1px solid #2a2d3a;

    border-radius: 26px;

    padding: 32px;

    overflow: hidden;

    transition: .25s;

    cursor: pointer;
    }

    .menu-card:hover {

    transform:
        translateY(-6px);

    border-color: #4f7cff;
    }

    .accent-line {

    position: absolute;

    top: 0;

    left: 28px;

    right: 28px;

    height: 2px;

    border-radius:
        0 0 4px 4px;

    background:
        linear-gradient(
        90deg,
        #6c7dd4,
        #4f7cff,
        transparent
        );
    }

    .icon {

    width: 72px;

    height: 72px;

    border-radius: 22px;

    background:
        linear-gradient(
        135deg,
        #4f7cff,
        #6c7dd4
        );

    display: flex;

    justify-content: center;

    align-items: center;

    font-size: 32px;

    margin-bottom: 24px;

    box-shadow:
        0 10px 30px rgba(79,124,255,0.25);
    }

    .menu-card h2 {

    color: #eef0f8;

    font-size: 22px;

    margin-bottom: 12px;
    }

    .menu-card p {

    color: #7f859f;

    line-height: 1.7;

    margin-bottom: 24px;
    }

    .open-btn {

    width: 100%;

    padding: 14px;

    border: none;

    border-radius: 16px;

    background:
        linear-gradient(
        135deg,
        #4f7cff,
        #6c7dd4
        );

    color: white;

    font-size: 14px;

    font-weight: 600;

    cursor: pointer;

    transition: .2s;
    }

    .open-btn:hover {

    opacity: .92;
    }

    @media(max-width: 768px) {

    .page {

        padding: 24px 16px;
    }

    .hero-content {

        padding: 36px 28px;
    }

    .hero h1 {

        font-size: 32px;
    }

    }

    .rating-history {
        max-width: 1200px;
        margin: 40px auto;
        padding-bottom: 40px;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
    }

    .section-title span {
        font-size: 24px;
    }

    .section-title h2 {
        color: #eef0f8;
        font-size: 28px;
        font-weight: 700;
    }

    .empty-state {
        background: #1a1d27;
        border: 1px dashed #3a3f55;
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        color: #7f859f;
    }

    .rating-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .history-card {
        background: #1a1d27;
        border: 1px solid #2a2d3a;
        border-radius: 24px;
        padding: 24px;
        transition: .25s;
    }

    .history-card:hover {
        border-color: #4f7cff;
        transform: translateY(-4px);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }

    .card-header h3 {
        color: #eef0f8;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
    }

    .rating-stars {
        display: flex;
        gap: 4px;
    }

    .star-small {
        color: #34384c;
        font-size: 16px;
    }

    .star-small.active {
        color: #facc15;
    }

    .comment {
        color: #7f859f;
        line-height: 1.6;
        font-size: 14px;
        margin-bottom: 16px;
        font-style: italic;
    }

    .date {
        color: #4b526d;
        font-size: 12px;
        font-weight: 500;
    }

    .profile-card {
        max-width: 1200px;
        margin: 0 auto 40px;
    }
    </style>