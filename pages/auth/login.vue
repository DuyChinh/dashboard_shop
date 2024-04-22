<template>
<div class="login-block mt-10">
    <h1 class="text-center my-6" max-width="228">Login</h1>

    <v-card class="mx-auto pa-12 pb-8 w-sm-70" elevation="8" max-width="448" rounded="lg">
        <v-form v-model="form" @submit.prevent="onSubmit">
            <div class="text-subtitle-1">Email</div>
            <v-text-field 
                :rules="[required]" 
                v-model="email"
                density="compact" 
                placeholder="Email..." 
                prepend-inner-icon="mdi-email-outline" 
                variant="outlined"
                clearable
                class="mb-2"
            >
            </v-text-field>

            <div class="text-subtitle-1 d-flex align-center justify-space-between">
                Password

                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                    Forgot login password?</a>
            </div>

            <v-text-field 
                :rules="[required]"
                v-model="password"
                class="mb-2"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'" density="compact" placeholder="Password..." prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

            <v-btn type="submit" class="mb-8 text-capitalize" color="blue" size="large"  block>
                Login
            </v-btn>
        </v-form>
        <v-card-text class="text-center">
            <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
        </v-card-text>
    </v-card>
</div>
</template>
  
<script setup>
import {
    ref
} from "vue"
const visible = ref(false)
const loading = ref(false)
const form = ref(false)
const email = ref("doanchinhit21@gmail.com")
const password =ref("210203")
const onSubmit = () => {
    if(email.value === "doanchinhit21@gmail.com" && password.value === "210203") {
        localStorage.setItem("email", email.value);
        return navigateTo("/dashboard")
    }
    return navigateTo("/auth/login")

}
const required = (v) => {
    return !!v || 'Field is required'
}
</script>

<style>
    .login-block {
        /* margin-top: 10%; */
    }
</style>
