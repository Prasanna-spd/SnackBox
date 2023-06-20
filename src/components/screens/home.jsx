import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import Body from "../body";
// import Carousel from "../carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      handlers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExample" class="carousel slide">
          <div
            class="carousel-inner"
            id="carousel-size"
            style={{
              objectFit: "contain",
            }}
          >
            <div
              class="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div class="d-flex justify-content-center" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  class="btn btn-outline-success bg-success text-white"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div class="carousel-item active">
              <img
                src="https://source.unsplash.com/random/2500x2500/?burger"
                class="d-block w-100 "
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/random/2500x2500/?pizza"
                class="d-block w-100 "
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/random/2500x2500/?biryani"
                class="d-block w-100 "
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container ">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>

                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Body
                            foodItems={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No data available</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"""""""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}