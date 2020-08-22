import React, { useState, useEffect } from "react";
// Material UI
import { Grid, TextField, Button } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { editSector, fecthSectors } from "../../../store/sectors/actions";
import { withRouter } from "react-router-dom";

const FormSector = ({ history }) => {
  const dispatch = useDispatch();
  const sectorEdit = useSelector((state) => state.sectors.sectorEdit);
  const [dataSector, setDataSector] = useState({
    nameSector: "",
    loading: false,
    method: "Add",
  });
  useEffect(() => {
    if (sectorEdit) setDataSector({ ...dataSector, ...sectorEdit });
  }, [sectorEdit, setDataSector]);

  const classes = styles();

  const addSector = (method) => {
    setDataSector({
      ...dataSector,
      loading: true,
    });

    dispatch(editSector(dataSector, method));
    setTimeout(() => {
      setDataSector({
        ...dataSector,
        loading: false,
      });
    }, 500);
    history.push("/sectors");
  };

  const handleChange = (e) => {
    setDataSector({
      ...dataSector,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    dispatch(fecthSectors());
    history.goBack();
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <div className="col-4 border">
        <div className="py-3 d-flex justify-content-between border-bottom">
          <h5>{!sectorEdit ? "Nueva" : "Editar"} Sector</h5>
          <Button variant="contained" color="secondary" onClick={() => handleBack()}>
            Volver al listado
          </Button>
        </div>
        <div className=" d-flex mx-0 px-0 justify-content-center col-12 ">
          <form className="my-4 col-12 mx-0 px-0" id="form-table">
            <div className="form-row m-0 p-0">
              <div className="d-flex justify-content-between col-12">
                <div className="form-group col-12">
                  <label for="nameSector">Nombre sector</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameSector"
                    placeholder="Nombre sector"
                    name="nameSector"
                    min="0"
                    value={dataSector.nameSector}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div
          className="py-2 btn btn-primary d-flex justify-content-center"
          onClick={() => addSector(dataSector.method)}
        >
          {dataSector.loading ? <CircularProgress /> : <h5>Guardar</h5>}
        </div>
      </div>
    </Grid>
  );
};

export default withRouter(FormSector);
