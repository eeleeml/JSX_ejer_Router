const cursos = [
  { id: 1, titulo: "React Básico", categoria: "frontend", nivel: "basico", descripcion: "React desde cero con hooks", duracion: 2, requiere: [], valor: 1 },
  { id: 2, titulo: "Node Intermedio", categoria: "backend", nivel: "intermedio", descripcion: "API REST con Express y middleware", duracion: 4, requiere: [11], valor: 3 },
  { id: 3, titulo: "CSS Grid", categoria: "frontend", nivel: "basico", descripcion: "Diseños con CSS Grid y Flexbox", duracion: 2, requiere: [], valor: 1 },
  { id: 4, titulo: "MongoDB Avanzado", categoria: "backend", nivel: "avanzado", descripcion: "Indexación, agregaciones y rendimiento", duracion: 6, requiere: [19], valor: 5 },
  { id: 5, titulo: "TypeScript Intermedio", categoria: "frontend", nivel: "intermedio", descripcion: "Tipos avanzados y genéricos", duracion: 4, requiere: [16], valor: 3 },
  { id: 6, titulo: "Docker Básico", categoria: "devops", nivel: "basico", descripcion: "Contenedores y volúmenes en Docker", duracion: 2, requiere: [], valor: 1 },
  { id: 7, titulo: "Git y GitHub", categoria: "herramientas", nivel: "basico", descripcion: "Flujos de trabajo y ramas", duracion: 2, requiere: [], valor: 1 },
  { id: 8, titulo: "React Router", categoria: "frontend", nivel: "intermedio", descripcion: "Navegación en SPAs con rutas", duracion: 4, requiere: [1], valor: 3 },
  { id: 9, titulo: "SQL Avanzado", categoria: "backend", nivel: "avanzado", descripcion: "Subconsultas, joins y normalización", duracion: 6, requiere: [], valor: 5 },
  { id: 10, titulo: "Figma para Devs", categoria: "herramientas", nivel: "basico", descripcion: "Uso de prototipos e interfaces", duracion: 2, requiere: [], valor: 1 },
  { id: 11, titulo: "Node Básico", categoria: "backend", nivel: "basico", descripcion: "Servidor y módulos en Node.js", duracion: 2, requiere: [], valor: 1 },
  { id: 12, titulo: "Tailwind CSS", categoria: "frontend", nivel: "intermedio", descripcion: "Estilos con utilidades CSS", duracion: 4, requiere: [3], valor: 3 },
  { id: 13, titulo: "CI/CD con GitHub Actions", categoria: "devops", nivel: "avanzado", descripcion: "Deploy automatizado y testing", duracion: 6, requiere: [7], valor: 5 },
  { id: 14, titulo: "HTML Semántico", categoria: "frontend", nivel: "basico", descripcion: "Estructura accesible y correcta", duracion: 2, requiere: [], valor: 1 },
  { id: 15, titulo: "Express Avanzado", categoria: "backend", nivel: "avanzado", descripcion: "Middlewares personalizados y rutas protegidas", duracion: 6, requiere: [2], valor: 5 },
  { id: 16, titulo: "TypeScript Básico", categoria: "frontend", nivel: "basico", descripcion: "Tipos primitivos y funciones tipadas", duracion: 2, requiere: [], valor: 1 },
  { id: 17, titulo: "Linux para DevOps", categoria: "devops", nivel: "intermedio", descripcion: "Comandos, scripts y permisos", duracion: 4, requiere: [], valor: 3 },
  { id: 18, titulo: "Vite + React", categoria: "herramientas", nivel: "intermedio", descripcion: "Proyectos modernos con Vite", duracion: 4, requiere: [1], valor: 3 },
  { id: 19, titulo: "MongoDB Básico", categoria: "backend", nivel: "basico", descripcion: "Colecciones, documentos y queries", duracion: 2, requiere: [], valor: 1 },
  { id: 20, titulo: "Control de versiones avanzado", categoria: "herramientas", nivel: "avanzado", descripcion: "Rebase, cherry-pick y flujos colaborativos", duracion: 6, requiere: [7], valor: 5 }
];

export default cursos;
