import ManageFiles from "../../../components/ManageFiles/View/ManageFiles";

const OrderNo = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_OILSAMPLESANALYZED_ABS_PATH}
      relPath={process.env.REACT_APP_OILSAMPLESANALYZED_REL_PATH}
      getFilesURL={`/api/v3/oilSampleAnalyzedGetFiles`}
      createFolderURL={`/api/v3/oilSampleAnalyzedCreateFolder`}
      uploadURL={`/api/v3/oilSampleAnalyzedUploadFiles`}
      deleteFilesURL={`/api/v3/oilSampleAnalyzedDeleteFiles`}
      searchFileURL={`/api/v3/oilSampleAnalyzedSearchFiles`}
      enableCreateFolder={false}
      enableUpload={false}
      enableDelete={true}
      enableRename={false}
      enableAnalyze={false}
      enableTable={false}
      enableGraph={false}
    />
  );
};

export default OrderNo;
