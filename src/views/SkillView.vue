    <script setup>
    import {
    ref,
    onMounted,
    computed
    } from 'vue'

    import api from '../services/api'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const skills = ref([])
    const search = ref('')

    const getSkills = async () => {

    try {

        const response = await api.get('/skills')

        skills.value = response.data

    } catch (error) {

        console.log(error)

    }
    }

    onMounted(() => {

    getSkills()

    })

    const filteredSkills = computed(() => {

    return skills.value.filter(skill =>

        skill.name
        .toLowerCase()
        .includes(
            search.value.toLowerCase()
        )
    )

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

        <h1>
        Skill Exchange
        </h1>

        <div class="search-box">

        <input
            v-model="search"
            type="text"
            placeholder="Cari skill..."
        >

        </div>

    </div>

    <div class="skill-grid">

        <div
        class="card"
        v-for="skill in filteredSkills"
        :key="skill.id"
        >

        <div class="card-hero">

            <div class="accent-line" />

            <div class="badge">

            <span class="badge-dot" />

            {{ skill.category || 'Skill' }}

            </div>

            <h2 class="title">

            {{ skill.name }}

            </h2>

            <p class="desc">

            {{ skill.description }}

            </p>

        </div>

        <div class="card-actions">

            <button
            class="btn-detail"
            @click="router.push(`/skills/${skill.id}`)"
            >
            Lihat Detail
            </button>

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

    flex-direction: column;

    gap: 18px;
    }

    .back-btn {

    width: fit-content;

    padding: 12px 18px;

    border: none;

    border-radius: 14px;

    background: #1a1d27;

    color: white;

    border: 1px solid #2a2d3a;

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

    font-weight: 700;

    margin-bottom: 5px;
    }

    .search-box input {

    width: 100%;

    padding: 16px 18px;

    border-radius: 16px;

    border:
        1px solid #2a2d3a;

    background: #1a1d27;

    color: white;

    outline: none;

    font-size: 14px;

    transition: .2s;
    }

    .search-box input:focus {

    border-color: #4f7cff;
    }

    .search-box input::placeholder {

    color: #6d738d;
    }

    .skill-grid {

    max-width: 1200px;

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(340px, 1fr));

    gap: 24px;
    }

    .card {

    background: #1a1d27;

    border:
        1px solid #2a2d3a;

    border-radius: 24px;

    overflow: hidden;

    transition: 0.25s;
    }

    .card:hover {

    transform:
        translateY(-5px);

    border-color: #4f7cff;
    }

    .card-hero {

    position: relative;

    padding: 28px;

    background: #16192a;
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

    .badge {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 5px 12px;

    background: #252a3d;

    border:
        1px solid #3a3f55;

    border-radius: 999px;

    color: #9aa4d6;

    font-size: 11px;

    font-weight: 600;

    letter-spacing: .05em;

    text-transform: uppercase;

    margin-bottom: 16px;
    }

    .badge-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: #6c7dd4;
    }

    .title {

    color: #eef0f8;

    font-size: 24px;

    line-height: 1.3;

    margin-bottom: 12px;
    }

    .desc {

    color: #7f859f;

    font-size: 14px;

    line-height: 1.7;

    display: -webkit-box;

    -webkit-line-clamp: 3;

    -webkit-box-orient: vertical;

    overflow: hidden;
    }

    .card-actions {

    padding: 22px 28px;
    }

    .btn-detail {

    width: 100%;

    border: none;

    border-radius: 14px;

    padding: 14px;

    background: #4f7cff;

    color: white;

    font-size: 14px;

    font-weight: 600;

    cursor: pointer;

    transition: .2s;
    }

    .btn-detail:hover {

    opacity: .9;
    }

    @media(max-width: 768px) {

    .page {

        padding: 24px 16px;
    }

    .header h1 {

        font-size: 26px;
    }

    }
    </style>