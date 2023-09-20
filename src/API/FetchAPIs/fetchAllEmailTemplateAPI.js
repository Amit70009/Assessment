import axios from "axios";
import { useState } from "react";

const FetchAllEmailTemplate = async () => {
    const x = JSON.parse(localStorage.getItem("user-details"));
    const FetchEmail = await axios.get(
      `https://gray-famous-butterfly.cyclic.app/api/users/email-template/allfetch/${x?.userID}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    return FetchEmail.data.data;
  };


  export {FetchAllEmailTemplate}
