
const findTeenager = (peopleList) => {
    return peopleList.find((person) => person.age >= 13 && person.age <= 19);
};

function People() {
    const people = [  
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
        { id: 4, name: 'David', age: 40 },
        { id: 5, name: 'Eve', age: 45 },
        { id: 6, name: 'Frank', age: 50 },
        { id: 7, name: 'Grace', age: 55 },
        { id: 8, name: 'Henry', age: 60 },
        { id: 9, name: 'Ivy', age: 65 },
        { id: 10, name: 'Jack', age: 70 }
    ];

    const teenager = findTeenager(people);

    return (
        <div>
            <h1>People</h1>
         
            <ol>
                {people.map((person) => (
                    <li key={person.id}>
                        {person.name} - {person.age} years old
                    </li>
                ))}
            </ol>
            <h2>Teenager Information</h2>
               <div>
                {teenager ? (
                    <p>
                        First teenager: {teenager.name} - {teenager.age} years old
                    </p>
                ) : (
                    <p>No result</p>
                )}
            </div>
        </div>
    );
}
export default People;

