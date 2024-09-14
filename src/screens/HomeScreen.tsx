import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import  { useEffect, useState } from "react";

export const HomeScreen = () => {
  const [Data, setData] = useState();
  const [rowClick, setRowClick] = useState(true);
  const [page, setPage] = useState(1);
  const [loadin, setLoading] = useState(false);

  

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );
      const data1 = data.data;

      console.table(data1);

      setData(data1);
      setLoading(false);
    }
    load();
  }, [page]);
  console.log(Data);

  return (
    <>
      <div className="mt-10 w-10/12 m-auto p-10 shadow-xl border border-slate-300 rounded-xl">
        <div className="text-center mb-10">
          <h1 className="text-xl font-medium">DataView Table!</h1>
        </div>

        {loadin ? (
          <>
            <div className="flex justify-center">
              <span className="loader"></span>
            </div>
          </>
        ) : (
          <>
            <DataTable
              
              editMode="row"
              value={Data}
              tableStyle={{ minWidth: "auto" }}
            >
              <Column
                selectionMode="single"
                headerStyle={{ width: "3rem" }}
              ></Column>

              <Column className="text-lg" field="title" header="✔  Title "  >
                
              </Column>
              <Column
                className="text-lg"
                field="place_of_origin"
                header="Name"
              ></Column>
              <Column
                className="text-lg"
                field="artist_display"
                header="Category"
              ></Column>
              <Column
                className="text-lg"
                field="inscriptions"
                header="Quantity"
              ></Column>

              <Column
                className="text-lg"
                field="date_start"
                header="Quantity"
              ></Column>
              <Column
                className="text-lg"
                field="date_end"
                header="Quantity"
              ></Column>
            </DataTable>
            <Paginator
              onPageChange={(e)=>setPage(e.first)}
              className="mt-10 text-lg flex gap-10 bg-black p-4 text-white rounded-md shadow-xl"
              first={0}
              rows={10}
              totalRecords={120}
            />
          </>
        )}
      </div>
    </>
  );
};

/* HTML: <div class="loader"></div> */
