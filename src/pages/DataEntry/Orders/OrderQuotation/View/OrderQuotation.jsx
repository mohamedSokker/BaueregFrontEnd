import ManageFiles from "../../../../../components/ManageFiles/View/ManageFiles";

const columns = [
  "Date",
  "QuotationNo",
  "OrderNo",
  "PartNo",
  "Description",
  "Quantity",
  "Unit",
  "UnitPrice",
  "TotalPrice",
];

const values = [
  "targetDate",
  "targetQuotationNo",
  "targetOrderNo",
  "partNo",
  "Desc",
  "Quantity",
  "Unit",
  "targetUnitPrice",
  "targetTotalPrice",
];

const OrderQuotation = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_ORDERQUOTATION_ABS_PATH}
      relPath={process.env.REACT_APP_ORDERQUOTATION_REL_PATH}
      getFilesURL={`/api/v3/dataEntryOrderQuotationFiles`}
      createFolderURL={`/api/v3/dataEntryOrderQuotationCreateFolder`}
      uploadURL={`/api/v3/dataEntryOrderQuotationUploadFiles`}
      deleteFilesURL={`/api/v3/dataEntryOrderQuotationDeleteFiles`}
      searchFileURL={`/api/v3/dataEntryOrderQuotationSearchFiles`}
      renameFilesURL={`/api/v3/dataEntryOrderQuotationRenameFiles`}
      analyzeFileURL={`/api/v3/dataEntryOrderQuotationAnalyze`}
      addDataURL={`/api/v3/dataEntryOrderQuotationAddOrder`}
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

export default OrderQuotation;
