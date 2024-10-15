"use client";
import { UseAppSelector } from "@/Redux/store";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Suspense, forwardRef, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Dialogalert from "@/app/components/dialogalert";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  PaletteMode,
  Select,
} from "@mui/material";
import { useAddProductMutation } from "@/Redux/featuers/productApi";
import {
  deleteTokenLocalStorge,
  getUserLocalStorge,
  setUserLocalStorge,
} from "@/data/local/webData";
import { useGetProductsCategoriesQuery } from "@/Redux/featuers/productsApi";

function page({ params }: any) {
  const [alert, setAleart] = useState(false);
  const [validatedTitle, setValidatedTitle] = useState(false);
  const [validatedprice, setValidatedPrice] = useState(false);
  const [validatedDescription, setValidatedDescription] = useState(false);
  const [validatedDiscount, setValidatedDiscount] = useState(false);
  const [validatedStock, setValidatedStock] = useState(false);
  const [validatedBrand, setValidatedBrand] = useState(false);
  const [validatedCategory, setValidatedCategory] = useState(false);
  const [titleMassge, setTitleMassge] = useState("");
  const [priceMassge, setPriceMassge] = useState("");
  const [descriptionMassge, setDescriptionMassge] = useState("");
  const [discountMassge, setDiscountMassge] = useState("");
  const [stockMassge, setStockMassge] = useState("");
  const [brandMassge, setBrandMassge] = useState("");
  const [categoryMassge, setCategoryMassge] = useState("");
  const [filtervalue, setfilterValue] = useState("");
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

 
  const currentUser = UseAppSelector((state) => state.currentUser.value);

  const [NewData, setNewData] = useState({
    id: 0,
    title: "",
    description: "",
    price: "0",
    discountPercentage: "0",
    rating: 0,
    stock: "0",
    brand: "",
    category: "",
    thumbnail: "",
    images: [""],
  });

  const [addProduct, { isSuccess }] = useAddProductMutation();
  const { data: categories, isSuccess: iscategoriesSuccess } =
    useGetProductsCategoriesQuery();
  const onPress = async () => {
    if (NewData.title === "") {
      setValidatedTitle(true);
    }
    if (NewData.price === "0") {
      setValidatedPrice(true);
    }
    if (NewData.description === "") {
      setValidatedTitle(true);
    }
    if (NewData.discountPercentage === "0") {
      setValidatedPrice(true);
    }
    if (NewData.brand === "") {
      setValidatedTitle(true);
    }
    if (NewData.stock === "0") {
      setValidatedPrice(true);
    }
    if (NewData.category === "") {
      setValidatedPrice(true);
    }
    if (NewData.title != "" && NewData.price != "0") {
      await addProduct(NewData);
    }
  };

  if (isSuccess) {
    deleteTokenLocalStorge("createProductDrift");
    router.replace("/product");
  }

  const drift = getUserLocalStorge("createProductDrift");

  useEffect(() => {
    if (drift !== false) {
      setAleart(true);
    }
    if (iscategoriesSuccess) {
      setCategory(categories);
      setfilterValue(NewData.category);
    }
  }, [alert, iscategoriesSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handelcontinue = () => {
    setNewData(drift);
    setAleart(false);
  };

  const handelTitle = (e: any) => {
    setNewData({ ...NewData, title: e.target.value });
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.title !== "") {
      setValidatedTitle(false);
      setTitleMassge("");
    }
  };

  const handelPrice = (e: any) => {
    setNewData({ ...NewData, price: e.target.value });
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.price != "0") {
      setValidatedPrice(false);
      setPriceMassge("");
    }
  };

  const handelDescription = (e: any) => {
    setNewData({ ...NewData, description: e.target.value });
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.description != "") {
      setValidatedDescription(false);
      setDescriptionMassge("");
    }
  };

  const handelDiscount = (e: any) => {
    setNewData({ ...NewData, discountPercentage: e.target.value });
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.discountPercentage != "0") {
      setValidatedDiscount(false);
      setDiscountMassge("");
    }
  };

  const handelStock = (e: any) => {
    setNewData({ ...NewData, stock: e.target.value });
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.stock != "0") {
      setValidatedStock(false);
      setStockMassge("");
    }
  };

  const handelBrand = (e: any) => {
    setNewData({ ...NewData, brand: e.target.value });
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.brand != "") {
      setValidatedBrand(false);
      setBrandMassge("");
    }
  };
  const handelCategory = (e: any) => {
    setNewData({ ...NewData, category: e.target.value });
    setfilterValue(e.target.value);
    setUserLocalStorge("createProductDrift", NewData);
    if (NewData.category != "") {
      setValidatedCategory(false);
      setCategoryMassge("");
    }
  };

  return (
    <>
          <CssBaseline />
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Box>
                <TextField
                  sx={{
                    m: 1,
                    width: "80%",
                    marginLeft: "10%",
                    height: "auto",
                  }}
                  margin="normal"
                  required
                  id="title"
                  label="Title"
                  name="title"
                  multiline
                  error={validatedTitle}
                  value={NewData.title}
                  onChange={(e) => {
                    handelTitle(e);
                  }}
                />
                <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                  {titleMassge}
                </FormHelperText>

                <TextField
                  sx={{
                    m: 1,
                    width: "80%",
                    marginLeft: "10%",
                  }}
                  margin="normal"
                  required
                  id="brand"
                  label="brand"
                  name="brand"
                  error={validatedBrand}
                  value={NewData.brand}
                  onChange={(e) => {
                    handelBrand(e);
                  }}
                />
                <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                  {brandMassge}
                </FormHelperText>

                <TextField
                  sx={{
                    m: 1,
                    width: "80%",
                    marginLeft: "10%",
                  }}
                  margin="normal"
                  required
                  type="number"
                  id="price"
                  label="price"
                  name="price"
                  error={validatedprice}
                  value={NewData.price}
                  onChange={(e) => {
                    handelPrice(e);
                  }}
                />
                <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                  {priceMassge}
                </FormHelperText>

                <TextField
                  sx={{
                    m: 1,
                    width: "80%",
                    marginLeft: "10%",
                  }}
                  margin="normal"
                  required
                  type="number"
                  id="discountPercentage"
                  label="discountPercentage"
                  name="discountPercentage"
                  error={validatedDiscount}
                  value={NewData.discountPercentage}
                  onChange={(e) => {
                    handelDiscount(e);
                  }}
                />
                <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                  {discountMassge}
                </FormHelperText>

                <TextField
                  sx={{
                    m: 1,
                    width: "80%",
                    marginLeft: "10%",
                  }}
                  margin="normal"
                  required
                  type="number"
                  id="stock"
                  label="stock"
                  name="stock"
                  error={validatedStock}
                  value={NewData.stock}
                  onChange={(e) => {
                    handelStock(e);
                  }}
                />
                <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                  {stockMassge}
                </FormHelperText>
                <FormControl fullWidth sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={filtervalue}
                    label="Category"
                    autoWidth
                    required
                    error={validatedCategory}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5 + 8,
                          width: 250,
                        },
                      },
                    }}
                    onChange={(e) => {
                      handelCategory(e);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {category.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  sx={{
                    m: 1,
                    width: "80%",
                    marginLeft: "10%",
                    height: "auto",
                  }}
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  multiline
                  error={validatedDescription}
                  value={NewData.description}
                  onChange={(e) => {
                    handelDescription(e);
                  }}
                />
                <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                  {descriptionMassge}
                </FormHelperText>
              </Box>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onPress()}
            >
              Add Product
            </Button>
            <Button
              onClick={() => {
                setUserLocalStorge("createProductDrift", NewData);
              }}
              href="/product"
            >
              save information for later
            </Button>

            <Dialogalert
              continueclick={() => {
                handelcontinue();
                setAleart(false);
              }}
              canselclick={() => {
                setAleart(false);
                deleteTokenLocalStorge("createProductDrift");
              }}
              opendialog={alert}
              triggerbutton={false}
              dialogtitle={
                "there is some information was saved do you want to retrive it"
              }
              buttonContent={" save information for later"}
              continuebuttonhref={null}
            />
          </Box>
        </Box>
          </>
  );
}

export default page;
