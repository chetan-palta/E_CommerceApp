
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProductFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const ProductFilters = ({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  sortBy,
  setSortBy
}: ProductFiltersProps) => {
  const brands = ['Apple', 'Samsung', 'Dell', 'Fashion Co', 'Beauty Plus', 'BabyCare', 'HomeDecor'];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  return (
    <div className="space-y-6">
      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={2000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={brand} className="text-sm font-medium cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delivery Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="fast-delivery" />
              <Label htmlFor="fast-delivery" className="text-sm cursor-pointer">
                Fast Delivery
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="free-delivery" />
              <Label htmlFor="free-delivery" className="text-sm cursor-pointer">
                Free Delivery
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;
