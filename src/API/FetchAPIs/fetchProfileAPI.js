import axios from "axios";

const ProfileCallOnClick = async () => {
    const x = JSON.parse(localStorage.getItem("user-details"));

    const ProfileCall = await axios.get(
      "https://expensive-seal-kerchief.cyclic.app/api/users/profile",
      {
        params: { email: x.email },
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    return ProfileCall.data.data.matchUser
  };

  export {ProfileCallOnClick}