export class ApiFeature {
  constructor(
    mongooseQuery,
    queryString,
    shouldPopulate = false,
    populateField
  ) {
    this.query = mongooseQuery;
    this.queryString = queryString;
    this.shouldPopulate = shouldPopulate;
    this.populateField = populateField;
  }

  paginate() {
    let page = parseInt(this.queryString.page) || 1;
    if (page <= 0) {
      page = 1;
    }
    this.page = page;
    const skip = (page - 1) * 200;
    this.query = this.query.skip(skip).limit(200);
    return this;
  }

  filter() {
    const filters = { ...this.queryString };
    const excludedFields = ["page", "sort", "fields", "keyword"];

    excludedFields.forEach((field) => {
      delete filters[field];
    });

    const filterString = JSON.stringify(filters);
    const filterObject = JSON.parse(
      filterString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    this.query = this.query.find(filterObject);

    if (this.shouldPopulate) {
      this.query = this.query.populate(this.populateField);
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortFields);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    }
    return this;
  }
  async count() {
    return await this.query.countDocuments();
  }
}
