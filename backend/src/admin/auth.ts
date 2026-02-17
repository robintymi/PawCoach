import { Request, Response, NextFunction } from 'express';

// Session-Typ erweitern
declare module 'express-session' {
  interface SessionData {
    adminLoggedIn: boolean;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.adminLoggedIn) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

export const handleLogin = (req: Request, res: Response): void => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'pawcoach2024';

  if (password === adminPassword) {
    req.session.adminLoggedIn = true;
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/admin/login?error=1');
  }
};

export const handleLogout = (req: Request, res: Response): void => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
