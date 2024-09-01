import {
  faCreditCard,
  faEnvelopeOpenText,
  faLock,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offers = () => {
  return (
    <section className="flex flex-col justify-center items-center container md:flex-row md:justify-between">
      <div className="w-full md:w-1/3 ">
        <img src="/images/offer.png" alt="offer.png" />
      </div>
      <div className="w-full md:w-1/2 ">
        <h1 className=" text-4xl text-slate-800 font-bold dark:text-white">
          Winter Sale upto 70% Off
        </h1>
        <p className="text-[#777] py-3 dark:text-[#bbb9b9]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
          reiciendis inventore iste ratione ex alias quis magni at optio
        </p>
        <div className="flex flex-col gap-y-3 ">
          <div className="flex items-center gap-2 dark:text-[#bbb9b9]">
            <FontAwesomeIcon
              className="text-white bg-slate-400 w-4 p-4 rounded-full"
              icon={faTruckFast}
            />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 dark:text-[#bbb9b9]">
            <FontAwesomeIcon
              className="text-white bg-slate-400 w-4 p-4 rounded-full"
              icon={faLock}
            />
            <span>Quality Products</span>
          </div>

          <div className="flex items-center gap-2 dark:text-[#bbb9b9]">
            <FontAwesomeIcon
              className="text-white bg-slate-400 w-4 p-4 rounded-full"
              icon={faCreditCard}
            />
            <span>Easy Payment method</span>
          </div>
          <div className="flex items-center gap-2 dark:text-[#bbb9b9]">
            <FontAwesomeIcon
              className="text-white bg-slate-400 w-4 p-4 rounded-full"
              icon={faEnvelopeOpenText}
            />
            <span>Get Offers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
