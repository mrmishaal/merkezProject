import { Link } from 'react-router-dom';

function Button({ children, to, href, variant = 'primary', className = '' }) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-primary text-white hover:-translate-y-0.5 hover:bg-blue-900 focus-visible:ring-primary shadow-soft',
    outline:
      'border border-primary text-primary hover:-translate-y-0.5 hover:bg-primary hover:text-white focus-visible:ring-primary',
    accent:
      'bg-accent text-slate-900 hover:-translate-y-0.5 hover:bg-amber-500 focus-visible:ring-accent shadow-soft',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href || '#'} className={classes}>
      {children}
    </a>
  );
}

export default Button;
