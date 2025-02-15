import { useLanguage } from "@/providers/language-provider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order, OrderStatus } from "@/types/order";

export function OrderCard({ order }: { order: Order }) {
  const { t } = useLanguage();
  
  const getStatusTranslation = (status: OrderStatus | undefined): string => {
    switch (status) {
      case "new":
        return "New";
      case "processing":
        return "Processing";
      case "ready":
        return "Ready";
      case "completed":
        return "Completed";
      default:
        return "New"; // Default to "New" if status is undefined
    }
  };
  
  return (
    <div className="mb-4 last:mb-0">
      <Card className="bg-card dark:bg-card">
        <CardHeader className="p-4 mobile-md:p-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <CardTitle className="text-base font-medium mobile-md:text-sm">
                {t("Order")} #{order.id}
              </CardTitle>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground mobile-md:text-xs">
                {t("Customer")}: {order.customerName}
              </p>
            </div>
            <Badge 
              variant={order.status === "new" ? "default" : "secondary"}
              className="mobile-md:text-xs"
            >
              {t(getStatusTranslation(order.status))}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 mobile-md:p-3 mobile-md:pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm mobile-md:text-xs">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {t("Table Number")}:
              </span>
              <span className="font-medium">{order.tableNo}</span>
            </div>
            <div className="flex justify-between text-sm mobile-md:text-xs">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {t("Order Time")}:
              </span>
              <span className="font-medium">{order.orderTime}</span>
            </div>
            <div className="flex justify-between text-sm mobile-md:text-xs">
              <span className="text-muted-foreground dark:text-muted-foreground">
                {t("Total Items")}:
              </span>
              <span className="font-medium">{order.items.length}</span>
            </div>
            {order.items.length > 0 && (
              <div className="flex justify-between text-sm mobile-md:text-xs">
                <span className="text-muted-foreground dark:text-muted-foreground">
                  {t("Items")}:
                </span>
                <span className="font-medium text-right">
                  {order.items.map(item => item.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 