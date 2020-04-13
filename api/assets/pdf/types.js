import sections from './sections';

/**
 * Abstract representation of the objects that must be inside a
 * STANDARD Pdf for certificates
 * @type {{images: {img, x, y, width, height}[], text: *[], lines: {x1, y1, x2, y2}[]}}
 */
let standard =  {
  images:[
    sections.unalLogo,
    sections.sign,
  ],
  text :[
    sections.IEI,
    sections.faculty,
    sections.headQuarter,
    sections.certifyThat,
    sections.user,
    sections.identificationPrefix,
    sections.identification,
    sections.courseAttendance,
    sections.courseName,
    sections.courseDatePrefix,
    sections.courseStartDate,
    sections.courseFinishDate,
    sections.courseExtraData,
    sections.deliveredDate,
    sections.secretaryName,
    sections.sercreatryFaculty,
    sections.university
  ],
  lines:[
    sections.signLine,
  ]
};


export default {
 standard
}
