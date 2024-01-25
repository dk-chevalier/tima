class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'fields', 'limit', 'near']; // this means they don't get caught up in this filter, and thus can be used for the below methods, like sort() etc.
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in|eq)\b/g,
      (match) => `$${match}`,
    );
    // DON'T NEED gte/lte etc. QUERIES YET....PERHAPS WILL WHEN I HAVE RATINGS ETC..........
    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(this.query);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // sorts according to property passed in
      // query string should e.g. = &sort=ratingsAverage or could be &sort=-ratingsAverage
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else if (this.queryString.near) {
      // sorts according to nearest to specified location
      // query string = &near=140.0000,70.000 (i.e. &near=${longitued},${latitude})
      const coords = this.queryString.near.split(',');

      this.query = this.query.find({
        location: {
          $near: { $geometry: { type: 'Point', coordinates: coords } },
        },
      });
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  // near() {}
}
module.exports = APIFeatures;
