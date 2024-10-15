import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { obtenerBodegasConPaginado, actualizarBodega, eliminarBodega } from '../../services/BodegaService';

const PaginacionBodega = () => {
  const [bodegas, setBodegas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editingBodega, setEditingBodega] = useState(null); // Estado para la edición
  const [dialogVisible, setDialogVisible] = useState(false); // Controla el diálogo de confirmación para eliminar

  useEffect(() => {
    fetchBodegas(page);
  }, [page]);

  const fetchBodegas = async (page) => {
    try {
      const response = await obtenerBodegasConPaginado(page, 10); // Cambia el límite de filas si es necesario
      setBodegas(response.data.bodegas);
      setTotalRecords(response.data.totalBodegas);
    } catch (error) {
      console.error('Error al obtener bodegas paginadas', error);
    }
  };

  const onPageChange = (event) => {
    setPage(event.page + 1); // Cambia la página cuando se navega en el paginador
  };

  const handleEditar = (bodega) => {
    setEditingBodega({ ...bodega });
  };

  const handleGuardarEdicion = async () => {
    try {
      await actualizarBodega(editingBodega._id, editingBodega);
      setEditingBodega(null); // Finaliza la edición
      fetchBodegas(page); // Refresca los datos
    } catch (error) {
      console.error('Error al actualizar la bodega:', error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarBodega(id);
      setDialogVisible(false);
      fetchBodegas(page); // Refresca los datos tras la eliminación
    } catch (error) {
      console.error('Error al eliminar la bodega:', error);
    }
  };

  return (
    <div>
      <DataTable value={bodegas} paginator={false} responsiveLayout="scroll" className="p-datatable-striped p-datatable-sm">
        <Column field="nombre" header="Nombre" />
        <Column field="vinos" header="Vinos" body={(rowData) => (rowData.vinos ? rowData.vinos.length : 0)} />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning p-mr-2"
                onClick={() => handleEditar(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => setDialogVisible(true)}
              />
              <Dialog
                header="Confirmar Eliminación"
                visible={dialogVisible}
                style={{ width: '350px' }}
                modal
                onHide={() => setDialogVisible(false)}
                footer={<Button label="Eliminar" icon="pi pi-check" onClick={() => handleEliminar(rowData._id)} className="p-button-danger" />}
              >
                <p>¿Estás seguro de eliminar la bodega?</p>
              </Dialog>
            </div>
          )}
        />
      </DataTable>

      <Paginator
        first={(page - 1) * 10}
        rows={10}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="p-mt-4"
      />

      {/* Modal de edición */}
      {editingBodega && (
        <Dialog
          header="Editar Bodega"
          visible={!!editingBodega}
          style={{ width: '450px' }}
          modal
          onHide={() => setEditingBodega(null)}
        >
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={editingBodega.nombre}
              onChange={(e) => setEditingBodega({ ...editingBodega, nombre: e.target.value })}
            />
          </div>
          <Button label="Guardar" icon="pi pi-check" onClick={handleGuardarEdicion} className="p-button-success" />
        </Dialog>
      )}
    </div>
  );
};

export default PaginacionBodega;
