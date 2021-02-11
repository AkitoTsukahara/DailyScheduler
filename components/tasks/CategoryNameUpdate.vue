<template>
    <div class="font-bold" 
        v-if="!show" 
        @click="showInput"
    >
        {{ this.category.name }}
    </div>
    <div v-else>
        <input 
            v-model="category_name" 
            @blur="updateName" 
            @keyup.enter="updateName"
            ref="input"
        />
            {{ category_name }}
    </div>
</template>
<script>
export default {
    props:[
        'category'
    ],
    data() {
        return {
            show: false,
            category_name:'',
        }
    },
    methods:{
        showInput(){
            this.category_name = this.category.name
            this.show = true;
            this.$nextTick(() => {
                this.focusInput();
            });     
        },
        focusInput() {
            this.$refs.input.focus();
        },
        updateName(){
            console.log(this.category_name)
        },
        updateName(){
            this.show = false;
            this.$emit('category-name-updated', this.category_name, this.category.id)
        }
    },
}
</script>