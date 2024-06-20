import ManageFiles from "../../../../components/ManageFiles/View/ManageFiles";

const UploadFiles = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_EQSTOOLSLOCUPLOAD_ABS_PATH}
      relPath={process.env.REACT_APP_EQSTOOLSLOCUPLOAD_REL_PATH}
      getFilesURL={`/api/v3/EqsToolsUploadGetFiles`}
      createFolderURL={`/api/v3/EqsToolsUploadCreateFolder`}
      uploadURL={`/api/v3/EqsToolsUploadUploadFiles`}
      deleteFilesURL={`/api/v3/EqsToolsUploadDeleteFiles`}
      searchFileURL={`/api/v3/EqsToolsUploadSearchFiles`}
      renameFilesURL={`/api/v3/EqsToolsUploadRenameFiles`}
      analyzeFileURL={`/api/v3/EqsToolsUploadAnalyzeFiles`}
      //   addDataURL={`/api/v3/dataEntryOrderInvoiceAddOrder`}
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

export default UploadFiles;
