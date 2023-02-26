export default {
    template: `
        <section class="book-filter">
            <input v-model="filterBy.bookName" @input="filter" placeholder="Search" type="text" />
                <input v-model="filterBy.bookPrice"  @input="filter" type="range" id="price" name="price" min="0" max="250"/>
        </section>
    `,
    data() {
        return {
            filterBy: { bookName: '', bookPrice: 100 },
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}