import { CloudRain } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="sidebar mt-[48px] fixed z-[2] pt-4">
      <div className="sidebar-icon bg-[#E5F4F2]">
        {/* <CloudRain size={20} /> */}
        <img src="/chart.svg" alt="" />
      </div>
    </div>
  );
}
