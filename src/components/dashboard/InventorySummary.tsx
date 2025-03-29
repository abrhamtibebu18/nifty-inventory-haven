
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface InventoryCategory {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

interface InventorySummaryProps {
  categories: InventoryCategory[];
}

export function InventorySummary({ categories }: InventorySummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">{category.count} units</span>
              </div>
              <Progress 
                value={category.percentage} 
                className="h-2" 
                // Use the styling directly on the Progress component
                style={{ 
                  "--progress-indicator-color": `var(--${category.color.replace('bg-', '')})` 
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
