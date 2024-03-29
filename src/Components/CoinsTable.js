import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);

    const apiUrl = CoinList(1, 100, currency, `${process.env.REACT_APP_CMC_API_KEY}`);

    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;

      const { data } = await axios.get(proxyUrl, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CMC_PRO_API_KEY": `${process.env.REACT_APP_CMC_API_KEY}`,
        },
      });

      setCoins(Array.isArray(data.data) ? data.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleSearch = () => {
    const searchTerm = search.toLowerCase();

    return (coins || []).filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Monstserrat" }}
        >
          Crypto currency prices
        </Typography>

        <TextField
          label="Search for a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? undefined : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const currencyData = row.quote[currency];

                    if (!currencyData) {
                      return null;
                    }

                    const profit = currencyData.volume_change_24h > 0;

                    return (
                      <TableRow
                        style={{
                          backgroundColor: "#16171a",
                          fontFamily: "Montserrat",
                        }}
                        key={row.name}
                        hover
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(currencyData.price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {currencyData.volume_change_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(currencyData.market_cap.toFixed(2))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={Math.floor(handleSearch()?.length / 10)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 50);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
