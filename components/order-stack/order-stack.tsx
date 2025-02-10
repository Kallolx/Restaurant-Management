import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/providers/language-provider";
import { OrderCard } from "./order-card";

export function OrderStack() {
  const { t } = useLanguage();
  
  // Mock data for now
  const newOrders = [];
  const processingOrders = [];
  const readyOrders = [];
  const completedOrders = [];

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* New Orders */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("New Orders")}</h2>
            <Badge>{newOrders.length}</Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-background dark:bg-background rounded-lg">
            <ScrollArea className="h-full w-full p-4">
              {newOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Processing */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("Processing")}</h2>
            <Badge>{processingOrders.length}</Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-background dark:bg-background rounded-lg">
            <ScrollArea className="h-full w-full p-4">
              {processingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Ready */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("Ready")}</h2>
            <Badge>{readyOrders.length}</Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-background dark:bg-background rounded-lg">
            <ScrollArea className="h-full w-full p-4">
              {readyOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Completed */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("Completed")}</h2>
            <Badge>{completedOrders.length}</Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-background dark:bg-background rounded-lg">
            <ScrollArea className="h-full w-full p-4">
              {completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
} 