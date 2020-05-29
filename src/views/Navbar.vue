<template>
    <header id="navbar">
        <ul>
            <li><router-link :to="{name: 'Main'}" class="main link">Online Shopping</router-link></li>
            <li class="right"><a class="link">Logout</a></li>
            <li>My name</li>
            <li><router-link :to="{name: 'Cart'}" class="link">Cart</router-link></li>
        </ul>
    </header>
</template>

<script>
export default {
    name: "Navbar",
    data(){
        return{}
    }
}
</script>

<style lang="scss" scoped>

#navbar {
    background-color: #333;
    margin: 0;
    padding: 0;
    
    ul { 
        display: flex;
        padding:5px 20px;
        margin: 0;
    }
    li {
        list-style-type: none;
        color:white;
        padding:10px;
        font-size: 1.2em;
        font-family: Arial, Helvetica, sans-serif;
    }
    .link {
        color:white;
        text-decoration: none;   
        cursor: pointer;
    }
    .link:hover{
        color: red;
    }
    .right{
        margin-left: auto;
    }
}

</style>


