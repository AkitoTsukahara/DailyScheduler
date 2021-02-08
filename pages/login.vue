<template>
    <section>
        <div class="bg-gray-100 flex-auto p-10 w-full">
            <div class="flex justify-center">
                <div class="w-2/5 border bg-white">
                    <!-- <div class="my-12 text-center">
                        <p class="text-xl font-bold">メールアドレスでログイン</p>
                        <p class="my-4">
                            <span class="font-semibold">メールアドレス</span>と<span class="font-semibold">パスワード</span>を入力してください。
                        </p>
                        <form ref="login_form" v-model="login_valid" lazy-validation>
                            <div class="mb-2">
                                <input 
                                    v-model="login_email" label="メールアドレス" class="text-xl w-3/5 p-3 border rounded mb-2" placeholder="you@example.com" required
                                />
                                <input
                                    v-model="login_password" label="パスワード" class="text-xl w-3/5 p-3 border rounded mb-2" placeholder="パスワード" required
                                    :append-icon="show_loginpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show_loginpassword ? 'text' : 'password'"
                                    @click:append="show_loginpassword = !show_loginpassword"
                                />

                                <span
                                    v-if="loginErrorMsg"
                                    dense
                                    text
                                    type="error"
                                >
                                    {{ loginErrorMsg }}
                                </span>

                                <button
                                    :disabled="!login_valid"
                                    color="blue darken-3"
                                    class="text-xl w-3/5 bg-blue-500 text-white py-2 rounded"
                                    @click="email_login"
                                >
                                    ログイン
                                </button>
                            </div>

                        </form>

                    </div>

                    <hr class="border-b-2"> -->
                    <div class="my-12 text-center">
                        <p class="text-xl font-bold mb-2">Googleアカウントでログイン</p>

                        <div>
                            <button
                                type="submit"
                                class="block text-xl w-3/5 text-white h-12 py-2 rounded flex justify-center mx-auto border-blue-500 text-blue-500 border-2 bg-white"
                                v-on:click="googleLogin"
                                >
                                <span class="w-6 pt-1">
                                    <svg enable-background="new 0 0 46 46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="translate(14 14)">
                                            <g clip-rule="evenodd" fill-rule="evenodd">
                                                <path d="m31.1 9.5c0-1.6-.1-3.2-.4-4.7h-21.7v8.9h12.4c-.5 2.9-2.2 5.3-4.6 6.9v5.8h7.4c4.4-4 6.9-9.9 6.9-16.9z" fill="#4285f4"/>
                                                <path d="m9 32c6.2 0 11.4-2.1 15.2-5.6l-7.4-5.8c-2.1 1.4-4.7 2.2-7.8 2.2-6 0-11.1-4-12.9-9.5h-7.7v6c3.8 7.5 11.6 12.7 20.6 12.7z" fill="#34a853"/>
                                                <path d="m-3.9 13.4c-.4-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-6h-7.7c-1.5 3.2-2.4 6.7-2.4 10.4s.9 7.2 2.4 10.3z" fill="#fbbc05"/>
                                                <path d="m9-4.9c3.4 0 6.4 1.2 8.8 3.4l6.6-6.5c-4-3.7-9.2-6-15.4-6-9 0-16.8 5.2-20.6 12.7l7.7 6c1.8-5.5 6.9-9.6 12.9-9.6z" fill="#ea4335"/>
                                            </g>
                                            <path d="m-14-14h46v46h-46z" fill="none" />
                                        </g>
                                    </svg>
                                </span>
                                <span class="text-xl leading-9 ml-4">ログイン</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from '@/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    //layout: 'signin',
    data: function() {
        return {
            tab: null,
            login_valid: true,
            login_email: '',
            login_password: '',
            show_loginpassword: false,
            loginErrorMsg: '',
            socialLoginErrorMsg: ''
        }
    },
    progress() {
            return this.score.value
    },
    methods: {
        // email_login: function(err) {
        //     this.$store
        //         .dispatch('signInWithEmail', {
        //             email: this.login_email,
        //             password: this.login_password
        //         })
        //         .then(() => {
        //             this.login_email = ''
        //             this.login_password = ''
        //             this.$router.push({
        //                 name: 'index'
        //             })
        //         })
        //         .catch((err) => {
        //             if (err.code === 'auth/user-disabled') {
        //                 this.loginErrorMsg =
        //                     'このアカウントはロックされています。'
        //             } else {
        //                 this.loginErrorMsg =
        //                     'メールアドレスまたはパスワードが間違っています。'
        //             }
        //         })
        // },
        googleLogin: function(err) {
            this.$store
                .dispatch('signInWithGoogle')
                .then(() => {
                    this.$router.push({
                        name: 'index'
                    })
                })
                .catch((err) => {
                    this.$parent.socialLoginErrorMsg =
                        '現在Googleでのログインは使用できません。後ほどお試しください。'
                })
        }
    }
}
</script>