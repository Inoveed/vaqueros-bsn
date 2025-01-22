import DetailPage from "@/components/DetailPage";
import { IRequest } from "@/lib/types";

const product = async ({ params }: { params: Promise<{ seat: string }> }) => {
  const now = new Date();
  const seatId = (await params).seat;
  console.log("el id del procucto", seatId);

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

  const request: IRequest = { uniqueId: uniqueId, seatId: seatId };

  return (
    <div>
      <DetailPage request={request} />
    </div>
  );
};

export default product;
