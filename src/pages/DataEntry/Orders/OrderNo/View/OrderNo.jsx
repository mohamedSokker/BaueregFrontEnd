import ManageFiles from "../../../../../components/ManageFiles/View/ManageFiles";

const columns = [
  "Order_No",
  "Date",
  "Equipment",
  "Quantity",
  "Unit",
  "Description",
  "PartNumber",
  "Status",
];

const values = [
  "OrderNo",
  "targetDate",
  "Eq",
  "Quantity",
  "unit",
  "desc",
  "partNo",
  "Sent",
];

const OrderNo = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_ORDERNO_ABS_PATH}
      relPath={process.env.REACT_APP_ORDERNO_REL_PATH}
      getFilesURL={`/api/v3/dataEntryOrderNoGetFiles`}
      createFolderURL={`/api/v3/dataEntryOrderNoCreateFolder`}
      uploadURL={`/api/v3/dataEntryOrderNoUploadFiles`}
      deleteFilesURL={`/api/v3/dataEntryOrderNoDeleteFiles`}
      searchFileURL={`/api/v3/dataEntryOrderNoSearchFiles`}
      renameFilesURL={`/api/v3/dataEntryOrderNoRenameFiles`}
      analyzeFileURL={`/api/v3/dataEntryOrderNoAnalyze`}
      addDataURL={`/api/v3/dataEntryOrderNoAddOrder`}
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

export default OrderNo;
