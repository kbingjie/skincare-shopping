<template>
    <div class="login-info">
        <!-- login part -->
        <!-- <template>
            <form>
                <h1>Login</h1>
                <label for="">USERNAME:</label>
                <input type="text" v-model="username"><br>
                <label for="">PASSWORD:</label>
                <input type="password" v-model="password"><br>
                <small v-if="feedback">{{feedback}}</small>
                <input class="button" type="button" value="Submit"
                @click.prevent="login">
                <input class="button" type="button" value="Go Register">
            </form>
        </template> -->

        <!-- register part -->
        <template>
            <form>
                <h1>Register</h1>
                <label for="">Username:</label>
                <input type="text" v-model="username"><br>
                <label for="">Password:</label>
                <input type="password" v-model="password"><br>
                <label for="">Confirm Password:</label>
                <input type="password" v-model="confirmedPassword"><br>
                <small v-if="feedback">{{feedback}}</small>
                <input class="button" type="button" value="Submit"
                @click.prevent="register">
                <input class="button" type="button" value="Already a Member"
                >
            </form>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';

export default {
    name: "Login",
    data(){
        return{
            username:null,
            password:null,
            confirmedPassword:null,
            feedback:null
        }
    },
    methods: {
        ...mapMutations(['setLoginStatus', 'getUser']),
        register(){
            if(this.password === this.confirmedPassword){
                window.localStorage.setItem('username', this.username);
                window.localStorage.setItem('password', this.password);
                window.localStorage.setItem('isLoggedin', 'yes');
                this.$router.push({ name: 'Main'});             
            } else {
                this.feedback = "Something wrong with your input"
            }
        }
    },
    computed:{
        ...mapGetters(['loginStatus'])
    },
    created(){

        
    }
}
</script>

<style scoped>

form {
    background: white;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 20px;
    width: 500px;
    margin: 50px auto;
    text-align: center;
    box-shadow: 0 1px 10px rgba(0,0,0,.3);
}

h1 {
    text-align: center;
}

input {
    margin-top: 10px;
}
label {
    font-size: 0.8em;
}

.button {
    min-width: 100px;
    margin: 20px 2px;
}

small {
    display: block;
    color: red;
    margin-top: 10px;
}

</style>
