import React, { useState } from "react";
import { db, storage } from "../config/config";
// import {ref,uploadBytesResumable} from "firebase/storage"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");

 

  const types = ["image/png", "image/jpeg"];
  
  const addProduct = (e) => {
    e.preventDefault();
    console.log(productName,productPrice,productImg)
    
    const uploadTask = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
      toast.success('Product added', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        storage
          .ref("product-images")
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImg: url
              })
              .then(() => {
                setProductName("");
                setProductPrice(0);
                setProductImg("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );




  };

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Select a valid type png or jpeg");
    }
  };

  return (
    <div className="container">
      <br />
      <h2>Add Products</h2>
      <hr />
      <form className="form-group" onSubmit={addProduct}>
        <label htmlFor="product-name">Product Name</label>
        <br />
        <input
          type="text"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <label htmlFor="product-price">Product Price</label>
        <br />
        <input
          type="number"
          className="form-control"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <br />

        <input
          type="file"
          id="file"
          className="form-control"
          onChange={productImgHandler}
        />

        <br />

        <button className="btn btn-success btn-md">Add</button>
        <br />
        {error && <span style={{ color: "red" }}>{error}</span>}
      </form>
    </div>
  );
}

export default AddProduct;
