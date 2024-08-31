import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full py-10 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b to-[rgba(255,255,255,0.9)] from-transparent dark:to-[rgba(0,0,0,0.9)] dark:from-transparent z-[-1]"></div>
      <div className="container mx-auto flex justify-between px-6">
        <div>
          <img
            className="w-[150px] mb-4"
            src="/images/header-logo.png"
            alt="Logo"
          />
          <p className="mb-6 max-w-[300px] leading-relaxed text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus id
            ipsam quis placeat quisquam pariatur adipisci sit quae earum
            aliquid.
          </p>
          <ul className="flex space-x-5">
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-lg font-semibold mb-4">Company</h6>
          <ul className="space-y-2">
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                Who Are We
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                Join Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
          <ul className="space-y-2">
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-gray-900 dark:hover:text-white transition"
              >
                Offers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
