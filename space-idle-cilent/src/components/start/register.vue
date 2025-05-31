<template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="register-form">
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
            <el-button size="small" @click="onSendCode" :disabled="codeSent" style="margin-left:8px;">{{ codeSent ?
                countdown + 's' : '发送验证码' }}</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" placeholder="请输入验证码" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onRegister" :loading="loading">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
const formRef = ref()
const form = ref({
    email: '',
    code: '',
    username: '',
    password: '',
    confirmPassword: ''
})
const rules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (_rule: any, value: string, callback: any) => {
                if (value !== form.value.password) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            }, trigger: 'blur'
        }
    ]
}
const loading = ref(false)
const codeSent = ref(false)
const countdown = ref(60)
let timer: any = null
const $socket = (window as any).$socket || (getCurrentInstance()?.appContext.config.globalProperties.$socket)
const onSendCode = () => {
    if (!form.value.email) {
        ElMessage.warning('请先输入邮箱')
        return
    }
    $socket.emit('sendResetEmail', { email: form.value.email }, (res: any) => {
        if (res.code === 0) {
            ElMessage.success('验证码已发送（模拟）')
            codeSent.value = true
            countdown.value = 60
            timer = setInterval(() => {
                countdown.value--
                if (countdown.value <= 0) {
                    codeSent.value = false
                    clearInterval(timer)
                }
            }, 1000)
        } else {
            ElMessage.error(res.message || '发送失败')
        }
    })
}
const onRegister = () => {
    formRef.value.validate((valid: boolean) => {
        if (!valid) return
        if (form.value.password !== form.value.confirmPassword) {
            ElMessage.error('两次输入的密码不一致')
            return
        }
        loading.value = true
        $socket.emit('register', { username: form.value.username, email: form.value.email, password: form.value.password }, (res: any) => {
            loading.value = false
            if (res.code === 0) {
                ElMessage.success('注册成功')
                // 注册成功后的逻辑
            } else {
                ElMessage.error(res.message || '注册失败')
            }
        })
    })
}
</script>

<style scoped>
.register-form {
    max-width: 400px;
    margin: 80px auto;
    padding: 32px 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
