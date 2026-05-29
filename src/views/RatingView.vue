<script setup>
import { ref } from 'vue'

const rating = ref(0)

const comment = ref('')

const submitRating = () => {

    if (rating.value === 0) {

        alert('Pilih rating dulu')

        return
    }

    alert(
        `Rating ${rating.value} bintang berhasil dikirim`
    )

    rating.value = 0

    comment.value = ''
}
</script>

<template>

<div class="page">

    <div class="rating-card">

        <div class="top-glow"></div>

        <div class="badge">

            ⭐ Rating Skill

        </div>

        <h1>
            Beri Rating
        </h1>

        <p class="subtitle">
            Bagikan pengalaman belajar dan barter skill kamu ✨
        </p>

        <div class="stars">

            <span
                v-for="star in 5"
                :key="star"
                @click="rating = star"
                :class="[
                    'star',
                    rating >= star
                        ? 'active'
                        : ''
                ]"
            >

                ★

            </span>

        </div>

        <textarea
            v-model="comment"
            placeholder="Tulis komentar kamu disini..."
        />

        <button
            class="submit-btn"
            @click="submitRating"
        >

            Kirim Rating

        </button>

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

    display: flex;

    justify-content: center;

    align-items: center;

    padding: 24px;

    font-family:
        'Plus Jakarta Sans',
        sans-serif;

    overflow: hidden;
}

.rating-card {

    width: 100%;

    max-width: 560px;

    background:
        rgba(26,29,39,0.95);

    border:
        1px solid rgba(255,255,255,0.06);

    border-radius: 34px;

    padding: 42px;

    position: relative;

    overflow: hidden;

    backdrop-filter: blur(18px);

    box-shadow:
        0 20px 50px rgba(0,0,0,0.45);

    animation:
        fadeUp .5s ease;
}

.top-glow {

    position: absolute;

    width: 240px;

    height: 240px;

    background:
        rgba(79,124,255,0.15);

    border-radius: 50%;

    top: -120px;

    right: -120px;

    filter: blur(10px);
}

.badge {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding: 10px 18px;

    border-radius: 999px;

    background:
        rgba(79,124,255,0.12);

    border:
        1px solid rgba(79,124,255,0.18);

    color: #8fa8ff;

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 24px;
}

h1 {

    color: white;

    font-size: 40px;

    margin-bottom: 12px;

    font-weight: 700;
}

.subtitle {

    color: #8a90ac;

    line-height: 1.7;

    margin-bottom: 34px;

    font-size: 15px;
}

.stars {

    display: flex;

    justify-content: center;

    gap: 14px;

    margin-bottom: 34px;
}

.star {

    font-size: 58px;

    color: #34384c;

    cursor: pointer;

    transition: .22s;
}

.star:hover {

    transform:
        scale(1.18)
        rotate(-6deg);
}

.star.active {

    color: #facc15;

    text-shadow:
        0 0 18px rgba(250,204,21,0.45);
}

textarea {

    width: 100%;

    height: 150px;

    background: #23283a;

    border:
        1px solid #303650;

    border-radius: 22px;

    padding: 20px;

    color: white;

    resize: none;

    outline: none;

    margin-bottom: 26px;

    font-size: 14px;

    transition: .2s;
}

textarea:focus {

    border-color: #4f7cff;

    box-shadow:
        0 0 0 4px rgba(79,124,255,0.08);
}

textarea::placeholder {

    color: #737995;
}

.submit-btn {

    width: 100%;

    border: none;

    padding: 18px;

    border-radius: 20px;

    background:
        linear-gradient(
            135deg,
            #4f7cff,
            #6f8cff
        );

    color: white;

    font-size: 15px;

    font-weight: 700;

    cursor: pointer;

    transition: .25s;
}

.submit-btn:hover {

    transform:
        translateY(-3px);

    box-shadow:
        0 16px 28px rgba(79,124,255,0.28);
}

.submit-btn:active {

    transform:
        scale(0.98);
}

@keyframes fadeUp {

    from {

        opacity: 0;

        transform:
            translateY(20px);
    }

    to {

        opacity: 1;

        transform:
            translateY(0);
    }
}

@media(max-width: 768px) {

    .rating-card {

        padding: 30px 22px;
    }

    h1 {

        font-size: 32px;
    }

    .star {

        font-size: 48px;
    }

    textarea {

        height: 130px;
    }
}

</style>