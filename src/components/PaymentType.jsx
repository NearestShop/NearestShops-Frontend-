import { Link } from "react-router-dom";

import onlinePayment from "/assets/onlinePayment.svg";
import cod from "/assets/COD.svg";

const PaymentType = () => {
  return (
    <section className="flex items-center justify-center px-6 py-20">
      <div className="flex flex-col lg:flex-row shadow-xl p-6 rounded-xl bg-primary">
        <div className="flex flex-col gap-4 pb-8 lg:pb-0 lg:pr-8 lg:border-r-2 border-accent">
          <img className="size-[250px] lg:size-[400px]" src={onlinePayment} alt="" />
          <Link to="/pay-online" className="bg-accent hover:bg-secondary text-center text-white lg:w-[200px] lg:mx-auto py-2 text-xl font-medium">Pay Online</Link>
        </div>
        <div className="flex flex-col gap-4 pt-8 lg:pt-0 border-t-2 lg:border-t-0 border-accent lg:pl-8">
          <img className="size-[250px] lg:size-[400px]" src={cod} alt="" />
          <Link to="/cash-on-delivery" className="bg-accent hover:bg-secondary text-center text-white lg:w-[200px] lg:mx-auto py-2 text-xl font-medium">Cash On Delivery</Link>
        </div>
      </div>
    </section>
  )
}

export default PaymentType