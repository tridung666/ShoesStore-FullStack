const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      brand: { type: String, required: true },
      color: { type: String, required: true },
      size: { type: [Number], required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      description: { type: String }
    },
    { timestamps: true }
  );
  