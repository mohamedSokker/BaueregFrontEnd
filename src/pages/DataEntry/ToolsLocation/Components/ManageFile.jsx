import ManageFiles from "../../../../components/ManageFiles/View/ManageFiles";

const ManageFile = () => {
  return (
    <ManageFiles
      absPath={import.meta.env.VITE_EQSTOOLSLOC_ABS_PATH}
      relPath={import.meta.env.VITE_EQSTOOLSLOC_REL_PATH}
      getFilesURL={`/api/v3/EqsToolsLocGetFiles`}
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
