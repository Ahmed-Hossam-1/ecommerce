import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { faJediOrder, faProductHunt } from "@fortawesome/free-brands-svg-icons";

const Statistics = () => {
  const numsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const statsSectionRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    numsRef.current = document.querySelectorAll(".number");
    statsSectionRef.current = document.querySelector("#stats");

    const handleScroll = () => {
      const statsSection = statsSectionRef.current;
      if (
        statsSection &&
        window.scrollY >= statsSection.offsetTop - window.innerHeight / 2 &&
        !started
      ) {
        numsRef.current?.forEach((num) => startCount(num));
        setStarted(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [started]);

  function startCount(el: HTMLElement) {
    const goal = parseInt(el.dataset.goal || "0");
    const count = setInterval(() => {
      el.textContent = (parseInt(el.textContent || "0") + 1).toString();
      if (parseInt(el.textContent || "0") >= goal) {
        clearInterval(count);
      }
    }, 2000 / goal);
  }

  return (
    <div
      id="stats"
      className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center transition duration-300 transform hover:scale-105">
        <FontAwesomeIcon
          fontSize={30}
          icon={faUser}
          className="text-gray-600 dark:text-gray-300"
        />
        <span
          className="number block text-4xl font-bold my-4 text-gray-800 dark:text-gray-200"
          data-goal="150"
        >
          0
        </span>
        <span className="text-gray-600 dark:text-gray-300">Users</span>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center transition duration-300 transform hover:scale-105">
        <FontAwesomeIcon
          fontSize={30}
          icon={faJediOrder}
          className="text-gray-600 dark:text-gray-300"
        />
        <span
          className="number block text-4xl font-bold my-4 text-gray-800 dark:text-gray-200"
          data-goal="135"
        >
          0
        </span>
        <span className="text-gray-600 dark:text-gray-300">Order</span>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center transition duration-300 transform hover:scale-105">
        <FontAwesomeIcon
          fontSize={30}
          icon={faLayerGroup}
          className="text-gray-600 dark:text-gray-300"
        />
        <span
          className="number block text-4xl font-bold my-4 text-gray-800 dark:text-gray-200"
          data-goal="50"
        >
          0
        </span>
        <span className="text-gray-600 dark:text-gray-300">Category</span>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center transition duration-300 transform hover:scale-105">
        <FontAwesomeIcon
          fontSize={30}
          icon={faProductHunt}
          className="text-gray-600 dark:text-gray-300"
        />
        <span
          className="number block text-4xl font-bold my-4 text-gray-800 dark:text-gray-200"
          data-goal="500"
        >
          0
        </span>
        <span className="text-gray-600 dark:text-gray-300">Product</span>
      </div>
    </div>
  );
};

export default Statistics;
