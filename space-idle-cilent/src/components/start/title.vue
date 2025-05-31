<template>
    <div class="title-container">
        <el-card shadow="hover" class="title-card">
            <h1 class="game-title">Space Idle</h1>
            <p class="game-desc">一款太空题材的放置类游戏</p>
            <p class="game-info">版本:v1.0.0</p>
            <el-button type="primary" @click="goLogin">登录</el-button>
            <el-button type="primary" @click="goRegister">注册</el-button>
            <el-button type="primary" @click="goForget">忘记密码</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goLogin = () => {
    router.push('/login')
}
const goRegister = () => {
    router.push('/register')
}
const goForget = () => {
    router.push('/forget')
}
</script>

<style scoped>
.title-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.title-card {
    padding: 40px 48px;
    border-radius: 16px;
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
}

.game-title {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #409EFF;
    letter-spacing: 2px;
}

.game-desc {
    font-size: 1.2rem;
    margin-bottom: 12px;
    color: #666;
}

.game-info {
    font-size: 1rem;
    color: #999;
}
</style>