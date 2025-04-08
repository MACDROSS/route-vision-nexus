
import React from 'react';
import { Label } from '@/components/ui/label';
import { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  label: string;
  icon?: React.ComponentType<any>;
  iconColor?: string;
  children: React.ReactNode;
}

export const InfoItem: React.FC<InfoItemProps> = ({ 
  label, 
  icon: Icon, 
  iconColor = "text-muted-foreground",
  children 
}) => {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center mt-1">
        {Icon && <Icon className={`h-4 w-4 mr-2 ${iconColor}`} />}
        {children}
      </div>
    </div>
  );
};
