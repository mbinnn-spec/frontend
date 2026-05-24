    <script setup>
    import { ref } from 'vue'
    import api from '../services/api'

    const requesterName = ref('')
    const sessionDate = ref('')
    const duration = ref('')
    const notes = ref('')

    const submitBarter = async () => {

    try {

        await api.post('/barter-requests', {

        requester_name: requesterName.value,

        session_date: sessionDate.value,

        duration: duration.value,

        notes: notes.value,

        status: 'pending'

        })

        alert('Pengajuan barter berhasil 😎')

        requesterName.value = ''
        sessionDate.value = ''
        duration.value = ''
        notes.value = ''

    } catch (error) {

        console.log(error.response)

        alert('Gagal mengirim barter')

    }

    }
    </script>

    <template>

    <div class="page">

    <div class="card">

        <div class="card-hero">

        <div class="accent-line" />

        <div class="badge">

            <span class="badge-dot" />

            Skill Barter

        </div>

        <h1>
            Aju Barter Skill
        </h1>

        <p>
            Isi data sesi barter skill
            yang ingin kamu ajukan.
        </p>

        </div>

        <div class="form-area">

        <div class="input-group">

            <label>
            Nama Pengaju
            </label>

            <input
            v-model="requesterName"
            type="text"
            placeholder="Masukkan nama"
            >

        </div>

        <div class="input-group">

            <label>
            Tanggal Sesi
            </label>

            <input
            v-model="sessionDate"
            type="date"
            >

        </div>

        <div class="input-group">

            <label>
            Durasi Belajar
            </label>

            <input
            v-model="duration"
            type="text"
            placeholder="Contoh: 2 Jam"
            >

        </div>

        <div class="input-group">

            <label>
            Catatan
            </label>

            <textarea
            v-model="notes"
            placeholder="Tulis catatan barter..."
            />

        </div>

        <button
            class="submit-btn"
            @click="submitBarter"
        >
            Kirim Pengajuan
        </button>

        </div>

    </div>

    </div>

    </template>

    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    .page {

    min-height: 100vh;

    background: #0f1117;

    display: flex;

    justify-content: center;

    align-items: center;

    padding: 24px;

    font-family:
        'Plus Jakarta Sans',
        sans-serif;
    }

    .card {

    width: 100%;

    max-width: 620px;

    background: #1a1d27;

    border:
        1px solid #2a2d3a;

    border-radius: 28px;

    overflow: hidden;
    }

    .card-hero {

    position: relative;

    padding: 34px;

    background: #16192a;

    border-bottom:
        1px solid #2a2d3a;
    }

    .accent-line {

    position: absolute;

    top: 0;

    left: 34px;

    right: 34px;

    height: 2px;

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

    background: #252a3d;

    border:
        1px solid #3a3f55;

    color: #8b95c9;

    font-size: 11px;

    font-weight: 600;

    padding: 5px 12px;

    border-radius: 999px;

    text-transform: uppercase;

    margin-bottom: 16px;
    }

    .badge-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: #6c7dd4;
    }

    .card-hero h1 {

    color: #eef0f8;

    font-size: 32px;

    margin-bottom: 12px;
    }

    .card-hero p {

    color: #7f859f;

    line-height: 1.7;
    }

    .form-area {

    padding: 34px;
    }

    .input-group {

    margin-bottom: 24px;
    }

    .input-group label {

    display: block;

    color: #c8d0f0;

    font-size: 14px;

    margin-bottom: 10px;
    }

    .input-group input,
    .input-group textarea {

    width: 100%;

    padding: 16px;

    border-radius: 16px;

    border:
        1px solid #2a2d3a;

    background: #16192a;

    color: white;

    outline: none;

    font-size: 14px;

    transition: .2s;
    }

    .input-group textarea {

    min-height: 120px;

    resize: none;
    }

    .input-group input:focus,
    .input-group textarea:focus {

    border-color: #4f7cff;

    box-shadow:
        0 0 0 4px rgba(79,124,255,0.1);
    }

    .submit-btn {

    width: 100%;

    padding: 16px;

    border: none;

    border-radius: 16px;

    background:
        linear-gradient(
        135deg,
        #4f7cff,
        #6c7dd4
        );

    color: white;

    font-size: 15px;

    font-weight: 600;

    cursor: pointer;

    transition: .2s;
    }

    .submit-btn:hover {

    opacity: .92;

    transform:
        translateY(-2px);
    }
    </style>