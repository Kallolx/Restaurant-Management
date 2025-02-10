import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui/card";

export function OrderCard({ order }: { order: Order }) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-4 last:mb-0">
      <Card className="bg-card dark:bg-card">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-base font-medium">
                {t("Order")} #{order.id}
              </CardTitle>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {t("Customer")}: {order.customerName}
              </p>
            </div>
            <Badge variant={order.status === "new" ? "default" : "secondary"}>
              {t(order.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {t("Table Number")}:
              </span>
              <span className="font-medium">{order.tableNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {t("Order Time")}:
              </span>
              <span className="font-medium">{order.orderTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {t("Total Items")}:
              </span>
              <span className="font-medium">{order.items.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 