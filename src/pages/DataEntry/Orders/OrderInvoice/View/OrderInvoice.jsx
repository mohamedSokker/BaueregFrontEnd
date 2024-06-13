import ManageFiles from "../../../../../components/ManageFiles/View/ManageFiles";

const columns = [
  "Date",
  "InvoiceNo",
  "ReferenceNo",
  "OrderNo",
  "Description",
  "ItemNo",
  "Quantity",
  "Unit",
  "Total_EURO",
  "ShipmentMode",
];

const values = [
  "targetDate",
  "targetInvoiceNo",
  "orderNo",
  "referenceNo",
  "desc",
  "partNo",
  "Quantity",
  "unit",
  "totalValue",
  "targetShipmentMode",
];

const OrderInvoice = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_ORDERINVOICE_ABS_PATH}
      relPath={process.env.REACT_APP_ORDERINVOICE_REL_PATH}
      getFilesURL={`/api/v3/dataEntryOrderInvoiceFiles`}
      createFolderURL={`/api/v3/dataEntryOrderInvoiceCreateFolder`}
      uploadURL={`/api/v3/dataEntryOrderInvoiceUploadFiles`}
      deleteFilesURL={`/api/v3/dataEntryOrderInvoiceDeleteFiles`}
      analyzeFileURL={`/api/v3/dataEntryOrderInvoiceAnalyze`}
      addDataURL={`/api/v3/dataEntryOrderInvoiceAddOrder`}
      enableCreateFolder={true}
      enableUpload={true}
      enableDelete={true}
      enableAnalyze={true}
      enableTable={true}
      enableGraph={false}
      columns={columns}
      values={values}
    />
  );
};

export default OrderInvoice;
