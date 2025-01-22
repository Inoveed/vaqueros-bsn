import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

  const canSeatPlaceOrder = (
    startDateTime: string,
    endDateTime: string,
    isSeatSold: boolean
  ): boolean => {
    if (isSeatSold) {
      return false;
    }

    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const isWithinTimeRange = now >= start && now <= end;

    return isWithinTimeRange;
  };

  //TODO: Validar si la silla puede hacer ordenes o no.
  const startDateTime = "12/27/2024 03:00:00 PM";
  const endDateTime = "12/28/2024 02:29:00 PM";
  const isSeatSold = false;

  const canOrder = canSeatPlaceOrder(startDateTime, endDateTime, isSeatSold);

  return (
    <div>
      <Header />
      <main className="my-24">
        <ProductList />
        {/*         
        <p>My Post: {seatId}</p>
        <p>Fecha Actual: {currentDate}</p>
        <p>Hora Actual: {currentTime}</p>
        <p>ID Único de la Orden: {uniqueId}</p>
        <p>
          {canOrder
            ? "Puedes hacer órdenes desde esta silla."
            : "No puedes hacer órdenes desde esta silla."}
        </p> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default seatRequestPage;
