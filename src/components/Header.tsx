// import { TrendingUp } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="app-header pr-6 w-screen fixed z-[2]">
      <div className="header-icon">
        D
      </div>
      {/* <h1>{title}</h1> */}
    </div>
  );
}
