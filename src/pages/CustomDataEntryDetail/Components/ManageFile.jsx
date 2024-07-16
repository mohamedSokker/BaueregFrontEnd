import ManageFiles from "../../../components/ManageFiles/View/ManageFiles";

const ManageFile = ({ targetData }) => {
  return (
    <ManageFiles
      absPath={`${process.env.REACT_APP_DATAENTRY_ABS_PATH}/${targetData[0].Name}Standard`}
      relPath={`${process.env.REACT_APP_DATAENTRY_REL_PATH}/${targetData[0].Name}Standard`}
      targetData={targetData}
      getFilesURL={`/api/v3/CustomDataEntryGetFiles`}
      enableCreateFolder={false}
      enableUpload={false}
      enableDelete={false}
      enableRename={false}
      enableAnalyze={false}
      enableTable={false}
      enableGraph={false}
    />
  );
};

export default ManageFile;
