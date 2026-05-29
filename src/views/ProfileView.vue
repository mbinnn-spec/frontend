    <script setup>
    import {
        ref,
        onMounted
    } from 'vue'

    import {
        useRouter
    } from 'vue-router'

    const router = useRouter()

    const user = ref({

        name: '',

        email: '',

        role: ''
    })

    onMounted(() => {

        const data = JSON.parse(
            localStorage.getItem('user')
        )

        console.log(data)

        if (data) {

            if (data.user) {

                user.value = data.user

            } else {

                user.value = data
            }
        }
    })

    const logout = () => {

        localStorage.removeItem('user')

        router.push('/')
    }
    </script>

    <template>

    <div class="page">

        <div class="profile-card">

            <button
                class="back-btn"
                @click="$router.back()"
            >
                ← Back
            </button>

            <div class="avatar">

                👤

            </div>

            <h1>

                {{ user.name }}

            </h1>

            <p class="email">

                {{ user.email }}

            </p>

            <div class="role-badge">

                {{ user.role }}

            </div>

            <div class="info-box">

                <div class="info-item">

                    <span>
                        📛 Nama
                    </span>

                    <p>
                        {{ user.name }}
                    </p>

                </div>

                <div class="info-item">

                    <span>
                        ✉️ Email
                    </span>

                    <p>
                        {{ user.email }}
                    </p>

                </div>
<!-- 
                <div class="info-item">

                    <span>
                        🛡 Role
                    </span>

                    <p>
                        {{ user.role }}
                    </p>

                </div> -->

            </div>

            <button
                class="logout-btn"
                @click="logout"
            >
                ⏻ Logout
            </button>

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

        display: flex;

        justify-content: center;

        align-items: center;

        padding: 24px;

        font-family:
            'Plus Jakarta Sans',
            sans-serif;
    }

    .profile-card {

        width: 100%;

        max-width: 520px;

        background:
            rgba(26,29,39,0.94);

        border:
            1px solid rgba(255,255,255,0.06);

        border-radius: 32px;

        padding: 34px;

        backdrop-filter: blur(16px);

        box-shadow:
            0 20px 40px rgba(0,0,0,0.35);

        text-align: center;

        position: relative;
    }

    .back-btn {

        position: absolute;

        left: 24px;

        top: 24px;

        border: none;

        padding: 12px 18px;

        border-radius: 14px;

        background: #252a3d;

        color: white;

        cursor: pointer;

        transition: .2s;

        font-weight: 600;
    }

    .back-btn:hover {

        background: #303650;

        transform:
            translateY(-2px);
    }

    .avatar {

        width: 120px;

        height: 120px;

        margin: auto;

        border-radius: 50%;

        background:
            linear-gradient(
                135deg,
                #4f7cff,
                #6f8cff
            );

        display: flex;

        justify-content: center;

        align-items: center;

        font-size: 52px;

        margin-bottom: 24px;

        margin-top: 24px;

        box-shadow:
            0 14px 28px rgba(79,124,255,0.3);
    }

    h1 {

        color: white;

        font-size: 32px;

        margin-bottom: 10px;

        font-weight: 700;
    }

    .email {

        color: #8a90ac;

        margin-bottom: 18px;

        font-size: 15px;
    }

    .role-badge {

        display: inline-block;

        padding: 10px 18px;

        border-radius: 999px;

        background:
            rgba(79,124,255,0.15);

        color: #8fa8ff;

        font-size: 13px;

        font-weight: 600;

        margin-bottom: 28px;

        text-transform: capitalize;

        border:
            1px solid rgba(79,124,255,0.25);
    }

    .info-box {

        display: flex;

        flex-direction: column;

        gap: 18px;

        margin-bottom: 30px;
    }

    .info-item {

        background: #252a3d;

        border:
            1px solid #303650;

        border-radius: 18px;

        padding: 18px;

        text-align: left;

        transition: .2s;
    }

    .info-item:hover {

        border-color: #4f7cff;

        transform:
            translateY(-2px);
    }

    .info-item span {

        color: #8a90ac;

        font-size: 13px;
    }

    .info-item p {

        color: white;

        margin-top: 8px;

        font-size: 15px;

        font-weight: 600;
    }

    .logout-btn {

        width: 100%;

        border: none;

        padding: 16px;

        border-radius: 16px;

        background:
            linear-gradient(
                135deg,
                #ef4444,
                #dc2626
            );

        color: white;

        font-size: 15px;

        font-weight: 700;

        cursor: pointer;

        transition: .25s;
    }

    .logout-btn:hover {

        transform:
            translateY(-3px);

        box-shadow:
            0 14px 24px rgba(239,68,68,0.25);
    }

    @media(max-width: 768px) {

        .profile-card {

            padding: 28px 20px;
        }

        h1 {

            font-size: 26px;
        }

        .avatar {

            width: 100px;

            height: 100px;

            font-size: 44px;
        }

        .back-btn {

            position: static;

            margin-bottom: 24px;
        }

    }

    </style>