<template>
    <div id="product" v-if="product">
        <div class="product-head box">
            <div class="product-image">
                <img :src="product.image" alt />
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <div class="price">${{ product.cost }}</div>
                <div class="add-cart" @click="handleCart">Add to Cart</div>
            </div>
        </div>

        <div class="product-desc box">
            <h2>Product Description</h2>
            <img :src="product.imageDetail" alt />
            <div class="detail">{{ product.desDetail}}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Product",
    data() {
        return {
            id: this.$route.params.id,
            product: null,
        };
    },
    methods: {
        //...mapActions(['fetchProducts']),
        getProduct() {
            this.productList.forEach((product) => {
                //console.log(product.id)
                //console.log(this.$route.params)
                if (product.id === this.id) {
                    console.log("jj");
                    this.product = product;
                }
            });
        },
        handleCart() {
            console.log("add to cart" + this.id);
            this.$store.commit("addCart", this.id);
        },
    },
    computed: mapGetters(["productList"]),
    created() {
        this.getProduct();
    },
};
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
        user-select: none;
        .product-image,
        .product-info {
            flex: 1 0 100px;
            text-align: center;
        }
        img {
            border-radius: 50px;
        }
        .product-info {
            .price {
                color: hotpink;
                font-size: 1.5em;
                font-weight: bold;
                user-select: none;
            }
            .add-cart {
                color: white;
                background-color: hotpink;
                border-radius: 5px;
                width: 100px;
                margin: 0 auto;
                padding: 10px;
                margin-top: 20px;
                cursor: pointer;
            }
            .add-cart:hover {
                background-color: rgb(139, 57, 98);
            }
        }
    }
    .product-desc {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0;
        box-sizing: border-box;
        user-select: none;
        h2 {
            width: 100%;
            text-align: center;
            padding: 1%px;
        }
        img {
            display: block;
            border-radius: 50px;
            width: 43%;
            padding-left: 2%;
        }
        .detail {
            width: 42%;
            letter-spacing: 2px;
            padding: 0 3%;
        }
        .detail::first-letter {
            font-size: 1.5em;
            color: hotpink;
        }
    }
}
</style>