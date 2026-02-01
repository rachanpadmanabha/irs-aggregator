import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <div className="min-h-screen animate-fade-in">
      <header className="sticky top-0 z-50 w-full glass-effect shadow-lg border-b border-white/20">
        <div className="container mx-auto px-6 flex h-16 items-center max-w-7xl">
          <div className="mr-4 flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                <span className="text-white font-bold text-xl relative z-10">K2</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  IRS K-2 Part II
                </span>
                <span className="text-xs text-muted-foreground font-medium">Tax Aggregation System</span>
              </div>
            </Link>
            <nav className="flex items-center space-x-2 text-sm font-semibold">
              <Link
                to="/"
                className={cn(
                  "px-5 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group",
                  isActive('/') && location.pathname === '/'
                    ? "gradient-primary text-white shadow-lg glow-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md"
                )}
              >
                <span className="relative z-10">Dashboard</span>
              </Link>
              <Link
                to="/entities"
                className={cn(
                  "px-5 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group",
                  isActive('/entities')
                    ? "gradient-primary text-white shadow-lg glow-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md"
                )}
              >
                <span className="relative z-10">Entities</span>
              </Link>
              <Link
                to="/report"
                className={cn(
                  "px-5 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group",
                  isActive('/report')
                    ? "gradient-primary text-white shadow-lg glow-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md"
                )}
              >
                <span className="relative z-10">Report</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 max-w-7xl animate-slide-up">
        <Outlet />
      </main>
    </div>
  );
}
