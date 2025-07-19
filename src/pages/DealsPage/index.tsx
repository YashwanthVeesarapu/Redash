import React, { useEffect, useState } from "react";
import { getAllDeals } from "../../services/deals.service";
import { CircularProgress, Card, CardContent, Grid, Box } from "@mui/material";
import "./styles.scss";
import DealsLayout from "../../layouts/DealsLayout";

export interface Deal {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  sku: string;
  link: string;
  id?: string;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllDeals("1")
      .then((data: any) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load deals.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <DealsLayout>
        <Box className="shop-layout" style={{ minHeight: "60vh" }}>
          <CircularProgress style={{ color: "white" }} />
        </Box>
      </DealsLayout>
    );

  return (
    <DealsLayout>
      <div className="shop-layout">
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="deals-title-container">
          <h2 className="deals-title">Hot Deals</h2>
        </div>
        {error ? (
          <p className="deals-error">{error}</p>
        ) : Array.isArray(deals) && deals.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {deals.map((deal: Deal, idx: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={deal.id || idx}>
                <Card className="deals-card">
                  <CardContent>
                    <img
                      src={deal.thumbnail || "/discount.svg"}
                      alt={deal.title}
                      className="deals-card-img"
                    />
                    <h3 className="deals-card-title">
                      {deal.title || "Deal Title"}
                    </h3>
                    <p className="deals-card-desc">
                      {deal.description || "No description available."}
                    </p>
                    <h4 className="deals-card-price">
                      {deal.price ? `$${deal.price}` : "Price not available"}
                    </h4>
                    <a
                      href={deal.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deals-card-link"
                    >
                      View Deal
                    </a>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <p>Something went wrong, Sorry for the inconvenience.</p>
            <p>This issue has been reported</p>
          </>
        )}
      </div>
    </DealsLayout>
  );
};

export default DealsPage;
