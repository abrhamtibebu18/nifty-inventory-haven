
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  linkTo: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  iconColor = "bg-safety-yellow",
  linkTo
}: StatsCardProps) {
  return (
    <Link to={linkTo}>
      <Card className="transition-all duration-200 hover:shadow-md hover:translate-y-[-4px] cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`rounded-full p-2 ${iconColor}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-muted-foreground"}`}>
            {change}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
