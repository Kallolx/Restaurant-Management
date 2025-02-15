import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/providers/language-provider";
import { Order } from "@/types/order";
import { OrderCard } from "./order-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function OrderStack() {
  const { t } = useLanguage();
  
  // Mock data for now
  const newOrders: Order[] = [];
  const processingOrders: Order[] = [];
  const readyOrders: Order[] = [];
  const completedOrders: Order[] = [];

  return (
    <div className="h-full w-full">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-4 gap-4 h-full">
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

      {/* Mobile View */}
      <div className="md:hidden h-full">
        <Tabs defaultValue="new" className="h-full">
          <TabsList className="grid grid-cols-4 h-12 mb-4">
            <TabsTrigger value="new" className="relative">
              {t("New")}
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {newOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="processing" className="relative">
              {t("Processing")}
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {processingOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="ready" className="relative">
              {t("Ready")}
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {readyOrders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="relative">
              {t("Completed")}
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {completedOrders.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="bg-background dark:bg-background rounded-lg h-[calc(100vh-180px)]">
            <TabsContent value="new" className="h-full m-0">
              <ScrollArea className="h-full w-full p-4">
                {newOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="processing" className="h-full m-0">
              <ScrollArea className="h-full w-full p-4">
                {processingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="ready" className="h-full m-0">
              <ScrollArea className="h-full w-full p-4">
                {readyOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="completed" className="h-full m-0">
              <ScrollArea className="h-full w-full p-4">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
} 