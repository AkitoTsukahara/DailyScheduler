<template>
    <section>
        <div class="relative flex-warp">
            <div class="flex justify-center">
                <div class="flex items-center flex-col h-48 mt-20 w-4/5 p-4 bg-white shadow rounded">
                    <div class="w-full border-b pb-2 mb-10">
                        <p class="text-center">メールアドレスでログイン</p>

                        
                    </div>

                    <hr>
                    <form class="w-60">
                        <button
                        type="submit"
                        class="w-full bg-google py-3 px-10 rounded border-blue-600 focus:outline-none focus:shadow-outline border flex justify-center"
                        >
                        <span class="w-10 leading-10 ">
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
                        <span class="text-2xl leading-10 mx-10">Google でログイン</span>
                        </button>
                    </form>
                </div>
            </div>


            <v-col sm="12" md="5">
            
                <v-row>
                    <v-col>
                        <v-tabs
                            v-model="tab"
                            background-color="transparent"
                            color="blue accent-2"
                            grow
                            class="mb-3"
                        >
                            <v-tab to="/login">ログイン</v-tab>
                            <v-tab to="/register">アカウント登録</v-tab>
                        </v-tabs>

                        <v-row>
                            <v-col sm="12">
                                <v-card flat>
                                    <v-card-text class="pa-0">
                                        <v-form
                                            ref="login_form"
                                            v-model="login_valid"
                                            lazy-validation
                                        >
                                            <v-text-field
                                                v-model="login_email"
                                                label="メールアドレス"
                                                required
                                            />

                                            <v-text-field
                                                v-model="login_password"
                                                label="パスワード"
                                                required
                                                :append-icon="
                                                    show_loginpassword
                                                        ? 'mdi-eye'
                                                        : 'mdi-eye-off'
                                                "
                                                :type="
                                                    show_loginpassword
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                @click:append="
                                                    show_loginpassword = !show_loginpassword
                                                "
                                            />

                                            <v-alert
                                                v-if="loginErrorMsg"
                                                dense
                                                text
                                                type="error"
                                            >
                                                {{ loginErrorMsg }}
                                            </v-alert>

                                            <v-btn
                                                :disabled="!login_valid"
                                                color="blue darken-3"
                                                class="my-4 white--text"
                                                @click="email_login"
                                            >
                                                ログイン
                                            </v-btn>
                                        </v-form>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-divider class="my-8" />
                        <v-row>
                            <v-col sm="12">
                                <h2
                                    class="text-center subtitle-1 font-weight-bold mb-2"
                                >
                                    その他のアカウントでログイン
                                </h2>
                            </v-col>
                        </v-row>
                        <v-alert
                            v-if="socialLoginErrorMsg"
                            dense
                            text
                            type="error"
                            dismissible
                        >
                            {{ socialLoginErrorMsg }}
                        </v-alert>
                        <v-btn
                            block
                            class="color-google text-capitalize mb-3"
                            @click="googleLogin"
                        >
                            <p>Googleアカウントでログイン</p>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </div>
    </section>
</template>
<script>
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
    methods: {
        email_login: function(err) {
            this.$store
                .dispatch('signInWithEmail', {
                    email: this.login_email,
                    password: this.login_password
                })
                .then(() => {
                    this.login_email = ''
                    this.login_password = ''
                    this.$router.push({
                        name: 'index'
                    })
                })
                .catch((err) => {
                    if (err.code === 'auth/user-disabled') {
                        this.loginErrorMsg =
                            'このアカウントはロックされています。'
                    } else {
                        this.loginErrorMsg =
                            'メールアドレスまたはパスワードが間違っています。'
                    }
                })
        },
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