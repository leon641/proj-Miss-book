export default {
  props: ['review'],
  template: `
          <article class="review-preview">
            <h3>{{ review.name }}</h3>
            <p class="stars">{{ fotmattedRate }}</p>
            <p class="date">Read At: {{ review.readAt }}</p>
        </article>
        `,

  data() {
    return {}
  },
  created() {
    console.log(this.review)
  },
  methods: {},
  computed: {
    fotmattedRate() {
      return '★'.repeat(+this.review.rate)
    },
  },
}
