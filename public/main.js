window.onload = function() {
  var deleteButtons = document.getElementsByClassName('deleteButton'); // getElementsByClassName comes back as an array because off multiple class

  deleteButtons[0].onclick = function() {
    // index is used because ( get element by class ) it is an array
    console.log(this);
    var id = this.getAttribute('id');
    sendDeleteRequest(id);
  };
};

function sendDeleteRequest(id) {
  var request = new Request('/students/profile/' + id, {
    method: 'DELETE',
    redirect: 'follow' // not really required
  });

  fetch(request)
    .then(response => {
      return response.json();
      //return response.json();
    })
    .then(deletedStudent => {
      var message = deletedStudent.name + ' has been deleted.';
      alert(message);
      window.location.href = '/'; // this redirects to the home page
    })
    .catch(error => console.log(error));
}
