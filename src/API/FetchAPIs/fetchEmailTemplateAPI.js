import axios from "axios";

const FetchEmailTemplate = async () => {
    const x = localStorage.getItem("TemplateID");
    const FetchEmail = await axios.get(
      `https://gray-famous-butterfly.cyclic.app/api/users/email-template/fetch/${x}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    return FetchEmail.data.data[0].body;

  };

  export {FetchEmailTemplate}