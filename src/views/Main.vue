<template>
    <div id="main">
        <div class="list-control">
            <!-- filter options -->
            <div class="list-control-filter">
                <span>Brand:</span>
                <span
                    class="list-control-filter-item"
                    :class="{active: brand === filterBrand}"
                    @click.prevent="handleBrand(brand)"
                    v-for="(brand,index) in brands"
                    :key="index"
                >{{brand}}</span>
            </div>
            <div class="list-control-filter">
                <span>Category:</span>
                <span
                    class="list-control-filter-item"
                    :class="{active: category === filterCategory}"
                    @click.prevent="handleCategory(category)"
                    v-for="(category, index) in categories"
                    :key="index"
                >{{category}}</span>
            </div>

            <!-- sort by -->
            <div class="list-control-order">
                <span>Sort By:</span>
                <span
                    class="list-control-order-item"
                    :class="{active:order === null}"
                    @click.prevent="handleDefault"
                >Default</span>
                <span
                    class="list-control-order-item"
                    :class="{active:order === 'sales'}"
                    @click.prevent="handlePop"
                >Popularity</span>
                <span
                    class="list-control-order-item"
                    :class="{active:order === 'cost'}"
                    @click.prevent="handlePrice"
                >Price</span>
            </div>
        </div>

        <!-- show products -->
        <div class="products">
            <div v-for="product in filters" :key="product.id" class="product">
                <img :src="product.image" />
                <div class="name" @click="productPage(product.id)">{{ product.name | snippet }}</div>
                <small>{{ product.category }}</small>
                <br />
                <small>Sold: {{ product.sales }}</small>
                <br />
                <span class="price">${{ product.cost}}</span>
                <a @click="addCart(product.id)" class="add-cart">Add to Cart</a>
            </div>
        </div>
        <Product />
    </div>
</template>

<script>
import Product from "../views/Product.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: "Main",
    components: {
        Product,
    },
    data() {
        return {
            filterBrand: null,
            filterCategory: null,
            order: null,
        };
    },
    methods: {
        ...mapActions(["fetchProducts"]),
        ...mapMutations(["addCart"]),
        //click event bringing to single product page
        productPage(id) {
            console.log("I wanna go to this product page");
            console.log(id);
            this.$router.push({ name: "Product", params: { id: id } });
        },
        handleBrand(brand) {
            if (this.filterBrand === brand) {
                this.filterBrand = null;
            } else {
                this.filterBrand = brand;
            }
        },
        handleCategory(category) {
            if (this.filterCategory === category) {
                this.filterCategory = null;
            } else {
                this.filterCategory = category;
            }
        },
        handleDefault() {
            this.order = null;
        },
        handlePop() {
            this.order = "sales";
        },
        handlePrice() {
            this.order = "cost";
        },
    },
    computed: {
        ...mapGetters(["productList", "brands", "categories"]),
        filters() {
            //shadow copy productLIst
            let list = [...this.productList];
            //filter brand
            if (this.filterBrand) {
                list = list.filter((item) => item.brand === this.filterBrand);
            }
            // after filter brand then filter categories
            if (this.filterCategory) {
                list = list.filter(
                    (item) => item.category === this.filterCategory
                );
            }
            //order the list
            if (this.order) {
                if (this.order === "sales") {
                    list = list.sort((a, b) => b.sales - a.sales);
                } else if (this.order === "cost") {
                    list = list.sort((a, b) => b.cost - a.cost);
                }
            }
            return list;
        },
    },
    created() {
        this.fetchProducts();
    },
};
</script>

<style lang="scss" scoped>
.list-control {
    margin: 16px;
    padding: 16px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    .list-control-filter {
        margin-bottom: 20px;
    }
}
.list-control-filter-item,
.list-control-order-item {
    border-radius: 3px;
    border: 1px solid #e9eaec;
    padding: 3px 5px;
    margin-left: 10px;
    cursor: pointer;
}

.products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    padding: 16px;
    .product {
        position: relative;
        border: 1px solid #e9eaec;
        border-radius: 10px;
        background: #fff;
        text-align: center;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        user-select: none;
        padding-bottom: 10px;
    }
    .add-cart {
        position: absolute;
        display: none;
        z-index: 1;
        top: -20px;
        right: 0;
        color: #fff;
        background-color: hotpink;
        border-radius: 5px;
        width: 100px;
        padding: 10px;
        margin-top: 20px;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.5);
    }
    .product:hover .add-cart {
        display: block;
    }
    .add-cart:hover {
        background-color: rgb(139, 57, 98);
    }
    .name {
        margin-top: 5px;
    }
    .name:hover {
        color: hotpink;
        cursor: pointer;
    }
    .price {
        color: hotpink;
        font-weight: bold;
        font-size: 1.2em;
    }
    img {
        border-radius: 10px;
        width: 100%;
    }
}

.active {
    background-color: rgb(180, 74, 127);
    border: none;
    color: #fff;
}
</style>
