import Product from '../models/Product.js';

// ... (getProducts, getProductById, createProduct, updateProduct, deleteProduct TETAP ADA) ...
// Pastikan kode yang lama tidak hilang. Saya hanya menuliskan fungsi BARU di sini untuk ditambahkan.

export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    // Cek apakah user sudah review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    
    // Hitung rata-rata rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Export ulang semua (pastikan di file asli Anda merge dengan benar)
export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };