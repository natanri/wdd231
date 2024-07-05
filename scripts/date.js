document.addEventListener("DOMContentLoaded", function(){
    const year = document.getElementById("currentyear");
    const today = new Date();
    year.innerHTML = `${today.getFullYear()}`; 

    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `${today.toLocaleString()}`

    
    const toggleButton = document.getElementById( 'toggleButton' );    
    const menuList = document.getElementById('menuList');    
     
    toggleButton.addEventListener('click', function(){
        menuList.classList.toggle('show');
    });


    function handleResize(){
        if(window.innerWidth > 430) {
            menuList.classList.remove('show');
            menuList.style.display = 'flex'
            
        }else{
            menuList.style.display = 'none';            
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize()    

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ];

    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsElement = document.getElementById('total-credits');

    function createCourseCard(course) {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        if (course.completed) {
            courseCard.classList.add('completed');
        }
        courseCard.dataset.subject = course.subject;
        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        `;        
        return courseCard;
    }

    function displayCourses(filter) {
        const courseCards = coursesContainer.querySelectorAll('.course-card');
        let totalCredits = 0;

        courseCards.forEach(card => {
            if (filter === 'all' || card.dataset.subject === filter) {
                card.style.display = '';
                totalCredits += parseInt(card.querySelector('p strong').nextSibling.nodeValue);
            } else {
                card.style.display = 'none';
            }
        });

        totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }

    // Create and append course cards
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesContainer.appendChild(courseCard);
    });

    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () =>{            
            displayCourses(button.dataset.filter);
        });
    });

    displayCourses('all')

});