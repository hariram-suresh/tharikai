import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Home,
  Package,
  Users,
  Award,
  FileText,
  Settings,
  LogOut,
  Menu,
  Bell,
  Scissors,
  ShoppingBag,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'weaver' | 'buyer' | 'society' | null;
}

const Navigation = ({ userRole, className }: { userRole?: string; className?: string }) => {
  const location = useLocation();

  const getNavigationItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', href: '/' },
      { icon: Package, label: 'Products', href: '/products' },
    ];

    switch (userRole) {
      case 'weaver':
        return [
          ...commonItems,
          { icon: Scissors, label: 'My Production', href: '/weaver/production' },
          { icon: Award, label: 'My Earnings', href: '/weaver/earnings' },
          { icon: FileText, label: 'Government Schemes', href: '/weaver/schemes' },
        ];
      case 'buyer':
        return [
          ...commonItems,
          { icon: ShoppingBag, label: 'My Orders', href: '/buyer/orders' },
          { icon: Award, label: 'Featured Weavers', href: '/buyer/weavers' },
        ];
      case 'society':
        return [
          ...commonItems,
          { icon: Users, label: 'Manage Weavers', href: '/society/weavers' },
          { icon: Building2, label: 'Hierarchy', href: '/society/hierarchy' },
          { icon: FileText, label: 'Scheme Requests', href: '/society/schemes' },
        ];
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className={cn('space-y-2', className)}>
      {navigationItems.map((item) => (
        <Link key={item.href} to={item.href}>
          <Button
            variant={location.pathname === item.href ? 'default' : 'ghost'}
            className="w-full justify-start"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default function Layout({ children, userRole }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'weaver':
        return 'bg-emerald text-white';
      case 'buyer':
        return 'bg-indigo text-white';
      case 'society':
        return 'bg-saffron text-white';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col space-y-4 py-4">
                <div className="px-2">
                  <h2 className="text-lg font-semibold tracking-tight">Saree Seva</h2>
                  <p className="text-xs text-muted-foreground">Weaving Tradition, Building Future</p>
                </div>
                <Navigation userRole={userRole} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl text-gradient">Saree Seva</span>
          </Link>

          <div className="flex-1" />

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Guest User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      guest@saree-seva.com
                    </p>
                    {userRole && (
                      <Badge className={cn('w-fit text-xs', getRoleBadgeColor(userRole))}>
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <div className="flex-1 overflow-auto p-4">
            <Navigation userRole={userRole} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
