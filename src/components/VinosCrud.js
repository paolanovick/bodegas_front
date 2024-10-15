import React, { useState, useEffect, useRef } from 'react';
import { 
  getAllVinos, 
  createVino, 
  updateVino, 
  deleteVino, 
  getVinoById, 
  getVinoByNombre, 
  getVinosByTipo, 
  getVinosConOrden, 
  getVinosConPaginado 
} from '../services/vinoServices';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const VinosCRUD = () => {
  const [vinos, setVinos] = useState([]);
  const [vinoDialog, setVinoDialog] = useState(false);
  const [deleteVinoDialog, setDeleteVinoDialog] = useState(false);
  const [vino, setVino] = useState({ nombre: '', tipo: '', bodega: '' });
  const [selectedVinos, setSelectedVinos] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [tipoFiltrado, setTipoFiltrado] = useState(null);
  const [ordenCampo, setOrdenCampo] = useState('nombre');
  const [ordenDireccion, setOrdenDireccion] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const toast = useRef(null);


const [totalRecords, setTotalRecords] = useState(0); // Para el total de vinos


  const tipoOptions = [
    { label: 'Tinto', value: 'tinto' },
    { label: 'Blanco', value: 'blanco' },
    { label: 'Rosado', value: 'rosado' },
  ];

  const ordenOptions = [
    { label: 'Nombre Ascendente', value: { campo: 'nombre', orden: 'asc' } },
    { label: 'Nombre Descendente', value: { campo: 'nombre', orden: 'desc' } },
    { label: 'Tipo Ascendente', value: { campo: 'tipo', orden: 'asc' } },
    { label: 'Tipo Descendente', value: { campo: 'tipo', orden: 'desc' } },
  ];

 
useEffect(() => {
    const fetchVinos = async () => {
      try {
        const data = await getVinosConPaginado(page, limit); // Llamada a la API con paginado
        setVinos(data.vinos); // Establece los vinos en el estado
        setTotalRecords(data.totalVinos); // Total de vinos para la paginación
      } catch (error) {
        console.error("Error al obtener los vinos:", error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar vinos', life: 3000 });
      }
    };
  
    fetchVinos();
  }, [page, limit]); // Dependencias: se ejecuta cada vez que cambian la página o el límite
  
  

  const openNew = () => {
    setVino({ nombre: '', tipo: '', bodega: '' });
    setVinoDialog(true);
  };

  const hideDialog = () => {
    setVinoDialog(false);
  };

  const hideDeleteVinoDialog = () => {
    setDeleteVinoDialog(false);
  };

  const saveVino = async () => {
    try {
      if (vino._id) {
        await updateVino(vino._id, vino);
        setVinos(vinos.map(v => (v._id === vino._id ? vino : v)));
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Vino actualizado', life: 3000 });
      } else {
        const newVino = await createVino(vino);
        setVinos([...vinos, newVino]);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Vino creado', life: 3000 });
      }
      setVinoDialog(false);
      setVino({ nombre: '', tipo: '', bodega: '' });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el vino', life: 3000 });
    }
  };

  const editVino = (vino) => {
    setVino({ ...vino });
    setVinoDialog(true);
  };

  const confirmDeleteVino = (vino) => {
    setVino(vino);
    setDeleteVinoDialog(true);
  };

  const deleteVinoConfirm = async () => {
    try {
      await deleteVino(vino._id);
      setVinos(vinos.filter(v => v._id !== vino._id));
      setDeleteVinoDialog(false);
      setVino({ nombre: '', tipo: '', bodega: '' });
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Vino eliminado', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el vino', life: 3000 });
    }
  };

  // Buscar por nombre
  const buscarPorNombre = async () => {
    try {
      const data = await getVinoByNombre(nombreBusqueda);
      setVinos(data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al buscar por nombre', life: 3000 });
    }
  };

  // Filtrar por tipo
  const filtrarPorTipo = async () => {
    try {
      const data = await getVinosByTipo(tipoFiltrado);
      setVinos(data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al filtrar por tipo', life: 3000 });
    }
  };

  // Ordenar por campo
  const ordenarPorCampo = async ({ campo, orden }) => {
    try {
      const data = await getVinosConOrden(campo, orden);
      setVinos(data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al ordenar vinos', life: 3000 });
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editVino(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteVino(rowData)} />
      </>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={() => (
          <>
            <Button label="Nuevo Vino" icon="pi pi-plus" className="p-button-success" onClick={openNew} />
            <Dropdown 
              value={tipoFiltrado} 
              options={tipoOptions} 
              onChange={(e) => setTipoFiltrado(e.value)} 
              placeholder="Filtrar por tipo" 
            />
            <Button label="Filtrar" icon="pi pi-filter" className="p-button-info" onClick={filtrarPorTipo} />
          </>
        )} right={() => (
          <>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="search" onInput={(e) => setNombreBusqueda(e.target.value)} placeholder="Buscar por nombre..." />
            </span>
            <Button label="Buscar" icon="pi pi-search" className="p-button-info" onClick={buscarPorNombre} />
            <Dropdown 
              value={ordenCampo} 
              options={ordenOptions} 
              onChange={(e) => ordenarPorCampo(e.value)} 
              placeholder="Ordenar por" 
            />
          </>
        )} />

<DataTable value={vinos} paginator rows={limit} totalRecords={totalRecords} 
  selection={selectedVinos} 
  onSelectionChange={e => setSelectedVinos(e.value)} 
  globalFilter={globalFilter} 
  header="Listado de Vinos"
  paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport"
  currentPageReportTemplate={`Mostrando {first} a {last} de {totalRecords}`}
  onPage={(e) => {
    setPage(e.page + 1); // PrimeReact usa un índice 0 para las páginas, por eso sumamos 1
    setLimit(e.rows); // Cambia la cantidad de registros por página si es necesario
  }}>
  <Column field="nombre" header="Nombre"></Column>
  <Column field="tipo" header="Tipo"></Column>
  <Column field="bodega" header="Bodega"></Column>
  <Column body={actionBodyTemplate} header="Acciones"></Column>
</DataTable>


      </div>

      <Dialog visible={vinoDialog} style={{ width: '450px' }} header="Detalles del Vino" modal className="p-fluid" onHide={hideDialog}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={vino.nombre} onChange={(e) => setVino({ ...vino, nombre: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="tipo">Tipo</label>
          <InputText id="tipo" value={vino.tipo} onChange={(e) => setVino({ ...vino, tipo: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor="bodega">Bodega</label>
          <InputText id="bodega" value={vino.bodega} onChange={(e) => setVino({ ...vino, bodega: e.target.value })} required />
        </div>

        <div className="p-dialog-footer">
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveVino} />
        </div>
      </Dialog>

      <Dialog visible={deleteVinoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={<>
        <Button label="No" icon="pi pi-times" style={{ margin: '10px' }} className="p-button-text" onClick={hideDeleteVinoDialog} />
        <Button label="Sí" icon="pi pi-check" style={{ margin: '10px' }} className="p-button-text" onClick={deleteVinoConfirm} />
      </>} onHide={hideDeleteVinoDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-2" style={{ fontSize: '2rem' }} />
          {vino && <span>¿Estás seguro de que quieres eliminar <b>{vino.nombre}</b>?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default VinosCRUD;
