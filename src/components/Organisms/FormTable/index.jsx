import React, { useState, useEffect } from "react";
// Material UI
import { Grid, Button } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { editTable } from "../../../store/Table/actions";
import { withRouter } from "react-router-dom";

const FormTable = ({ history }) => {
  const dispatch = useDispatch();
  const tableEdit = useSelector((state) => state.tables.tableEdit);
  const sectors = useSelector((state) => state.sectors.sectors);
  const [dataTable, setDataTable] = useState({
    sector: "",
    diners: "0",
    numberTable: "",
    totalAmount: "0",
    pedingOrders: "",
    timeInit: "",
    timeEnd: "",
    dateReserved: "",
    codeReserved: "",
    reserved: false,
    loading: false,
    method: "Add",
    enabled: true,
  });

  useEffect(() => {
    if (tableEdit) setDataTable({ ...dataTable, ...tableEdit });
  }, [tableEdit, setDataTable]);

  const classes = styles();

  const addTable = (method) => {
    setDataTable({
      ...dataTable,
      loading: true,
    });
    dispatch(editTable(dataTable, method));
    setTimeout(() => {
      setDataTable({
        ...dataTable,
        loading: false,
      });
    }, 500);
    document.getElementById("form-table").reset();
    history.push("/tables");
  };

  const handleChange = (e) => {
    if (e.target.name === "reserved") {
      setDataTable({
        ...dataTable,
        [e.target.name]: !dataTable.reserved,
      });
    } else {
      setDataTable({
        ...dataTable,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <div className="col-4 border">
        <div className="py-3 d-flex justify-content-between border-bottom">
          <h5>{!tableEdit ? "Nueva" : "Editar"} Mesa</h5>
          <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
            Volver al listado
          </Button>
        </div>
        <div className=" d-flex mx-0 px-0 justify-content-center col-12 ">
          <form className="my-4 col-12 mx-0 px-0" id="form-table">
            <div className="form-row m-0 p-0">
              <div className="d-flex justify-content-between col-12 m-0 p-0">
                <div className="form-group col-12">
                  <label>Sector</label>
                  <select
                    onChange={(e) => handleChange(e)}
                    value={dataTable.sector}
                    className="custom-select"
                    name="sector"
                  >
                    <option selected>Sector...</option>

                    {sectors.map((item, index) => (
                      <option key={index} value={item.nameSector}>
                        {item.nameSector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-between col-12 m-0 p-0">
                <div className="form-group col-12">
                  <label for="diners">Comenzales</label>
                  <input
                    type="number"
                    className="form-control"
                    id="diners"
                    placeholder="Comenzales"
                    name="diners"
                    min="0"
                    onChange={(e) => handleChange(e)}
                    value={dataTable.diners}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between col-12 m-0 p-0">
                <div className="form-group col-12">
                  <label for="numberTable">Número de Mesa</label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberTable"
                    placeholder="Número de Mesa"
                    name="numberTable"
                    min="0"
                    value={dataTable.numberTable}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div
          className="py-2 btn btn-primary d-flex justify-content-center"
          onClick={() => addTable(dataTable.method)}
        >
          {dataTable.loading ? <CircularProgress /> : <h5>Guardar</h5>}
        </div>
      </div>
    </Grid>
  );
};

export default withRouter(FormTable);
