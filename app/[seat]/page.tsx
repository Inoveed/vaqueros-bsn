import { IRequest } from "@/lib/types";
import ProductList from "@/components/ProductList";

const seatRequestPage = async ({
  params,
}: {
  params: Promise<{ seat: string }>;
}) => {
  const now = new Date();
  const seatId = (await params).seat;

  const currentDate = `${(now.getMonth() + 1).toString().padStart(2, "0")}/${now
    .getDate()
    .toString()
    .padStart(2, "0")}/${now.getFullYear()}`;

  const currentTime = now
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(/:/g, "/")
    .replace(" ", "/");

  const uniqueId = `${currentDate}/${seatId}/${currentTime}`;

  const request: IRequest = {
    uniqueId,
    seatId: seatId,
  };

  return (
    <div>
      <ProductList request={request} />
    </div>
  );
};

export default seatRequestPage;
