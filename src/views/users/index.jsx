import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core";
import { DropdownMenu } from "../../components/Atoms";
import { editUsers } from "../../store/auth/actions";

const styles = makeStyles({
  options: {
    padding: 0,
    margin: 0,
  },
});
const Users = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.auth.users);

  const edit = (option, method) => {
    const rol = ["MESONERO", "CAJA", "COCINA"];
    const verify = ["Activo", "Inactivo"];

    if (rol.indexOf(method) !== -1) {
      option.rol = method;
      dispatch(editUsers(option));
    } else if (verify.indexOf(method) !== -1) {
      option.verify = method;
      dispatch(editUsers(option));
    }
  };

  return (
    <div>
      <div className="table-responsive">
        <table
          id="datatable-buttons"
          className="table table-striped dt-responsive nowrap"
        >
          <thead>
            <tr>
              <th>nombre</th>
              <th>Apellido</th>
              <th>Correo Electronico</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {listUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                  {item.rol}
                  <DropdownMenu
                    edit={edit}
                    // eliminarProducts={eliminarProducts}
                    products={item}
                    className={classes.options}
                    label="Opciones"
                    options={[
                      {
                        label: "MESONERO",
                      },
                      {
                        label: "CAJA",
                      },
                      {
                        label: "COCINA",
                      },
                      {
                        label: "CLIENTE",
                      },
                      {
                        label: "ADMIN",
                      },
                    ]}
                  />
                </td>
                <td>
                  {item.verify}
                  <DropdownMenu
                    edit={edit}
                    // eliminarProducts={eliminarProducts}
                    products={item}
                    className={classes.options}
                    label="Opciones"
                    options={[
                      {
                        label: "Activo",
                      },
                      {
                        label: "Inactivo",
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
