import useSocket from "../../hooks/useSocket";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<
    { name: string; email: string }[]
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      socket.on("newSellerRequest", (newRequest) => {
        setNotifications((prev) => [newRequest, ...prev]);
        toast.info(`New seller request from ${newRequest.name}`);
      });

      return () => {
        socket.off("newSellerRequest");
      };
    }
  }, [socket]);

  const handleBellClick = () => {
    setIsMenuOpen(!isMenuOpen);
    isMenuOpen && setNotifications([]);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <div
        className={`${
          isMenuOpen &&
          "border w-7 h-7 flex justify-center items-center rounded-full"
        } `}
      >
        <FontAwesomeIcon
          className="text-gray-700 dark:text-gray-300"
          icon={faBell}
          onClick={handleBellClick}
        />
      </div>
      {notifications.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {notifications.length}
        </span>
      )}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="p-3 border-b last:border-b-0">
                <p className="font-semibold">{notification.name}</p>
                <p className="text-sm text-gray-600">{notification.email}</p>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
