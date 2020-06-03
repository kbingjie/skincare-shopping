<template>
    <div id="product" v-if="product">
        <div class="product-head box">
            <div class="product-image">
                <img :src="product.image" alt="">
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <div class="price">${{ product.cost }}</div>
                <div class="add-cart"
                @click="handleCart">Add to Cart</div>
            </div>
        </div>

        <div class="product-desc box">
            <h2>Product Description</h2>
            <img :src="product.imageDetail" alt="">
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "Product",
    data(){
        return{
            id: this.$route.params.id,
            product:null
        }
    },
    methods: {
       //...mapActions(['fetchProducts']),
        getProduct(){
            this.productList.forEach(product => {
                //console.log(product.id)
                //console.log(this.$route.params)
                if(product.id === this.id){
                    console.log('jj')
                    this.product = product;
                }      
            })
        },
        handleCart(){
            console.log('add to cart' + this.id)
            this.$store.commit('addCart', this.id)
        }
    },
    computed: 
        mapGetters(['productList'])
    ,
    created(){
        this.getProduct();
    }
}
</script>

<style lang="scss">
#product {
    display: flex;
    flex-wrap: wrap;
    .box {
        background: #fff;
        width: 100%;
        padding: 20px;
        margin: 10px 30px;
        border: 1px solid #dddee1;
        border-radius: 10px;
    }
    .product-head {
        display: flex;
        .product-image, .product-info{
        flex: 1 0 100px;
        text-align: center;
        }
        .product-info {
            .price{
                color: red;
            }
            .add-cart{
                color: white;
                background-color: #2d8cf0;
                border-radius: 5px;
                width: 100px;
                margin: 0 auto;
                padding: 10px;
                margin-top: 20px;
                cursor: pointer;          
            }
            .add-cart:hover {
                background-color: #2166af;
            }
        }
    }
    .product-desc{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px 0;
        h2 {
            width: 100%;
            text-align: center;
            padding: 10px;
        }
        img {      
            display: block;
            width: 50%;
            
        }
    }
    
}


</style>