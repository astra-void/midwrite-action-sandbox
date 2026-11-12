import { db } from "@/db";
import { orders, outbox } from "@/db/schema";

export async function markPaid(orderId: string) {
  // The event is recorded in the same transaction; a relay publishes it.
  await db.transaction(async (tx) => {
    await tx.update(orders).set({ status: "paid" });
    await tx.insert(outbox).values({ topic: "order.paid", payload: { orderId } });
  });
}
