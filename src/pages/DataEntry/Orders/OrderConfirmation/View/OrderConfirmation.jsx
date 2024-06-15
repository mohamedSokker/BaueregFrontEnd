import ManageFiles from "../../../../../components/ManageFiles/View/ManageFiles";

const columns = [
  "Date",
  "ConfirmationNo",
  "OrderNo",
  "PartNo",
  "Description",
  "Quantity",
  "Unit",
  "UnitPrice",
  "TotalPrice",
  "DeliveryDate",
  "ShipmentMode",
];

const values = [
  "targetDate",
  "targetConfirmNo",
  "targetOrderNo",
  "partNo",
  "Desc",
  "Quantity",
  "Unit",
  "targetUnitPrice",
  "targetTotalPrice",
  "deliveryDate",
  "targetShipmentMode",
];

const OrderConfirmation = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_ORDERCONFIRMATION_ABS_PATH}
      relPath={process.env.REACT_APP_ORDERCONFIRMATION_REL_PATH}
      getFilesURL={`/api/v3/dataEntryOrderConfirmationFiles`}
      createFolderURL={`/api/v3/dataEntryOrderConfirmationCreateFolder`}
      uploadURL={`/api/v3/dataEntryOrderConfirmationUploadFiles`}
      deleteFilesURL={`/api/v3/dataEntryOrderConfirmationDeleteFiles`}
      searchFileURL={`/api/v3/dataEntryOrderConfirmationSearchFiles`}
      renameFilesURL={`/api/v3/dataEntryOrderConfirmationRenameFiles`}
      analyzeFileURL={`/api/v3/dataEntryOrderConfirmationAnalyze`}
      addDataURL={`/api/v3/dataEntryOrderConfirmationAddOrder`}
      enableCreateFolder={true}
      enableUpload={true}
      enableDelete={true}
      enableRename={true}
      enableAnalyze={true}
      enableTable={true}
      enableGraph={false}
      columns={columns}
      values={values}
    />
  );
};

export default OrderConfirmation;
