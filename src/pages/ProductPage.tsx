
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, ArrowLeft, Plus, Minus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data - in real app, this would come from API
  const product = {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 1520,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    brand: "Apple",
    inStock: true,
    fastDelivery: true,
    description: "The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display with ProMotion technology. Powered by the A17 Pro chip, it delivers exceptional performance for demanding tasks and immersive gaming.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "48MP Main camera system",
      "5G connectivity",
      "Face ID security",
      "iOS 17"
    ],
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Storage": "256GB",
      "Camera": "48MP Triple camera system",
      "Battery": "Up to 29 hours video playback",
      "Operating System": "iOS 17"
    }
  };

  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      comment: "Amazing phone! The camera quality is outstanding and the performance is smooth.",
      date: "2024-01-15"
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      comment: "Great upgrade from my previous phone. Battery life could be better.",
      date: "2024-01-10"
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      comment: "Fast delivery and excellent product quality. Highly recommended!",
      date: "2024-01-08"
    }
  ];

  const addToCart = () => {
    console.log('Added to cart:', { productId: product.id, quantity });
    // Add to cart logic here
  };

  const buyNow = () => {
    console.log('Buy now:', { productId: product.id, quantity });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white hover:bg-red-50 shadow-md"
              >
                <Heart className="h-5 w-5 hover:text-red-500 transition-colors" />
              </Button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <Badge variant="destructive">
                  Save ${product.originalPrice - product.price}
                </Badge>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={buyNow}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Delivery & Service Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>2-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <h4 className="font-semibold text-lg mt-6 mb-3">What's in the Box:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>iPhone 15 Pro Max</li>
                    <li>USB-C to Lightning Cable</li>
                    <li>Documentation</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-900">{key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{review.user}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
