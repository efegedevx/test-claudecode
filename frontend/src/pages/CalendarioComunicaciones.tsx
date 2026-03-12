import { useState } from 'react'
import './CalendarioComunicaciones.css'

type TipoComunicacion = 'llamada' | 'videollamada' | 'reunion' | 'email'
type EstadoComunicacion = 'Pendiente' | 'Completada' | 'Cancelada'

interface Comunicacion {
  id: number
  nombre: string
  dni: string
  hora: string
  tipo: TipoComunicacion
  descripcion: string
  estado: EstadoComunicacion
}

interface DiaAgrupado {
  fecha: Date
  comunicaciones: Comunicacion[]
}

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const DIAS_SEMANA = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
]

const DATOS_MOCK: DiaAgrupado[] = [
  {
    fecha: new Date(2026, 1, 25),
    comunicaciones: [
      {
        id: 1,
        nombre: 'ALEJANDRINA OROSCO GUTIERREZ',
        dni: '09039849',
        hora: '10:00',
        tipo: 'llamada',
        descripcion: 'Seguimiento de operación PRO',
        estado: 'Pendiente',
      },
      {
        id: 2,
        nombre: 'RICARDO SIOLID MARIELFSL',
        dni: '72178318',
        hora: '14:30',
        tipo: 'videollamada',
        descripcion: 'Presentación de nueva oferta',
        estado: 'Pendiente',
      },
    ],
  },
  {
    fecha: new Date(2026, 1, 26),
    comunicaciones: [
      {
        id: 3,
        nombre: 'FELIPE MATA LOPEZ',
        dni: '47420263',
        hora: '11:00',
        tipo: 'reunion',
        descripcion: 'Revisión de documentos GEST',
        estado: 'Pendiente',
      },
      {
        id: 4,
        nombre: 'JULIO GONZALES LOPEZ',
        dni: '47420285',
        hora: '16:00',
        tipo: 'email',
        descripcion: 'Envío de información adicional',
        estado: 'Pendiente',
      },
    ],
  },
]

function formatFecha(fecha: Date): string {
  const dia = DIAS_SEMANA[fecha.getDay()]
  const num = fecha.getDate()
  const mes = MESES[fecha.getMonth()]
  const anio = fecha.getFullYear()
  return `${dia}, ${num} De ${mes} De ${anio}`
}

function TipoIcon({ tipo }: { tipo: TipoComunicacion }) {
  switch (tipo) {
    case 'llamada':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    case 'videollamada':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      )
    case 'reunion':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    case 'email':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
  }
}

function TipoLabel({ tipo }: { tipo: TipoComunicacion }) {
  const labels: Record<TipoComunicacion, string> = {
    llamada: 'Llamada',
    videollamada: 'Videollamada',
    reunion: 'Reunión',
    email: 'Email',
  }
  return <span>{labels[tipo]}</span>
}

const colorBorde: Record<TipoComunicacion, string> = {
  llamada: '#e53935',
  videollamada: '#fbc02d',
  reunion: '#ff9800',
  email: '#43a047',
}

type Vista = 'dia' | 'semana' | 'mes'

export default function CalendarioComunicaciones() {
  const [mesActual, setMesActual] = useState({ mes: 1, anio: 2026 })
  const [vista, setVista] = useState<Vista>('semana')
  const [busqueda, setBusqueda] = useState('')

  const mesAnterior = () => {
    setMesActual(prev => {
      if (prev.mes === 0) return { mes: 11, anio: prev.anio - 1 }
      return { ...prev, mes: prev.mes - 1 }
    })
  }

  const mesSiguiente = () => {
    setMesActual(prev => {
      if (prev.mes === 11) return { mes: 0, anio: prev.anio + 1 }
      return { ...prev, mes: prev.mes + 1 }
    })
  }

  const datosFiltrados = DATOS_MOCK
    .map(dia => ({
      ...dia,
      comunicaciones: dia.comunicaciones.filter(c =>
        !busqueda ||
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.dni.includes(busqueda)
      ),
    }))
    .filter(dia => dia.comunicaciones.length > 0)

  return (
    <div className="calendario-page">
      <h1 className="calendario-title">Calendario de Comunicaciones</h1>

      <div className="calendario-toolbar">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido, DNI o NOP"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="toolbar-actions">
          <button className="btn-filtros">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filtros
          </button>
          <button className="btn-nueva">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nueva Comunicación
          </button>
        </div>
      </div>

      <div className="calendario-nav">
        <div className="mes-selector">
          <button className="nav-arrow" onClick={mesAnterior}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span className="mes-label">
            {MESES[mesActual.mes]} De {mesActual.anio}
          </span>
          <button className="nav-arrow" onClick={mesSiguiente}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
        <div className="vista-toggle">
          <button
            className={`vista-btn ${vista === 'dia' ? 'active' : ''}`}
            onClick={() => setVista('dia')}
          >
            Día
          </button>
          <button
            className={`vista-btn ${vista === 'semana' ? 'active' : ''}`}
            onClick={() => setVista('semana')}
          >
            Semana
          </button>
          <button
            className={`vista-btn ${vista === 'mes' ? 'active' : ''}`}
            onClick={() => setVista('mes')}
          >
            Mes
          </button>
        </div>
      </div>

      <div className="calendario-lista">
        {datosFiltrados.map((dia, idx) => (
          <div key={idx} className="dia-grupo">
            <div className="dia-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="dia-fecha">{formatFecha(dia.fecha)}</span>
              <span className="dia-count">{dia.comunicaciones.length} comunicaciones</span>
            </div>

            <div className="comunicaciones-list">
              {dia.comunicaciones.map(com => (
                <div
                  key={com.id}
                  className="comunicacion-card"
                  style={{ borderLeftColor: colorBorde[com.tipo] }}
                >
                  <div className="card-icon">
                    <TipoIcon tipo={com.tipo} />
                  </div>
                  <div className="card-body">
                    <div className="card-header-row">
                      <div>
                        <h3 className="card-nombre">{com.nombre}</h3>
                        <p className="card-dni">DNI: {com.dni}</p>
                      </div>
                      <span className={`estado-badge estado-${com.estado.toLowerCase()}`}>
                        {com.estado}
                      </span>
                    </div>
                    <div className="card-meta">
                      <span className="meta-hora">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {com.hora}
                      </span>
                      <span className="meta-tipo">
                        <TipoIcon tipo={com.tipo} />
                        <TipoLabel tipo={com.tipo} />
                      </span>
                    </div>
                    <p className="card-descripcion">{com.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
