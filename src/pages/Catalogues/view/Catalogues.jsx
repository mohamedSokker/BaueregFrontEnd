import ManageFiles from "../../../components/ManageFiles/View/ManageFiles";

const Catalogues = () => {
  return (
    <ManageFiles
      absPath={process.env.REACT_APP_CATALOGUE_ABS_PATH}
      relPath={process.env.REACT_APP_CATALOGUE_REL_PATH}
      getFilesURL={`/api/v3/CataloguesGetFiles`}
      createFolderURL={`/api/v3/CataloguesCreateFolder`}
      uploadURL={`/api/v3/CataloguesUploadFiles`}
      deleteFilesURL={`/api/v3/CataloguesDeleteFiles`}
      //   analyzeFileURL={`/api/v3/dataEntryOrderInvoiceAnalyze`}
      //   addDataURL={`/api/v3/dataEntryOrderInvoiceAddOrder`}
      enableCreateFolder={true}
      enableUpload={true}
      enableDelete={true}
      enableAnalyze={false}
      enableTable={false}
      enableGraph={false}
    />
  );
};

export default Catalogues;
