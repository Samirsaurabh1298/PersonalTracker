import { TrendingUp } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="app-header">
      <div className="header-icon">
        <TrendingUp size={12} />
      </div>
      <h1>{title}</h1>
    </div>
  );
}
