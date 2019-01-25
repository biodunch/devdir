class ProductService {
    constructor(log, errs, models) {
        this.log = log;
        this.errs = errs;
        this.models = models;
    }

    async create(body) {
        const Product = this.models.Product
    }

    async fetch(id) {}
}
