import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);

    const apiUrl = CoinList(1, 100, currency);

    try {
      // Adicione o prefixo do CORS Anywhere à URL da API
      const proxyUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;

      const { data } = await axios.get(proxyUrl, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
      setLoading(false);
    }
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return <div>coins table</div>;
};

export default CoinsTable;
