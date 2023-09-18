import axios from "axios";

const UpdateSender = async (sendername, senderemail) => {
    const x = JSON.parse(localStorage.getItem("user-details"));
    const UpdateCall = await axios.patch(
      "https://expensive-seal-kerchief.cyclic.app/api/users/update",
      {
        email: x.email,
        sendername: sendername,
        senderemail: senderemail,
      },

      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
  };

  export {UpdateSender}