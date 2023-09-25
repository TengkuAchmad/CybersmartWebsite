import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus semua data sesi dari localStorage
    localStorage.clear();

    // Arahkan pengguna ke halaman login
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>; // Tampilkan pesan "Logging out..." jika perlu
};

export default Logout;
