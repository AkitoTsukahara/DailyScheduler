<template>
    <div 
        class="flex mx-2 hover:bg-gray-300 rounded-lg" 
        v-if="!show" 
        @click="showInput"
    >
        <span class="p-2">タスクを追加</span>
    </div>
    <div class="mx-2" v-else>
        <div>
            <input 
                type="text"
                class="w-full p-2"
                placeholder="新しいタスク名を入力してください"
                v-model="task_name"
                ref="input"
            />
        </div>
        <div class="flex m-2">
            <button
                class="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg mr-2 font-bold text-xs"
                @click="addTask"
            >
                追加
            </button>
            <button 
                class="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg font-bold text-xs"
                @click="closeInput"
            >
                キャンセル
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props:[
        'category_id'
    ],
    data() {
        return {
            show: false,
            task_name: ''
        }
    },
    methods:{
        focusInput() {
            this.$refs.input.focus();
        },
        showInput() {
            this.show = true;
            Vue.nextTick(() => {
                this.focusInput();
            });
        },
        closeInput() {
            this.show = false;
            this.task_name = ''
        },
        addTask() {
            if (this.task_name != '') {
                this.$emit('TaskAdded', this.task_name, this.category_id)
                this.show = false
                this.task_name = ''
            }
        }
    },
}
</script>