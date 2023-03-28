const parser = new DOMParser();

const xmlString = `
    <list>
      <student>
        <name lang="en">
          <first>Ivan</first>
          <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
      </student>
      <student>
        <name lang="ru">
          <first>Петр</first>
          <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
      </student>
    </list>
`;

const xmlDom = parser.parseFromString(xmlString, 'text/xml');

const listNode = xmlDom.querySelector('list');
const studentsNodes = listNode.querySelectorAll('student');

const result = {list: []};
studentsNodes.forEach((singleStudent) => {
    const student = {};

    const nameNode = singleStudent.querySelector('name');
    student.firstName = nameNode.querySelector('first').textContent;
    student.secondName = nameNode.querySelector('second').textContent;
    student.age = singleStudent.querySelector('age').textContent;
    student.prof = singleStudent.querySelector('prof').textContent;
    student.lang = nameNode.attributes[0].value;
    result.list.push(student);
});

console.log(result);
