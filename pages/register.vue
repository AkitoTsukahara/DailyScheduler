<template>
    <v-container>
        <v-row justify="center">
            <v-col sm="12" md="5">
                <h2 class="text-center subtitle-1 font-weight-bold mb-2">
                    メールアドレスで登録
                </h2>
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
                                            ref="register_form"
                                            v-model="register_valid"
                                            lazy-validation
                                        >
                                            <v-text-field
                                                v-model="register_email"
                                                label="メールアドレス"
                                                :rules="emailRules"
                                                required
                                                validate-on-blur
                                            />

                                            <v-text-field
                                                ref="register_password"
                                                v-model="register_password"
                                                label="パスワード"
                                                required
                                                :append-icon="
                                                    show_registerPassword
                                                        ? 'mdi-eye'
                                                        : 'mdi-eye-off'
                                                "
                                                :type="
                                                    show_registerPassword
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                :rules="register_passwordRules"
                                                validate-on-blur
                                                loading
                                                @click:append="
                                                    show_registerPassword = !show_registerPassword
                                                "
                                            >
                                                <template v-slot:progress>
                                                    <v-progress-linear
                                                        :value="score.value"
                                                        :color="score.color"
                                                        absolute
                                                        height="2"
                                                    />
                                                </template>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="
                                                    register_password_again
                                                "
                                                label="パスワード（確認）"
                                                required
                                                :append-icon="
                                                    show_registerPassword
                                                        ? 'mdi-eye'
                                                        : 'mdi-eye-off'
                                                "
                                                :type="
                                                    show_registerPassword
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                validate-on-blur
                                                :rules="
                                                    register_passwordAgainRules
                                                "
                                                @click:append="
                                                    show_registerPassword = !show_registerPassword
                                                "
                                            />

                                            <v-alert
                                                v-if="registerErrorMsg"
                                                dense
                                                text
                                                type="error"
                                            >
                                                {{ registerErrorMsg }}
                                            </v-alert>

                                            <v-btn
                                                :disabled="!register_valid"
                                                color="blue darken-3"
                                                class="mr-4 white--text"
                                                @click="email_register"
                                            >
                                                登録
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

                            <v-btn
                                block
                                class="color-google text-capitalize mb-3"
                                @click="googleLogin"
                            >
                                <span
                                    class="color-google__icon v-icon notranslate v-icon--left mdi theme--light"
                                >
                                    <svg
                                        enable-background="new 0 0 46 46"
                                        viewBox="0 0 46 46"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g transform="translate(14 14)">
                                            <g clip-rule="evenodd" fill-rule="evenodd">
                                                <path
                                                    d="m31.1 9.5c0-1.6-.1-3.2-.4-4.7h-21.7v8.9h12.4c-.5 2.9-2.2 5.3-4.6 6.9v5.8h7.4c4.4-4 6.9-9.9 6.9-16.9z"
                                                    fill="#4285f4"
                                                />
                                                <path
                                                    d="m9 32c6.2 0 11.4-2.1 15.2-5.6l-7.4-5.8c-2.1 1.4-4.7 2.2-7.8 2.2-6 0-11.1-4-12.9-9.5h-7.7v6c3.8 7.5 11.6 12.7 20.6 12.7z"
                                                    fill="#34a853"
                                                />
                                                <path
                                                    d="m-3.9 13.4c-.4-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-6h-7.7c-1.5 3.2-2.4 6.7-2.4 10.4s.9 7.2 2.4 10.3z"
                                                    fill="#fbbc05"
                                                />
                                                <path
                                                    d="m9-4.9c3.4 0 6.4 1.2 8.8 3.4l6.6-6.5c-4-3.7-9.2-6-15.4-6-9 0-16.8 5.2-20.6 12.7l7.7 6c1.8-5.5 6.9-9.6 12.9-9.6z"
                                                    fill="#ea4335"
                                                />
                                            </g>
                                            <path d="m-14-14h46v46h-46z" fill="none" />
                                        </g>
                                    </svg>
                                </span>
                                <p>Googleアカウントでログイン</p>
                            </v-btn>
                        </v-row>
                        
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
//import SocialLogin from '~/components/SocialLogin.vue'
import firebase from '@/plugins/firebase'
import zxcvbn from 'zxcvbn'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    //layout: 'signin',
    // components: {
    //     SocialLogin
    // },
    data: function() {
        return {
            registerErrorMsg: '',
            tab: null,
            register_valid: true,
            register_email: '',
            register_password: '',
            register_password_again: '',
            emailRules: [
                (v) => {
                    if (v) {
                        return (
                            /.+@.+\..+/.test(v) ||
                            '有効なメールアドレスを入力してください'
                        )
                    }else{
                        return true
                    }
                }
            ],
            register_passwordRules: [
                (v) => !!v || 'パスワードを入力してください',
                (v) =>
                    zxcvbn(v).score >= 3 ||
                    '大文字・小文字・数字・記号を混ぜた強いパスワードにしてください'
            ],
            register_passwordAgainRules: [
                (v) => {
                    if (v) {
                        return (
                            this.$refs.register_password.value === v ||
                            'パスワードと一致しません'
                        )
                    }else{
                        return true

                    }
                }
            ],
            show_registerPassword: false
        }
    },
    computed: {
        progress() {
            return this.score.value
        },
        score() {
            const result = zxcvbn(this.register_password)

            switch (result.score) {
                case 4:
                    return {
                        color: 'green',
                        value: 100
                    }
                case 3:
                    return {
                        color: 'light-green lighten-1',
                        value: 75
                    }
                case 2:
                    return {
                        color: 'amber accent-2',
                        value: 50
                    }
                case 1:
                    return {
                        color: 'deep-orange lighten-1',
                        value: 25
                    }
                default:
                    return {
                        color: 'red darken-3',
                        value: 0
                    }
            }
        }
    },
    methods: {
        email_register: function(err) {
            if (this.$refs.register_form.validate()) {
                this.$store
                    .dispatch('signUp', {
                        email: this.register_email,
                        password: this.register_password
                    })
                    .then(() => {
                        this.register_email = ''
                        this.register_password = ''
                        this.$router.push({
                            name: 'index',
                            params: {
                                dashboard_msg: true,
                                dashboard_msg_text:
                                    'アカウントの登録が完了しました。'
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        if (err.code === 'auth/email-already-in-use') {
                            this.registerErrorMsg =
                                'このメールアドレスは既に登録されています。'
                        } else if (err.code === 'auth/invalid-email') {
                            this.registerErrorMsg = '無効なメールアドレスです。'
                        } else {
                            this.registerErrorMsg =
                                'エラーにより登録できませんでした。'
                        }
                    })
            }
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