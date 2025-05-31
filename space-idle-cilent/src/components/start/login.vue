<template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="login-form">
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onLogin" :loading="loading">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
const formRef = ref()
const form = ref({
    email: '',
    password: ''
})
const rules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}
const loading = ref(false)
const $socket = (window as any).$socket || (getCurrentInstance()?.appContext.config.globalProperties.$socket)
const onLogin = () => {
    formRef.value.validate((valid: boolean) => {
        if (!valid) return
        loading.value = true
        $socket.emit('login', { username: form.value.email, password: form.value.password }, (res: any) => {
            loading.value = false
            if (res.code === 0) {
                ElMessage.success('登录成功')
                // 登录成功后的逻辑，如跳转页面
            } else {
                ElMessage.error(res.message || '登录失败')
            }
        })
    })
}
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 80px auto;
    padding: 32px 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
