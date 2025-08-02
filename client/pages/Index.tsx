import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Scissors,
  ShoppingBag,
  Building2,
  TrendingUp,
  Users,
  Package,
  Award,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Palette,
  Shirt,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRole = 'weaver' | 'buyer' | 'society' | null;

// Sample data
const featuredProducts = [
  {
    id: 1,
    name: 'Royal Kanjivaram Silk Saree',
    price: '₹45,000',
    weaver: 'Lakshmi Devi',
    location: 'Kanchipuram, Tamil Nadu',
    variety: 'Kanjivaram',
    material: 'Pure Silk',
    color: 'Deep Maroon',
    design: 'Traditional Motifs',
    image: '/placeholder.svg',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 2,
    name: 'Handwoven Banarasi Silk',
    price: '₹32,000',
    weaver: 'Rajesh Kumar',
    location: 'Varanasi, Uttar Pradesh',
    variety: 'Banarasi',
    material: 'Pure Silk',
    color: 'Royal Blue',
    design: 'Zari Work',
    image: '/placeholder.svg',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Elegant Chanderi Cotton',
    price: '₹8,500',
    weaver: 'Meera Sharma',
    location: 'Chanderi, Madhya Pradesh',
    variety: 'Chanderi',
    material: 'Cotton Silk',
    color: 'Sage Green',
    design: 'Floral Patterns',
    image: '/placeholder.svg',
    rating: 4.7,
    inStock: true,
  },
];

const topWeavers = [
  {
    name: 'Lakshmi Devi',
    location: 'Kanchipuram, TN',
    earnings: '₹2,45,000',
    sareesSold: 42,
    rating: 4.9,
    speciality: 'Kanjivaram Silk',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Varanasi, UP',
    earnings: '₹1,85,000',
    sareesSold: 35,
    rating: 4.8,
    speciality: 'Banarasi Silk',
  },
  {
    name: 'Meera Sharma',
    location: 'Chanderi, MP',
    earnings: '₹1,25,000',
    sareesSold: 28,
    rating: 4.7,
    speciality: 'Chanderi Cotton',
  },
];

const RoleSelectionCard = ({ role, icon: Icon, title, description, color, onSelect }: {
  role: UserRole;
  icon: any;
  title: string;
  description: string;
  color: string;
  onSelect: (role: UserRole) => void;
}) => (
  <Card
    className={cn(
      'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group',
      'border-2 hover:border-primary/20'
    )}
    onClick={() => onSelect(role)}
  >
    <CardHeader className="text-center">
      <div className={cn(
        'mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform',
        color
      )}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription className="text-sm">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button className="w-full" variant="outline">
        Continue as {title}
      </Button>
    </CardContent>
  </Card>
);

const ProductCard = ({ product }: { product: typeof featuredProducts[0] }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-square bg-silk relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      <Badge className="absolute top-2 right-2 bg-emerald text-white">
        <Star className="h-3 w-3 mr-1" />
        {product.rating}
      </Badge>
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <p className="text-primary font-bold text-xl mb-2">{product.price}</p>
      <div className="space-y-1 text-sm text-muted-foreground mb-3">
        <div className="flex items-center">
          <Scissors className="h-3 w-3 mr-1" />
          By {product.weaver}
        </div>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {product.location}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        <Badge variant="secondary" className="text-xs">{product.variety}</Badge>
        <Badge variant="secondary" className="text-xs">{product.material}</Badge>
        <Badge variant="secondary" className="text-xs">{product.color}</Badge>
      </div>
      <Button className="w-full">View Details</Button>
    </CardContent>
  </Card>
);

const WeaverCard = ({ weaver }: { weaver: typeof topWeavers[0] }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{weaver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-semibold">{weaver.name}</h4>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {weaver.location}
          </p>
          <div className="flex items-center mt-1">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{weaver.rating}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Earnings:</span>
          <p className="font-semibold text-primary">{weaver.earnings}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Sarees Sold:</span>
          <p className="font-semibold">{weaver.sareesSold}</p>
        </div>
      </div>
      <Badge variant="outline" className="mt-2 text-xs">{weaver.speciality}</Badge>
    </CardContent>
  </Card>
);

export default function Index() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-silk/20 to-background">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                <Scissors className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient">
                Saree Seva
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Weaving Tradition, Building Future
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Connect weavers, buyers, and societies in a unified platform for traditional saree commerce.
              Preserve heritage while embracing modern technology.
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Active Weavers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2,000+</div>
                <div className="text-muted-foreground">Sarees Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-muted-foreground">Partner Societies</div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8">Choose Your Role</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <RoleSelectionCard
                  role="weaver"
                  icon={Scissors}
                  title="Weaver"
                  description="Create beautiful sarees, track earnings, and manage production"
                  color="bg-emerald"
                  onSelect={setUserRole}
                />
                <RoleSelectionCard
                  role="buyer"
                  icon={ShoppingBag}
                  title="Buyer"
                  description="Discover authentic sarees, connect with weavers, and place orders"
                  color="bg-indigo"
                  onSelect={setUserRole}
                />
                <RoleSelectionCard
                  role="society"
                  icon={Building2}
                  title="Society"
                  description="Manage weaver networks, coordinate supplies, and oversee operations"
                  color="bg-saffron"
                  onSelect={setUserRole}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout userRole={userRole}>
      <div className="p-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Saree Seva
              </h1>
              <p className="text-muted-foreground">
                {userRole === 'weaver' && 'Manage your productions, track earnings, and showcase your craftsmanship'}
                {userRole === 'buyer' && 'Discover authentic handwoven sarees from master weavers across India'}
                {userRole === 'society' && 'Oversee weaver networks, manage supplies, and coordinate operations'}
              </p>
            </div>
            <Button onClick={() => setUserRole(null)} variant="outline">
              Change Role
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-emerald mr-3" />
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">Active Weavers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-indigo mr-3" />
                <div>
                  <p className="text-2xl font-bold">₹8.2L</p>
                  <p className="text-sm text-muted-foreground">Monthly Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-saffron mr-3" />
                <div>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sarees, weavers, or designs..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <Shirt className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Variety" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kanjivaram">Kanjivaram</SelectItem>
                    <SelectItem value="banarasi">Banarasi</SelectItem>
                    <SelectItem value="chanderi">Chanderi</SelectItem>
                    <SelectItem value="tussar">Tussar</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <Sparkles className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silk">Pure Silk</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="cotton-silk">Cotton Silk</SelectItem>
                    <SelectItem value="linen">Linen</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <Palette className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Products */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Sarees</h2>
              <Button variant="outline">View All</Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Top Weavers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Weavers</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {topWeavers.map((weaver, index) => (
                <WeaverCard key={index} weaver={weaver} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
