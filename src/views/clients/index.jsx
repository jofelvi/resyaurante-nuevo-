import React, { Fragment } from "react";
import SearchClients from "../../components/Organisms/searchClient";
import CreateClient from "../../components/Organisms/createClient";

const Clients = () => {
  return (
    <div className="row px-4">
      <SearchClients />
      <CreateClient />
    </div>
  );
};
export default Clients;
