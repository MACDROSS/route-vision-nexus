
import { useShippingStore } from "@/hooks/shipping/store";
import { CustomerAlert } from "@/types/shipping";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { AlertTriangle, Bell, BellRing, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CustomerAlertsListProps {
  customerId: string;
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

const AlertIcon = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'medium':
      return <BellRing className="h-4 w-4 text-amber-500" />;
    default:
      return <Bell className="h-4 w-4 text-blue-500" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

const CustomerAlertsList = ({ 
  customerId, 
  limit = Infinity, 
  showTitle = true,
  className = ""
}: CustomerAlertsListProps) => {
  const { customerAlerts, markAlertAsRead } = useShippingStore();
  const { toast } = useToast();
  
  const filteredAlerts = customerAlerts
    .filter(alert => alert.customerId === customerId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);

  const handleMarkAsRead = (alertId: string) => {
    markAlertAsRead(alertId);
    toast({
      title: "Alert marked as read",
      description: "This alert has been marked as read and won't appear in new alerts."
    });
  };

  return (
    <Card className={className}>
      {showTitle && (
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BellRing className="h-5 w-5 text-amber-500" />
            Customer Alerts
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <CheckCircle className="h-10 w-10 mb-2 opacity-20" />
              <p>No alerts for this customer</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`border rounded-md p-3 transition-colors ${alert.isRead ? 'bg-muted/20' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <AlertIcon severity={alert.severity} />
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                    </div>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {format(alert.timestamp, "MMM d, h:mm a")}
                    </span>
                    {!alert.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleMarkAsRead(alert.id)}
                        className="h-7 text-xs"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CustomerAlertsList;
