import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ReactLoading from "react-loading";
import { Header, ProductCard } from "../../components";
import { useGetProductsQuery } from "../../state/api/adminApi.js";

const Products = () => {
  const theme = useTheme();
  const { data, error, isError, isLoading } = useGetProductsQuery();
  const isLgDevice = useMediaQuery("(min-width: 1130px)");
  const isMdDevice = useMediaQuery("(min-width: 700px)");
  const isSmDevice = useMediaQuery("(min-width: 480px)");

  return (
    <Box m="1.5rem">
      <Header
        title="PRODUCTS"
        subtitle="Browse through your list of products."
      />
      {isLoading ? (
        <Box mt="20px">
          <ReactLoading
            type="spin"
            color={theme.palette.secondary[300]}
            height="25px"
            width="25px"
          />
        </Box>
      ) : isError ? (
        <Typography mt="20px" variant="h6" color={theme.palette.secondary[400]}>
          {error}
        </Typography>
      ) : data.length !== 0 ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={`repeat(${
            isLgDevice ? 4 : isMdDevice ? 3 : isSmDevice ? 2 : 1
          }, minmax(0, 1fr))`}
          gap="20px"
        >
          {data.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              category={product.category}
              supply={product.supply}
              stats={product.stats}
            />
          ))}
        </Box>
      ) : (
        <Typography mt="20px" variant="h6" color={theme.palette.secondary[400]}>
          No data available
        </Typography>
      )}
    </Box>
  );
};

export default Products;
