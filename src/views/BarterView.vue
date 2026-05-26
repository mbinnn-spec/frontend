    <script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    import api from '../services/api'

    const router = useRouter()

    const session_date = ref('')
    const duration = ref('')
    const notes = ref('')

    const submitBarter = async () => {

        try {

            const response = await api.post('/barter', {

                skill_id: 1,

                requester_name: 'Bintang',

                session_date: session_date.value,

                duration: duration.value,

                notes: notes.value
            })

            console.log(response.data)

            alert('Ajuan barter berhasil')

            router.push('/jadwal')

        } catch (error) {

            console.log(error)

            alert('Gagal mengajukan barter')
        }
    }
    </script>

    <template>

    <div class="page">

        <div class="barter-card">

            <button
                class="back-btn"
                @click="$router.back()"
            >
                ← Back
            </button>

            <div class="top-section">

                <div class="badge">

                    🤝 Skill Exchange

                </div>

                <h1>

                    Aju Barter Skill

                </h1>

                <p>

                    Tentukan jadwal belajar dan kirim pengajuan barter skill.

                </p>

            </div>

            <div class="form-group">

                <label>

                    Tanggal Sesi

                </label>

                <input
                    v-model="session_date"
                    type="date"
                    class="input"
                >

            </div>

            <div class="form-group">

                <label>

                    Durasi Belajar

                </label>

                <input
                    v-model="duration"
                    type="number"
                    placeholder="Contoh: 60 menit"
                    class="input"
                >

            </div>

            <div class="form-group">

                <label>

                    Catatan

                </label>

                <textarea
                    v-model="notes"
                    placeholder="Tambahkan catatan barter..."
                    class="textarea"
                ></textarea>

            </div>

            <button
                @click="submitBarter"
                class="submit-btn"
            >
                Kirim Ajuan
            </button>

        </div>

    </div>

    </template>

    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    .page {

        min-height: 100vh;

        background:
            linear-gradient(
                135deg,
                #0f1117,
                #16192a
            );

        display: flex;

        justify-content: center;

        align-items: center;

        padding: 30px;

        font-family:
            'Plus Jakarta Sans',
            sans-serif;
    }

    .barter-card {

        width: 100%;

        max-width: 560px;

        background: #1a1d27;

        border:
            1px solid #2a2d3a;

        border-radius: 28px;

        padding: 32px;
    }

    .back-btn {

        width: fit-content;

        padding: 12px 18px;

        border: none;

        border-radius: 14px;

        background: #252a3d;

        color: white;

        cursor: pointer;

        margin-bottom: 28px;

        transition: .2s;
    }

    .back-btn:hover {

        background: #31364d;
    }

    .top-section {

        margin-bottom: 30px;
    }

    .badge {

        width: fit-content;

        padding: 6px 14px;

        background: #252a3d;

        border:
            1px solid #3a3f55;

        border-radius: 999px;

        color: #9aa4d6;

        font-size: 12px;

        font-weight: 600;

        margin-bottom: 18px;
    }

    .top-section h1 {

        color: #eef0f8;

        font-size: 30px;

        margin-bottom: 10px;
    }

    .top-section p {

        color: #7f859f;

        line-height: 1.7;

        font-size: 14px;
    }

    .form-group {

        margin-bottom: 22px;
    }

    label {

        display: block;

        color: #d3d8ef;

        font-size: 14px;

        margin-bottom: 10px;

        font-weight: 600;
    }

    .input,
    .textarea {

        width: 100%;

        padding: 16px 18px;

        border: none;

        border-radius: 16px;

        background: #252a3d;

        color: white;

        outline: none;

        border:
            1px solid transparent;

        transition: .2s;

        font-size: 14px;
    }

    .input:focus,
    .textarea:focus {

        border-color: #4f7cff;
    }

    .textarea {

        min-height: 130px;

        resize: none;
    }

    .submit-btn {

        width: 100%;

        padding: 16px;

        border: none;

        border-radius: 16px;

        background: #4f7cff;

        color: white;

        font-size: 15px;

        font-weight: 600;

        cursor: pointer;

        transition: .2s;
    }

    .submit-btn:hover {

        background: #3a67f0;
    }

    @media(max-width: 768px) {

        .page {

            padding: 18px;
        }

        .barter-card {

            padding: 24px;
        }

        .top-section h1 {

            font-size: 24px;
        }

    }
    </style>