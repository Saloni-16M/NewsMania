import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ title, description, newspaperName }) => {
  return (
    <>
      <div className="card" style={{ width: "18rem", margin: "3rem" }}>
        <img
          src="https://pocenglish.com/wp-content/uploads/2022/11/4.jpg"
          className="card-img-top"
          alt="Placeholder"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          {/* Use Link to navigate to the newspaper's headlines page */}
          <Link
            to={`/newspaper/${newspaperName}`}
            className="btn btn-primary"
          >
            Read Headlines
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
