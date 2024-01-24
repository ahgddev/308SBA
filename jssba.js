// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function checkAssignmentCourseInfo(courseInformation, assignmentGroupInformation){
    if (assignmentGroupInformation.course_id !== courseInformation.id){
        return false
    } else {
        return true
    }
  }
  
  function collectLearnerSubmissions(assignmentGroupInformation, submissions){
    
  }
  function getLearnerData(course, ag, submissions) {
    
    try{
        if(!checkAssignmentCourseInfo(course, ag)){
           throw "Assignment Group does not match Course." 
        } else if(course == undefined || course == null) {
            throw "Course does not exist."
        } else if (ag == undefined || ag == null) {
            throw "Assignment Group does not exist."
        }
        else {
            console.log("Course & assignment information found.")
        }
    } catch (error) {
        console.log("Error: " + error)
    }

    // // the ID of the learner for which this data has been collected
    // "id": number,
    // // the learner’s total, weighted average, in which assignments
    // // with more points_possible should be counted for more
    // // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // // would have a weighted average score of 240/300 = 80%.
    // "avg": number,
    // // each assignment should have a key with its ID,
    // // and the value associated with it should be the percentage that
    // // the learner scored on the assignment (submission.score / points_possible)
    // <assignment_id>: number,
    // // if an assignment is not yet due, it should not be included in either
    // // the average or the keyed dictionary of scores
    // If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

  
    // Get the student ID
    // Get all assignments done by the student matching the LearnerSubmission "assignment_id" to the AssignmentGroup "name"
    // Filter out assignments not due yet
    // Deduct 10 points from all asignments turned in late; compare AssignmentInfo "due_at" to LearnerSubmission "submitted_at"
    // Calculate the avg, trawl through the assignments and grab their grades + total points
    // Calculate the percentage total of each assignment, by their ID.
    // Wrap all of this up in an object.
    // Final object does not need to match the order of the example
    // Okay to use round() or something to clean up decimals

    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result); 
  