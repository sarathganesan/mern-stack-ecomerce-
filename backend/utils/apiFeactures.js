class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        let keyword=this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:'i'
            }
        }:{};
        let category = this.queryStr.category ? { category: this.queryStr.category } : {};
        this.query.find({...keyword, ...category})
        return this;
    }


    filterByPrice() {
        const gte = this.queryStr.gte;
        const lte = this.queryStr.lte;
        if (this.queryStr.gte && this.queryStr.lte) {
            this.query = this.query.find({ price: { $gte: gte, $lte: lte } });
        } else if (this.queryStr.gte) {
            this.query = this.query.find({ price: { $gte: this.queryStr.gte } });
        } else if (this.queryStr.lte) {
            this.query = this.query.find({ price: { $lte: this.queryStr.lte } });
        } else {
            return this;
        }
        return this;
    }

    filterByRatings() {
        if (this.queryStr.ratings) {
            this.query = this.query.find({ ratings: this.queryStr.ratings });
        }
        return this;
    }

    paginate(resPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage-1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports=APIFeatures;