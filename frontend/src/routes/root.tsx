import { Outlet, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Menu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
import { ShinyButton } from '@/components/magicui/shiny-button';

export default function Root() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  // Don't show navbar on landing page, login, or register pages
  const hideNavbar = !user && ['/', '/login', '/register'].includes(currentPath);

  return (
    <div className="min-h-screen bg-platinum dark:bg-eerie-black transition-colors duration-200">
      {!hideNavbar && (
        <header className="border-b border-french-gray-200 dark:border-onyx bg-french-gray dark:bg-french-gray">
          <div className="container mx-auto px-4 py-4">
            <Menu setActive={setActive}>
              {user ? (
                <>
                  <MenuItem 
                    setActive={setActive} 
                    active={active} 
                    item="Create"
                  >
                    <div className="flex flex-col space-y-4">
                      <HoveredLink to="/post/create">New Post</HoveredLink>
                      <HoveredLink to="/drafts">My Drafts</HoveredLink>
                    </div>
                  </MenuItem>
                  
                  <MenuItem 
                    setActive={setActive} 
                    active={active} 
                    item="Profile" 
                    isLastItem={false}
                  >
                    <div className="flex flex-col space-y-4">
                      <HoveredLink to="/profile">My Profile</HoveredLink>
                      <HoveredLink to="/settings">Settings</HoveredLink>
                      {user.role === 'ADMIN' && (
                        <HoveredLink to="/admin">Admin Dashboard</HoveredLink>
                      )}
                      <ShinyButton onClick={logout}>
                        Logout
                      </ShinyButton>
                    </div>
                  </MenuItem>
                </>
              ) : null}
            </Menu>
          </div>
        </header>
      )}

      <main className={`${hideNavbar ? '' : 'container mx-auto px-4 py-8'} text-eerie-black dark:text-seasalt`}>
        <Outlet />
      </main>
    </div>
  );
} 