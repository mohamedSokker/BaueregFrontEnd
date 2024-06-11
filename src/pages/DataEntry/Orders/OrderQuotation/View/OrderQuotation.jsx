import ManageFiles from "../../../../../components/ManageFiles/View/ManageFiles";

const OrderQuotation = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_ORDERQUOTATION_ABS_PATH}
      relPath={process.env.REACT_APP_ORDERQUOTATION_REL_PATH}
      getFilesURL={`/api/v3/dataEntryOrderQuotationFiles`}
      createFolderURL={`/api/v3/dataEntryOrderQuotationCreateFolder`}
      uploadURL={`/api/v3/dataEntryOrderQuotationUploadFiles`}
      deleteFilesURL={`/api/v3/dataEntryOrderQuotationDeleteFiles`}
      analyzeFileURL={`/api/v3/dataEntryOrderQuotationAnalyze`}
      addDataURL={`/api/v3/dataEntryOrderQuotationAddOrder`}
      enableCreateFolder={true}
      enableUpload={true}
      enableDelete={true}
      enableAnalyze={true}
      enableTable={true}
      enableGraph={false}
    />
  );
};

export default OrderQuotation;
