import React, { useState, useEffect } from "react";
// Material UI
import {
  Grid,
  TextField,
  Button,
  // IconButton
} from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { editReserved } from "../../../store/reserved/actions";
import { withRouter } from "react-router-dom";
import createHash from "hash-generator";

const FormReserved = ({ history }) => {
  const dispatch = useDispatch();
  const tableEnabled = useSelector((state) => state.tables.tables);
  const tableEdit = useSelector((state) => state.reserved.reservedEdit);
  const sectors = useSelector((state) => state.sectors.sectors);
  const [tables, setTables] = useState([]);
  const [dataTable, setDataTable] = useState({
    sector: "",
    diners: "0",
    tableId: "",
    numberTable: "",
    timeInit: "00:00",
    timeEnd: "00:00",
    dateReserved: "",
    codeReserved: "",
    reserved: true,
    loading: false,
    method: "Add",
    enabled: false,
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

    dispatch(editReserved(dataTable, method));
    setTimeout(() => {
      setDataTable({
        ...dataTable,
        loading: false,
      });
    }, 500);
    document.getElementById("form-reserved").reset();
    history.push("/reserved");
  };

  const handleChange = (e) => {
    if (e.target.name === "sector")
      setTables(tableEnabled.filter((table) => table.sector === e.target.value));

    if (e.target.name === "tableId") {
      const table = tableEnabled.filter(
        (table) => table.numberTable === e.target.value && table.sector === dataTable.sector,
      )[0];
      const data = {
        diners: table.diners,
        tableId: table.id,
        numberTable: e.target.value,
        codeReserved: createHash(6),
      };

      setDataTable({
        ...dataTable,
        ...data,
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
          <h5>{!tableEdit ? "Nueva" : "Editar"} Reserva</h5>
          <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
            Volver al listado
          </Button>
        </div>
        <div className=" d-flex mx-0 px-0 justify-content-center col-12 ">
          <form className="my-4 col-12 mx-0 px-0" id="form-reserved">
            <div className="form-row m-0 p-0">
              <div className="d-flex  col-12 m-0 p-0">
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
              <div className="d-flex  col-12 m-0 p-0">
                <div className="form-group col-12">
                  <label for="table">Mesas</label>
                  <select
                    onChange={(e) => handleChange(e)}
                    value={dataTable.tableId}
                    className="custom-select"
                    name="tableId"
                  >
                    <option selected>Mesas {dataTable.sector}...</option>

                    {tables.map((item, index) => (
                      <option key={index} value={item.numberTable}>
                        Mesa - {item.numberTable}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex col-12 m-0 p-0">
                <div className="form-group col-12">
                  <TextField
                    label="Fecha reserva"
                    type="date"
                    value={dataTable.dateReserved}
                    defaultValue={dataTable.dateReserved}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="dateReserved"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex col-12 m-0 p-0">
                <div className="form-group col-12">
                  <TextField
                    id="time"
                    label="Tiempo inicial"
                    type="time"
                    value={dataTable.timeInit}
                    defaultValue={dataTable.timeInit}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="timeInit"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex col-12 m-0 p-0">
                <div className="form-group col-12">
                  <TextField
                    id="time"
                    label="Tiempo final"
                    type="time"
                    value={dataTable.timeEnd}
                    defaultValue={dataTable.timeEnd}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="timeEnd"
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

export default withRouter(FormReserved);
