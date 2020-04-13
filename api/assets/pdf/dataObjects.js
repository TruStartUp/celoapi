let standardCertificate = [];

let interLineSpace=14;


const cmToPts=(value)=>{
  return value* 28.3465
};

const margins = {
  top: 40,
  bottom: 72,
  left: 68.88189,
  right: 68.88189,
};

const unalLogo =()=>{
  let path=__dirname+'/images/logoUN.png';
  let width=cmToPts(6.23);
  let height=cmToPts(2.77);
  let x =cmToPts(2.77+15+-6.23);
  let y = margins.top;
  return {image:path,width:width,height:height,x:x,y:y}
};

const institute = ()=>{
  let str='Instituto de Extensión e Investigación - IEI';
  let fontType='Ancizar';
  let size=14;
  let y= cmToPts(2.43);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},italics:true};
};
const faculty = ()=>{
  let str='Facultad de Ingenieria';
  let fontType='Ancizar';
  let size=14;
  let y= cmToPts(2.43)+interLineSpace;
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},italics:true};
};
const headQuarter= () =>{
  let str = 'Sede Bogotá';
  let fontType='Ancizar';
  let size=14;
  let y= cmToPts(2.43)+2*interLineSpace;
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},italics:true};
};
const certify = ()=>{
  let str = 'CERTIFICA QUE';
  let fontType = 'Ancizar';
  let size = 14;
  let y = headQuarter().relativePosition.y + cmToPts(1);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},normal:true, characterSpacing:4};
};

const studentName =(name)=>{
  let str = name;
  let fontType = 'Ancizar';
  let size = 26;
  let y = certify().relativePosition.y+cmToPts(1);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},bold:true};

};
const studentID = (id=null)=>{
  if(id==null) id='CC123'
  id=id.replace(/\s+/, ""); //remove white space
  let [,idType,idNumber]=id.match(/([A-Za-z]*)(\d*)/);
  let str1 = 'Identificado con '+idType.replace(/(.{1})/g,'$1.');
  let str2 = idNumber;
  let fontType = 'Ancizar';
  let size = 15;
  let y = studentName().relativePosition.y+cmToPts(1.26+0.3);
  return [{text:str1,font:fontType,fontSize:size,relativePosition:{y:y},normal:true},
          {text:str2,font:fontType,fontSize:size,relativePosition:{x:cmToPts(5.5),y:y},bold:true}
          ];
};
const asistance =()=>{
  let str = 'Asistió al curso';
  let fontType = 'Ancizar';
  let size = 14;
  let y = studentID()[0].relativePosition.y+cmToPts(1.26+0.3);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},normal:true};
};
const courseName = (name=null)=>{
  let str = name;
  let fontType = 'Ancizar';
  let size = 26;
  let y = asistance().relativePosition.y+cmToPts(1.26);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},bold:true};
};
const dates=(start=null,finish=null,intensity=null)=>{
  let str = 'Realizado desde el '+start+' al '+finish+' en la ciudad de Bogotá con una intensidad horaria de ' + intensity +' horas.';
  let fontType = 'Ancizar';
  let size = 14;
  let y= courseName().relativePosition.y+cmToPts(1.26+2);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},normal:true};
};
const deliveredAt=(date=null)=>{
  let str='Entregado en Bogotá el '+date;
  let fontType = 'Ancizar';
  let size = 14;
  let y = dates().relativePosition.y+cmToPts(1.26+0.5);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},normal:true};
};

const secretarySign=()=>{
  let path=__dirname+'/images/firma.png';
  let width=cmToPts(6.68);
  let height=cmToPts(2.2);
  let y = deliveredAt().relativePosition.y+cmToPts(1.26+1);
  return {image:path,width:width,height:height,relativePosition:{y:y}}
};
const signLine=()=>{
  return {
    canvas:[
      {
        type: 'line',
        x1:0, y1: 550,
        x2: cmToPts(6.68), y2: 550,
        lineWidth: 1
      },
      ]}
};
const secretaryName=(name=null)=>{
  let str = name;
  let fontType = 'Ancizar';
  let size = 12;
  let y = secretarySign().relativePosition.y+cmToPts(2.7);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},normal:true,characterSpacing: 2};
};
const secretaryInfo=()=>{
  let str = 'Secretario Acádemico de la Facultad de Ingeniería\nUniversidad Nacional de Colombia, Sede Bogotá';
  let fontType = 'Ancizar';
  let size = 8;
  let y = secretaryName().relativePosition.y+cmToPts(0.5);
  return {text:str,font:fontType,fontSize:size,relativePosition:{y:y},normal:true};
};
const buildMetadata =(metadata)=>{
  standardCertificate.push(
    unalLogo(),
    institute(),
    faculty(),
    headQuarter(),
    certify(),
    studentName(metadata.studentName),
    studentID(metadata.studentId),
    asistance(),
    courseName(metadata.courseName),
    dates(metadata.courseStartDate,metadata.courseFinishDate,metadata.courseIntensity),
    deliveredAt(metadata.courseDeliveredDate),
    secretarySign(),
    secretaryName(metadata.secretaryName),
    secretaryInfo(),
    signLine(), // always LAST in array since coordinates are not relative
  );
  return standardCertificate
};

module.exports = {
  buildMetadata
};




