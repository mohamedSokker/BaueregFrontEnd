import ManageFiles from "../../../components/ManageFiles/View/ManageFiles";

const OrderNo = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_OILSAMPLES_ABS_PATH}
      relPath={process.env.REACT_APP_OILSAMPLES_REL_PATH}
      getFilesURL={`/api/v3/oilSampleGetFiles`}
      createFolderURL={`/api/v3/oilSampleCreateFolder`}
      uploadURL={`/api/v3/oilSampleUploadFiles`}
      deleteFilesURL={`/api/v3/oilSampleDeleteFiles`}
      searchFileURL={`/api/v3/oilSampleSearchFiles`}
      renameFilesURL={`/api/v3/oilSampleRenameFiles`}
      analyzeFileURL={`/api/v3/oilSamplesAnalyze`}
      enableCreateFolder={true}
      enableUpload={true}
      enableDelete={true}
      enableRename={true}
      enableAnalyze={true}
      enableTable={false}
      enableGraph={false}
    />
  );
};

export default OrderNo;
