<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {

  try {

    const response = await api.post('/login', {

      email: email.value,

      password: password.value
    })

    const user = response.data.user

    localStorage.setItem(

      'user',

      JSON.stringify(user)
    )

    alert('Login berhasil')

    if (user.role === 'guru') {

      router.push('/dashboard-guru')

    } else {

      router.push('/dashboard-murid')
    }

  } catch (error) {

    console.log(error)

    alert('Login gagal')
  }
}
</script>

<template>

<div class="page">

  <div class="login-card">

    <div class="left-panel">

      <div class="accent-line" />

      <div class="logo-box">

        ⚡

      </div>

      <h1>
        SkillSwap
      </h1>

      <p>
        Tukar skill, belajar bareng,
        dan bangun relasi dengan
        komunitas kreatif.
      </p>

    </div>

    <div class="right-panel">

      <div class="form-box">

        <div class="badge">

          <span class="badge-dot" />

          Welcome Back

        </div>

        <h2>
          Login Account
        </h2>

        <p class="subtitle">
          Masukkan email dan password
          untuk melanjutkan.
        </p>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input"
        >

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input"
        >

        <button
          @click="login"
          class="login-btn"
        >
          Login
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

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 24px;

  font-family:
    'Plus Jakarta Sans',
    sans-serif;
}

.login-card {

  width: 100%;

  max-width: 1000px;

  background: #1a1d27;

  border:
    1px solid #2a2d3a;

  border-radius: 32px;

  overflow: hidden;

  display: flex;

  box-shadow:
    0 20px 50px rgba(0,0,0,0.35);
}

.left-panel {

  flex: 1;

  position: relative;

  background:
    linear-gradient(
      180deg,
      #16192a,
      #121521
    );

  padding: 60px;

  display: flex;

  flex-direction: column;

  justify-content: center;
}

.accent-line {

  position: absolute;

  top: 0;

  left: 60px;

  right: 60px;

  height: 2px;

  background:
    linear-gradient(
      90deg,
      #6c7dd4,
      #4f7cff,
      transparent
    );
}

.logo-box {

  width: 80px;

  height: 80px;

  border-radius: 24px;

  background:
    linear-gradient(
      135deg,
      #4f7cff,
      #6c7dd4
    );

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 38px;

  margin-bottom: 24px;

  box-shadow:
    0 10px 30px rgba(79,124,255,0.35);
}

.left-panel h1 {

  color: #eef0f8;

  font-size: 42px;

  margin-bottom: 16px;
}

.left-panel p {

  color: #7f859f;

  line-height: 1.8;

  max-width: 360px;
}

.right-panel {

  flex: 1;

  background: #1a1d27;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 50px;
}

.form-box {

  width: 100%;

  max-width: 360px;
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

.form-box h2 {

  color: #eef0f8;

  font-size: 32px;

  margin-bottom: 10px;
}

.subtitle {

  color: #7f859f;

  font-size: 14px;

  margin-bottom: 28px;

  line-height: 1.7;
}

.input {

  width: 100%;

  padding: 16px;

  margin-bottom: 18px;

  border-radius: 16px;

  border:
    1px solid #2a2d3a;

  background: #16192a;

  color: white;

  outline: none;

  font-size: 14px;

  transition: .2s;
}

.input:focus {

  border-color: #4f7cff;

  box-shadow:
    0 0 0 4px rgba(79,124,255,0.1);
}

.input::placeholder {

  color: #6d738d;
}

.login-btn {

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

.login-btn:hover {

  transform:
    translateY(-2px);

  opacity: .92;
}

@media(max-width: 900px) {

  .login-card {

    flex-direction: column;
  }

  .left-panel {

    padding: 40px;
  }

  .right-panel {

    padding: 40px 24px;
  }

  .left-panel h1 {

    font-size: 34px;
  }

}
</style>