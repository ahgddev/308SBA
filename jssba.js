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

  function checkAssignmentCourseInfo(courseInformation, agInformation){
    //Make sure the course information and the assignment group information match
    if (agInformation.course_id !== courseInformation.id){
        return false
    } else {
        return true
    }
  }

  function wasSubmittedLate(submissionDate, dueDate){
    // Helper function filters assignments not due yet
    let convertedsubDate = Date.parse(submissionDate)
    let convertedDueDate = Date.parse(dueDate)
    let today =  new Date()

    if (convertedDueDate > today) {
        return "Not due yet."
    } else if (convertedsubDate === convertedDueDate || convertedsubDate < convertedDueDate){
        return false
    } else if (convertedsubDate > convertedDueDate){
        return true
    }
  }
  
  function collectLearnerSubmissions(agInformation, agsubmissions){
    // Get the student ID
    // Get all assignments done by the student matching the LearnerSubmission "assignment_id" to the AssignmentGroup "name"

    let learnerUpdatedData = []
    for (assignmentObj of agInformation.assignments) {
        let assignmentID = assignmentObj.id
            for (learnerInfo of agsubmissions) {
                if(learnerInfo.assignment_id == assignmentID) {
                    // Deduct 10 points from all asignments turned in late; compare AssignmentInfo "due_at" to LearnerSubmission "submitted_at"
                    // Remove assignments not due yet.
                  if(assignmentObj.points_possible <= 0){
                    try {
                      throw "Assignment points cannot be 0 or less"
                    } catch (error) {
                      console.log("Error: " + error)
                    }
                  }
                  if(wasSubmittedLate(learnerInfo.submission.submitted_at, assignmentObj.due_at) == true){
                    learnerUpdatedData.unshift(
                      {
                          learner_id: learnerInfo.learner_id,
                          assignment_id: assignmentID,
                          submission: {
                              was_submited_late: wasSubmittedLate(learnerInfo.submission.submitted_at, assignmentObj.due_at),
                              final_score: [(learnerInfo.submission.score - 10), assignmentObj.points_possible, (learnerInfo.submission.score - 10) /assignmentObj.points_possible]
                          }
                      }
                  )
                  } else {
                    learnerUpdatedData.unshift(
                      {
                          learner_id: learnerInfo.learner_id,
                          assignment_id: assignmentID,
                          submission: {
                              was_submited_late: wasSubmittedLate(learnerInfo.submission.submitted_at, assignmentObj.due_at),
                              final_score: [learnerInfo.submission.score, assignmentObj.points_possible, learnerInfo.submission.score/assignmentObj.points_possible]
                          }
                      }
                  )
                  }
                }
            }
        }
    return learnerUpdatedData
  }

  function processLearnerData(learnerArray){
    //Make the final learner objects inside an array. Filters data to match the result example.
    let finalArray = []
    for (submissionInfo of learnerArray){
      if(finalArray.length == 0){
        if(submissionInfo.submission.was_submited_late != "Not due yet."){
          finalArray.push({
            learner_id : submissionInfo.learner_id,
            [submissionInfo.assignment_id]: submissionInfo.submission.final_score[2],
         })
        } else {
          finalArray.push({
            learner_id : submissionInfo.learner_id
         })
        }
        } else {
          for(item of finalArray) {
            // // if an assignment is not yet due, it should not be included in either
            // // the average or the keyed dictionary of scores
            // Calculate the avg, trawl through the assignments and grab their grades + total points
            // Calculate the percentage total of each assignment, by their ID.
            if(item.learner_id == submissionInfo.learner_id && submissionInfo.submission.was_submited_late != "Not due yet.") {
              item[submissionInfo.assignment_id] = submissionInfo.submission.final_score[2]
              break
            } else if (finalArray.findIndex(data => data.learner_id == submissionInfo.learner_id) == -1) {
              finalArray.push({
                learner_id : submissionInfo.learner_id,
                [submissionInfo.assignment_id]: submissionInfo.submission.final_score[2],
            })
          }
        }
      }
    }
    return finalArray
  }

  function processScoreAverage(learnerArray){
    //Process the overall average grade
    for (learnerData of learnerArray){
      learnerData.avg = learnerData[1]/learnerData[2]
    }

    return learnerArray
  }


  function getLearnerData(course, ag, submissions) {
        // If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
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

    let learnerConvertedData = processLearnerData(collectLearnerSubmissions(ag,submissions))
    return processScoreAverage(learnerConvertedData)

  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result); 
  