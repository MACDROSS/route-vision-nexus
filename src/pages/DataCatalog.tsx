
import MainLayout from "@/components/layout/MainLayout";
import DataCatalogTable from "@/components/data-catalog/DataCatalogTable";

const DataCatalog = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Data Catalog</h1>
        <p className="text-muted-foreground">
          Browse, visualize, and extract network data
        </p>
      </div>

      <div className="h-[calc(100vh-12rem)]">
        <DataCatalogTable />
      </div>
    </MainLayout>
  );
};

export default DataCatalog;
