const express = require('express')
const app = express()

let {instructors, courses, students} = require('./data')

app.post('/', (req, res) => {
  const lastInstrId = instructors[instructors.length - 1].instructor_id
  const newInstructor = {...req.body, instructor_id: lastInstrId + 1}

  instructors.push(newInstructor)
  res.status(201).json({newInstructor})

}) 

app.put('/courses/:id', (req, res) => {

const { id } = req.params
  let courseIndex
  const course = courses.find((course, index) => {
    if (course.course_id == id) {
      courseIndex = index
      return true
    }
  })

  if (!course) {
    return res
      .status(404)
      .json({success: false, message: `No course with id ${id}` })
  }

  const updatedcourse = {
    ...course,
    ...req.body,
  }

  courses[courseIndex] = updatedcourse
  res.status(200).json({ updatedcourse })
})

app.delete("/students/:id", (req, res) => {
  const { id } = req.params
  const student = students.find((student) => student.student_id == id)

	console.log(student)

  if (!student) {
    return res
      .status(404)
      .json({success: false, message: `No student with id ${id}` })
  }

  students = students.filter((student) => student.student_id != id)
  res.status(200).json({ student })
})

app.listen(3000, (error) => {
    if (!error)
      console.log(
        "Server is Successfully Running, and App is listening on port " + 3000
      )
    else console.log("Error occurred, server can't start", error)
  })