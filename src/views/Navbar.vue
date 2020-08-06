<template>
    <header id="navbar">
        <div>
            <ul>
                <li>
                    <router-link :to="{name: 'Main'}" class="main link">Skincare Shopping</router-link>
                </li>
                <li class="right">
                    <a class="link" @click.prevent="logOut">Logout</a>
                </li>
                <li>{{getUsername()}}</li>
                <li>
                    <router-link :to="{name: 'Cart'}" class="link">
                        Shopping Cart
                        <span v-if="cartList.length">{{cartList.length}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Navbar",
    data() {
        return {
            status: window.localStorage.getItem("isLoggedin"),
            show: false,
        };
    },
    computed: {
        ...mapGetters(["cartList"]),
    },
    created() {},
    watch: {},
    methods: {
        getUsername() {
            const username = window.localStorage.getItem("username");
            return username;
        },
        logOut() {
            window.localStorage.clear();
            console.log("cleared!!");
            this.$router.push({ name: "Login" });
        },
    },
};
</script>

<style lang="scss" scoped>
#navbar {
    background-color: rgb(126, 69, 97);
    margin: 0;
    padding: 0;

    ul {
        display: flex;
        padding: 15px 20px;
        margin: 0;
    }
    li {
        list-style-type: none;
        color: white;
        padding: 10px;
        font-size: 1.2em;
        font-family: "Raleway", Arial, Helvetica, sans-serif;
    }
    .link {
        color: white;
        text-decoration: none;
        cursor: pointer;
    }
    .link:hover {
        color: pink;
    }
    .right {
        margin-left: auto;
    }
    span {
        background: yellowgreen;
        border-radius: 10%;
        padding: 0 5px;
        font-size: 0.8em;
    }
}
</style>


