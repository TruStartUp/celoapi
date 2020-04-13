const margins = {
  top: 40,
  bottom: 72,
  left: 68.88189,
  right: 68.88189,
};
let unalLogo = {
  img: './api/assets/pdf/images/logoUN.png',
  x: 339.30709,
  y: margins.top,
  width: 176.5984,
  height: 68.88189,
};
let IEI = {
  str: "Instituto de Extension e Investigacion - IEI",
  x: margins.left,
  y: margins.top + unalLogo.y + 68.88189,
  font: 'Times-Italic',
  size: 14,
};

let faculty = {
  str: "Facultad de Ingenieria",
  x: margins.left,
  y: IEI.y + 16.8,
  font: 'Times-Italic',
  size: 14,
};

let headQuarter = {
  str: "Sede Bogotá",
  x: margins.left,
  y: faculty.y + 16.8,
  font: 'Times-Italic',
  size: 14,
};

// preguntar cuando es el espacio entre las letras
let certifyThat = {
  str: "CERTIFICA QUE",
  x: margins.left,
  y: headQuarter.y + 28.3465 + 20,
  font: 'Times-Roman',
  size: 14,
  characterSpacing: 8,
};

let user = {
  str: "NOMBRE APELLIDO USUARIO",
  x: margins.left,
  y: certifyThat.y + 35.71654,
  font: 'Times-Bold',
  size: 26,
};

let identificationPrefix = {
  str: "Identificado con C.C",
  x: margins.left,
  y: user.y + 35.71654,
  font: 'Times-Roman',
  size: 15,
};
let identification = {
  str: "123456789",
  x: margins.left + 150,
  y: identificationPrefix.y,
  font: 'Times-Bold',
  size: identificationPrefix.size,
};

let courseAttendance = {
  str: "Asistio al Curso:",
  x: margins.left,
  y: identificationPrefix.y + 35.71654 + 15,
  font: 'Times-Roman',
  size: 14,
};

let courseName = {
  str: "Metodologías ágiles en la Gestión de Proyectos - SCRUM",
  x: margins.left,
  y: courseAttendance.y + 35.71654,
  font: 'Times-Bold',
  size: 26,
  width: 350,
};

let courseIntensity = {
  str: '45',
  x: margins.left,
  y: courseAttendance.y + 35.71654,
  font: 'Times-Bold',
  size: 26,
  width: 350,
}

let courseDatePrefix = {
  str: "Realizado desde el día",
  x: margins.left,
  y: courseName.y + 35.71654 + 35.71654,
  font: 'Times-Roman',
  size: 14,
};

let courseStartDate = {
  str: "Fecha1",
  x: courseDatePrefix.x + 130,
  y: courseDatePrefix.y,
  font: 'Times-Roman',
  size: 14,
};

let courseFinishDate = {
  str: "Fecha2",
  x: courseStartDate.x + 75,
  y: courseDatePrefix.y,
  font: 'Times-Roman',
  size: 14,
};

let courseExtraData = {
  str: "en la ciudad de Bogotá con una intensidad horaria de 45 horas.",
  x: margins.left,
  y: courseDatePrefix.y + 16.8,
  font: 'Times-Roman',
  size: 14,
};
let deliveredDate = {
  str: "Entregado en Bogotá el día 17 de Diciembre de 2018.",
  x: margins.left,
  y: courseExtraData.y + 35.71654,
  font: 'Times-Roman',
  size: 14,
};

let sign = {
  img: './api/assets/pdf/images/firma.png',
  x: margins.left,
  y: deliveredDate.y + 35.71654 + 35.71654,
  width: 189.3543,
  height: 85.0394,
};
let signLine = {
  x1: margins.left,
  y1: sign.y + sign.height,
  x2: margins.left + 189.3543,
  y2: sign.y + sign.height
};

let secretaryName = {
  str: "NOMBRE APELLIDO SECRETARIO",
  x: margins.left,
  y: signLine.y1 + 10,
  font: 'Times-Roman',
  size: 10,
  characterSpacing: 2
};
let sercreatryFaculty = {
  str: "Secretario Académico de la Facultad de Ingeniería",
  x: margins.left,
  y: secretaryName.y + 12,
  font: 'Times-Roman',
  size: 8
};
let university =
  {
    str: "Universidad Nacional De Colombia, Sede Bogotá",
    x: margins.left,
    y: secretaryName.y + 12 + 12,
    font: 'Times-Roman',
    size: 8
  };

/**
 * Sets the metadata to the sections
 * @param metaData
 */
const set = (metaData) => {
  identification.str = metaData.studentId;
  user.str = metaData.studentName;
  courseName.str = metaData.courseName;
  courseIntensity.str = metaData.courseIntensity;
  courseStartDate.str = metaData.courseStartDate;
  courseFinishDate.str = metaData.courseFinishDate;
};

export default {
  margins,
  unalLogo,
  IEI,
  faculty,
  headQuarter,
  certifyThat,
  user,
  identificationPrefix,
  identification,
  courseAttendance,
  courseName,
  courseDatePrefix,
  courseStartDate,
  courseFinishDate,
  courseExtraData,
  deliveredDate,
  sign,
  signLine,
  secretaryName,
  sercreatryFaculty,
  university,
  set
}
