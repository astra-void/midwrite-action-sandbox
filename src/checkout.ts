import { db } from "@/db";
import { orders } from "@/db/schema";

export async function markPaid(orderId: string) {
  await db.update(orders).set({ status: "paid" });
  // A crash here leaves a paid order whose event was never published.
  await queue.publish("order.paid", { orderId });
}
