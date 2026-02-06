'use client';

import { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, Paper, Alert, AppBar, Toolbar, Stack } from '@mui/material';
import { FaLock, FaUsers, FaFileAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSelector from '@/components/ThemeSelector';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Temporary fake auth - just check password directly
    if (password === 'admin123') {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default'
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <FaLock size={48} color="#666" />
              <Typography variant="h4" fontWeight={700} mt={2}>
                Admin Access
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Enter password to continue
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                sx={{ mb: 2 }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    );
  }

  const navItems = [
    { label: 'Ambassadors', href: '/admin/ambassadors', icon: FaUsers },
    { label: 'Content', href: '/admin/content', icon: FaFileAlt },
  ];

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 0, mr: 4 }}>
            Admin Panel
          </Typography>

          <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  startIcon={<Icon />}
                  sx={{
                    opacity: isActive ? 1 : 0.7,
                    borderBottom: isActive ? '2px solid currentColor' : 'none',
                    borderRadius: 0,
                    '&:hover': {
                      opacity: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <ThemeSelector />
            
            <Button
              size="small"
              color="inherit"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </Box>
    </>
  );
}
