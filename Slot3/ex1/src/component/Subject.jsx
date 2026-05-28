function Subject() {
    //Khai báo mảng chứa tên các môn học : React, React Native, NodeJS
    const subjects = ['React', 'React Native', 'NodeJS'];
  return (
    <div>
      <h1>Course names</h1>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>{subject}</li>
        ))}
      </ul>
    </div>
  );
}
export default Subject;