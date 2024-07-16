import ManageFiles from "../../../components/ManageFiles/View/ManageFiles";

const UploadFiles = ({ targetData }) => {
  return (
    <ManageFiles
      absPath={`${process.env.REACT_APP_DATAENTRY_ABS_PATH}/${targetData[0].Name}`}
      relPath={`${process.env.REACT_APP_DATAENTRY_REL_PATH}/${targetData[0].Name}`}
      targetData={targetData}
      getFilesURL={`/api/v3/CustomDataEntryGetFiles`}
      createFolderURL={`/api/v3/CustomDataEntryCreateFolder`}
      uploadURL={`/api/v3/CustomDataEntryUploadFiles`}
      deleteFilesURL={`/api/v3/CustomDataEntryDeleteFiles`}
      searchFileURL={`/api/v3/CustomDataEntrySearchFiles`}
      renameFilesURL={`/api/v3/CustomDataEntryRenameFiles`}
      analyzeFileURL={`/api/v3/CustomDataEntryAnalyzeFiles`}
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
