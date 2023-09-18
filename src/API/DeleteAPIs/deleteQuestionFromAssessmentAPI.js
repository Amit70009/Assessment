import axios from "axios";

const deleteBasedAssess = async (uniqueid) => {
    const deleteData = await axios.delete(`https://gray-famous-butterfly.cyclic.app/api/users/deletequestionfromassessment/${uniqueid}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  ).then((res) => {
    window.location.reload();
  })
  .catch((err) => {
    console.log(err);
  });
  }

  export {deleteBasedAssess}