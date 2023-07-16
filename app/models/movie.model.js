module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      rating : Number,
      cast: Array,
      genre:String,
      release_date: Date
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Movie = mongoose.model("movie", schema);
  return Movie;
};
