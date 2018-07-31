const price = 9.99
const loadNum = 10;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: 'anime',
        lastSearch: '',
        results: [],
        loading: false,
        price,
    },
    computed: {
      noMoreItems: function() {
        return this.items.length === this.results.length && this.results.length > 0;
      },
    },
    methods: {
        appendItems: function() {
            if(this.items.length < this.results.length) {
                let append = this.results.slice(this.items.length, this.items.length + loadNum);
                this.items = this.items.concat(append);
            }
        },
        onSubmit: function() {
            if (this.newSearch.length) {
                this.items = [];
                this.loading = true;
                this.$http
                    .get('/search/'.concat(this.newSearch))
                    .then(function(res) {
                        this.lastSearch = this.newSearch;
                        this.results = res.data;
                        this.appendItems();
                        this.loading = false;
                });
            }
        },
        addItem: function (index) {
            this.total += price;
            let item = this.items[index];
            let result = this.cart.filter(cartItem => cartItem.id === item.id)[0];

            if (!result) {
                item.qty = 1;
                item.price = price;
                this.cart.push(item);
            } else {
                item.qty++;
            }
        },
        inc: function(item) {
            item.qty++
            this.total += price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= price;
            this.cart = this.cart.filter(cartItem => cartItem.qty > 0);
        }
    },
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function() {
        let viewInstance = this;
        this.onSubmit();
        const elem = document.getElementById('product-list-bottom');
        const watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function() { 
            viewInstance.appendItems()
        });
    }
});


