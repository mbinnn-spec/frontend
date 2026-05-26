<script setup>
import {
    ref,
    onMounted
} from 'vue'

import api from '../services/api'

const messages = ref([])

const newMessage = ref('')

const chatId = 1

const getMessages = async () => {

    try {

        const response = await api.get(
            `/messages/${chatId}`
        )

        messages.value = response.data.data

    } catch (error) {

        console.log(error)
    }
}

const sendMessage = async () => {

    if (!newMessage.value) return

    try {

        await api.post('/messages', {

            chat_id: chatId,

            sender_id: 1,

            message: newMessage.value
        })

        newMessage.value = ''

        getMessages()

    } catch (error) {

        console.log(error)
    }
}

onMounted(() => {

    getMessages()
})
</script>

<template>

<div class="container">

    <div class="chat-box">

        <div class="chat-header">

            <h2>💬 Chat</h2>

        </div>

        <div class="messages">

            <div
                v-for="msg in messages"
                :key="msg.id"
                class="message"
            >

                <div class="bubble">

                    {{ msg.message }}

                </div>

            </div>

        </div>

        <div class="input-area">

            <input
                v-model="newMessage"
                type="text"
                placeholder="Ketik pesan..."
                class="chat-input"
                @keyup.enter="sendMessage"
            >

            <button
                @click="sendMessage"
                class="send-btn"
            >
                Kirim
            </button>

        </div>

    </div>

</div>

</template>

<style scoped>

.container {

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

    padding: 20px;
}

.chat-box {

    width: 100%;

    max-width: 700px;

    height: 85vh;

    background: #1a1d27;

    border-radius: 25px;

    overflow: hidden;

    border: 1px solid #2a2d3a;

    display: flex;

    flex-direction: column;
}

.chat-header {

    padding: 20px;

    border-bottom: 1px solid #2a2d3a;

    color: white;
}

.messages {

    flex: 1;

    padding: 20px;

    overflow-y: auto;

    display: flex;

    flex-direction: column;

    gap: 15px;
}

.message {

    display: flex;
}

.bubble {

    max-width: 70%;

    background: #4f7cff;

    color: white;

    padding: 14px 18px;

    border-radius: 18px;

    line-height: 1.5;
}

.input-area {

    display: flex;

    gap: 10px;

    padding: 20px;

    border-top: 1px solid #2a2d3a;
}

.chat-input {

    flex: 1;

    padding: 15px;

    border: none;

    border-radius: 15px;

    background: #252a3d;

    color: white;

    outline: none;
}

.send-btn {

    padding: 15px 25px;

    border: none;

    border-radius: 15px;

    background: #4f7cff;

    color: white;

    cursor: pointer;
}

.send-btn:hover {

    background: #3a67f0;
}

</style>