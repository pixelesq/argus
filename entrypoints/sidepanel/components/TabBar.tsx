import { Search, ClipboardCheck, Sparkles } from 'lucide-react';

export type TabId = 'extract' | 'audit' | 'insights';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'extract', label: 'Extract', icon: <Search size={14} /> },
  { id: 'audit', label: 'Audit', icon: <ClipboardCheck size={14} /> },
  { id: 'insights', label: 'Insights', icon: <Sparkles size={14} /> },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex h-10 border-b border-slate-700 bg-slate-900">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-1 items-center justify-center gap-1.5 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-indigo-400 text-indigo-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
