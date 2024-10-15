"use client";
import { UseAppSelector } from "@/Redux/store";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Suspense, forwardRef, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  Palette,
  PaletteMode,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUserLocalStorge } from "@/data/local/webData";
import { useGetProductByIDQuery } from "@/Redux/featuers/productApi";
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function page({ params }: any) {
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    id: 0,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: [""],
  });

  const {
    data: productData,
    isLoading: isAppsLoading,
    isUninitialized: isAppsUninitialized,
    isSuccess: isAppsSuccess,
    isError: isAppError,
    error: appError,
  } = useGetProductByIDQuery(params.id);

  useEffect(() => {
    if (isAppsSuccess) {
      setProduct(productData);
      setLoading(false);
    }
  }, [isAppsSuccess]);

  return (
    <>
      <CssBaseline />

      <Card
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: " #dad7cd",
          maxWidth: 700,
          height: "auto",
          align: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CardContent
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            align: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <Suspense fallback={<p>...loading</p>}>
                <Typography
                  sx={{ marginTop: 2, fontSize: 26, fontWeight: 700 }}
                >
                  {product.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={"/product/updateProduct/" + `${product.id}`}
                  sx={{ marginLeft: 60, marginTop: 2 }}
                >
                  Edit <EditIcon />
                </Button>
                <Typography
                  sx={{
                    marginTop: 0.5,
                    marginLeft: "-69%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                  price : {product.price}
                </Typography>
                <Typography
                  sx={{
                    marginTop: 0.5,
                    marginLeft: "-69%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                  discount : {product.discountPercentage}
                </Typography>

                <Typography
                  sx={{
                    marginTop: 0.5,
                    fontSize: 18,
                    marginLeft: "-44%",
                    fontWeight: 400,
                  }}
                >
                  category: {product.category}
                </Typography>

                <Typography
                  sx={{
                    marginTop: 1,
                    marginLeft: "-58%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                 brand: {product.brand}
                </Typography>
                <Typography
                  sx={{
                    marginTop: 1,
                    marginLeft: "-58%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                 stock: {product.stock}
                </Typography>
                <Typography
                  sx={{
                    marginTop: 1,
                    marginLeft: "-58%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                 rating: {product.rating}
                </Typography>

                <Typography
                  sx={{
                    marginTop: 3,
                    fontSize: 26,
                    fontWeight: 400,
                    border: 2,
                    borderColor: "black",
                  }}
                >
                  {product.description}
                </Typography>
              </Suspense>
            </>
          )}
        </CardContent>
      </Card>
      </>
      );
}
