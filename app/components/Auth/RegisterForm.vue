<script setup lang="ts">
import { ref, reactive } from "vue";

import { useAuthStore } from "@/stores/auth";

import EyeIcon from "@/components/svgs/EyeIcon.vue";
import EyeIconSlash from "@/components/svgs/EyeIconSlash.vue";

const auth = useAuthStore();

const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const isPasswordHidden = ref(true);

const inputClass =
  "w-full px-4 py-2.5 text-base border rounded-md border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-60";

function togglePassword() {
  isPasswordHidden.value = !isPasswordHidden.value;
}

async function onSubmitRegisterInfo() {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    if (!registerForm.username.trim()) throw new Error("Username is required.");
    if (registerForm.username.length < 3)
      throw new Error("Username must be at least 3 characters.");
    if (!registerForm.email.trim()) throw new Error("Email is required.");
    if (registerForm.email.length < 6)
      throw new Error("Email must be at least 6 characters.");
    if (!registerForm.password.trim()) throw new Error("Password is required.");
    if (registerForm.password.length < 6)
      throw new Error("Password must be at least 6 characters.");
    if (!/\d/.test(registerForm.password)) {
      throw new Error("Password must contain at least one number.");
    }
    if (!/[^a-zA-Z0-9]/.test(registerForm.password)) {
      throw new Error(
        "Password must contain at least one special character (!@#$%^&*)."
      );
    }
    if (!registerForm.confirmPassword.trim())
      throw new Error("Confirmed password is required.");
    if (registerForm.password !== registerForm.confirmPassword)
      throw new Error("Passwords don't match.");

    await auth.register({
      email: registerForm.email.toLowerCase().trim(),
      username: registerForm.username.trim(),
      password: registerForm.password.trim(),
    });
  } catch (err: any) {
    errorMessage.value = err.message || "Attempt to register failed.";
  } finally {
    isLoading.value = false;
  }
}

async function onGuestLogin() {
  try {
    isLoading.value = true;
    errorMessage.value = "";
    await auth.guestLogin();
  } catch (err: any) {
    errorMessage.value =
      err.data || err.message || err.statusMessage || "Guest login failed.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="space-y-6">
    <form
      class="p-6 space-y-5 bg-white border rounded-lg border-stone-200 sm:p-8"
      @submit.prevent="onSubmitRegisterInfo"
    >
      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-700" for="username">
          Username
        </label>
        <input
          id="username"
          v-model="registerForm.username"
          :disabled="isLoading"
          name="username"
          type="text"
          required
          :class="inputClass"
          placeholder="IronFist28"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-700" for="email">
          Email
        </label>
        <input
          id="email"
          v-model="registerForm.email"
          :disabled="isLoading"
          name="email"
          type="email"
          required
          :class="inputClass"
          placeholder="email@example.com"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-stone-700" for="password">
          Password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="registerForm.password"
            :disabled="isLoading"
            name="password"
            :type="isPasswordHidden ? 'password' : 'text'"
            required
            :class="inputClass"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="absolute p-1 text-stone-500 right-3 top-1/2 -translate-y-1/2 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            :aria-label="isPasswordHidden ? 'Show password' : 'Hide password'"
            @click="togglePassword"
          >
            <EyeIcon v-if="isPasswordHidden" />
            <EyeIconSlash v-else />
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label
          class="text-sm font-medium text-stone-700"
          for="confirmPassword"
        >
          Confirm password
        </label>
        <div class="relative">
          <input
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            :disabled="isLoading"
            name="confirmPassword"
            :type="isPasswordHidden ? 'password' : 'text'"
            required
            :class="inputClass"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="absolute p-1 text-stone-500 right-3 top-1/2 -translate-y-1/2 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            :aria-label="isPasswordHidden ? 'Show password' : 'Hide password'"
            @click="togglePassword"
          >
            <EyeIcon v-if="isPasswordHidden" />
            <EyeIconSlash v-else />
          </button>
        </div>
      </div>

      <div
        v-if="errorMessage"
        class="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <button
        :disabled="isLoading"
        type="submit"
        class="w-full px-5 py-2.5 text-sm font-medium text-white transition-colors rounded-md bg-brand-600 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {{ isLoading ? "Creating account..." : "Create account" }}
      </button>

      <p class="text-sm text-center text-stone-600">
        Already have an account?
        <NuxtLink
          to="/login"
          class="font-medium text-brand-600 hover:text-brand-700"
        >
          Sign in
        </NuxtLink>
      </p>
    </form>

    <div class="p-6 space-y-4 bg-white border rounded-lg border-stone-200 sm:p-8">
      <h2 class="text-base font-semibold text-stone-900">
        Continue as a guest
      </h2>
      <p class="text-sm text-stone-600">
        Browse recipes without an account. Some features require signing in.
      </p>
      <button
        type="button"
        :disabled="isLoading"
        class="w-full px-5 py-2.5 text-sm font-medium transition-colors rounded-md border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        @click="onGuestLogin"
      >
        {{ isLoading ? "Logging in..." : "Continue as guest" }}
      </button>
    </div>
  </div>
</template>
