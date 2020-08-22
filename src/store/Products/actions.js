import { productsRef, productsEditRef, storageRef } from "../../config/firebase";
import {
  PRODUCT_START,
  PRODUCT_END,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  GET_PRODUCT_SUCCESS,
  PRODUCT_FILTER,
} from "./Constants";

export const getProduct = () => (dispatch) => {
  dispatch({
    type: PRODUCT_START,
  });
  productsRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: arr,
      });
    } else {
      dispatch({
        type: PRODUCT_FAIL,
        payload: "No hay productos disponibles",
      });
    }
  });
  dispatch({
    type: PRODUCT_END,
  });
};

export const filterProducts = (products, filter) => async (dispatch) => {
  dispatch({
    type: PRODUCT_START,
  });
  let filtrado;
  if (filter !== "All") {
    filtrado = products.filter((item, index) => item.categories === filter);
  } else {
    filtrado = products;
  }

  dispatch({
    type: PRODUCT_FILTER,
    payload: filtrado,
  });
};

export const editproducts = (products, method, fileImg) => async (dispatch) => {
  dispatch({
    type: PRODUCT_START,
    payload: method,
  });

  var imgdbServer;
  if (method === "Add") {
    if (fileImg.archivo.name) {
      // const formData = new FormData();
      // formData.append("archivo", fileImg.archivo, fileImg.archivo.name);
      // console.log("=======================================================");
      // console.log("forData", formData);
      // console.log("=======================================================");

      // if (blob.size / 1000000 > 2) {
      //   this.setState({ loading: false }, () => {
      //     alert(languageJSON.image_size_error);
      //   });
      // } else {

      var timestamp = new Date().getTime();
      var imageRef = await storageRef.child(`products/` + timestamp + `/`);
      await imageRef
        .put(fileImg.archivo)
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then((dwnldurl) => {
          products.imageUrl = dwnldurl;
          products.imageName = timestamp;

          dispatch({
            type: PRODUCT_SUCCESS,
            payload: "Se creo correctamente",
          });
          productsRef.push(products);
        })
        .catch((error) => {
          dispatch({
            type: PRODUCT_SUCCESS,
            payload: "Se ha generado un problema al crear el producto",
          });
        });
    }
  } else if (method === "Delete") {
    if (products.imageName) {
      let imageRef = await storageRef.child(`products/` + products.imageName);
      // Delete the file
      imageRef
        .delete()
        .then(function () {
          dispatch({
            type: PRODUCT_SUCCESS,
            payload: "Se borro correctamente",
          });
          productsEditRef(products.id).remove();
        })
        .catch(function (error) {
          dispatch({
            type: PRODUCT_FAIL,
            payload: "Ha ocurrido un error al eliminar el producto",
          });
        });
    } else {
      dispatch({
        type: PRODUCT_SUCCESS,
        payload: "Se borro correctamente",
      });
      productsEditRef(products.id).remove();
    }
  } else {
    if (fileImg.archivo.name) {
      let imageRef = await storageRef.child(`products/` + products.imageName + `/`);
      await imageRef
        .put(fileImg.archivo)
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then((dwnldurl) => {
          products.imageUrl = dwnldurl;
          dispatch({
            type: PRODUCT_SUCCESS,
            payload: "Se edito correctamente",
          });
          productsEditRef(products.id).set(products);
        })
        .catch((error) => {
          dispatch({
            type: PRODUCT_FAIL,
            payload: "Ha ocurrido un error al actualizar el producto",
          });
          return;
        });
    } else {
      dispatch({
        type: PRODUCT_SUCCESS,
        payload: "Se edito correctamente",
      });
      productsEditRef(products.id).set(products);
    }
  }
  dispatch({
    type: PRODUCT_END,
  });
};
