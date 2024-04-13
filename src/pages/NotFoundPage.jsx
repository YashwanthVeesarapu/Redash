import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [seconds, setSeconds] = useState(5);

  const navigate = useNavigate();
  useEffect(() => {
    setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  }, []);

  if (seconds < 0) {
    navigate("/");
  }

  return (
    <div>
      Not Found | 404 <br /> <br />
      Redirecting to shop in {seconds}s
    </div>
  );
};

export default NotFoundPage;
