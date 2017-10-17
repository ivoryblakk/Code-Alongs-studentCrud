var express = require('express');
var router = express.Router();
var data = require('../models/students');
var Student = require('../models/studentSchema');

router.get('/', (req, res) => {
  // res.render('home', { students: data.getAll() });// from students.js but now we will use mongoDB
  //res.send(studentsArray);
  Student.find((err, students) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {
        students: students
      });
    }
  }); // finds everything only takes one arg

  /* OR use a promise
Student.find()
.then(students => res.render("index", { students: students }))
.catch(error => console.log(error)); */
});

// CREATE
router.get('/add', (req, res) => {
  var message = 'Please fill in the form';
  res.render('addStudent', {
    message: message
  });
});

router.post('/add', (req, res) => {
  var studentObj = new Student(req.body);
  var message = '';

  // data.addNewStudent(studentObj, err => {
  //   if (err) {
  //     message = err;
  //   } else {
  //     message = 'Student successfully added';
  //   }
  //
  // });
  studentObj.save(err => {
    if (err) {
      message = err;
    } else {
      message = studentObj.name + ' has been successfully added';
    }
  });
  res.render('addStudent', {
    message: message
  });
});

// Get one Student
router.get('/profile/:id', (req, res) => {
  var id = req.params.id;
  //res.json({ id: id, profile: data.getStudentById(id) });
  Student.findById(id).then(student =>
    res
      .render('profile', { message: null, student: student })
      .catch(error => console.log(error))
  );
});
router.post('/profile/:id', (req, res) => {
  var id = req.params.id;

  // var obj = req.body;
  // var message = '';
  // data.getStudentByIdAndUpdate(id, obj, (err, student) => {
  //   if (err) {
  //     message = err;
  //   } else {
  //     message = 'Student successfully modified';
  //     console.log(student);
  //   }
  //   res.redirect('/');
  // });
  Student.findByIdAndUpdate(id, req.body, (err, updatedStudent) => {
    if (err) {
      res.render('profile', { message: err, student: updatedStudent });
    } else {
      console.log(updatedStudent);
      res.redirect('/');
    }
  });
});

router.delete('/profile/:id', (req, res) => {
  var id = req.params.id;
  // data.deleteStudent(id, message => {
  //   res.json(message);
  // });
  Student.findByIdAndRemove(req.params.id)
    .then(deletedStudent => {
      res.json(deletedStudent);
    })
    .catch(error => res.json(error));
});

module.exports = router;
