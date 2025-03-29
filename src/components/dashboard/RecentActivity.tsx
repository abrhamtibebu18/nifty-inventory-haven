
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlert, CircleCheck } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "add" | "update" | "transfer";
  title: string;
  description: string;
  user: string;
  time: string;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <a href="#" className="text-sm text-safety-yellow">View all →</a>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="mt-1 rounded-full bg-safety-yellow/20 p-1">
              {item.type === "add" && <CircleCheck className="h-4 w-4 text-safety-yellow" />}
              {item.type === "update" && <CircleAlert className="h-4 w-4 text-safety-yellow" />}
              {item.type === "transfer" && <CircleCheck className="h-4 w-4 text-safety-yellow" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-xs text-muted-foreground">By {item.user}</p>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {item.time}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
