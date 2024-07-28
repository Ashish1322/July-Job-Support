import React from "react";
import "./usercard.css";
export default function UserCard({ name, email, pic, address, bio }) {
  return (
    <div
      style={{ width: "18rem", backgroundColor: "#d5d5d57d" }}
      className="p-2"
    >
      <div
        className="no-gutters"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          src={pic}
        />
        <div>
          <h4>{name}</h4>
          <p
            className="d-flex text-sm"
            style={{ margin: "0px", alignItems: "center" }}
          >
            <i class="fa-solid fa-envelope"></i>
            {email.substr(0, 23)}
          </p>
          {address && (
            <p className="text-sm">
              <i class="fa-solid fa-location-pin"></i>
              {address?.state} {address?.city}
            </p>
          )}
        </div>
      </div>
      {bio && (
        <p className="font-weight-light">
          {" "}
          <strong>Bio:</strong> {bio}
        </p>
      )}

      <button className="btn btn-sm btn-primary mx-2">Message</button>
      <button className="btn btn-sm btn-primary">Book appointment</button>
    </div>
  );
}
