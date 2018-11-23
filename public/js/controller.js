app.controller('mainController', function ($scope, $http) {

	$scope.formData = {};
	console.log ("entre al main controller");

});

//dejo paginas para ver lo del current user
//http://jsfiddle.net/HEdJF/
//https://stackoverflow.com/questions/21919962/share-data-between-angularjs-controllers


app.controller('eventController', function ($scope, $location, $http, $window, CurrentUser) {
  
  $scope.currentUser = CurrentUser;
 
  //armo toda la data para hacer el datepicker
    $scope.today = function() {
    //$scope.event.fecha = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    //$scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[0];
  
  
  $scope.formData = {};
  //fin calendario
  
  
  
  // funcion para listar eventos
  $scope.listEvents = function() {
    $http.get('/api/events')
    .success(function(data) {
      $scope.events = data;
      console.log(data)
    })
    .error(function(data) {
    console.log('Error: ' + data);
    });
  };
 
  
  //submite del add
  $scope.submit = function(event) {
    if ($scope.event) {
        $http.post('/api/events',$scope.event)
        .success(function(data) {
          $scope.events = data;
          console.log(data)
        })
      .error(function(data) {
        console.log('Error: ' + data);
      });
      console.log($scope.event);
    }
  };
  
  
  //para mostrar el formulario de edicion
  $scope.editInfo = function(info){
    $scope.currentEvent = info;
      $('#editForm').slideToggle();
  };


  //funcion que actualiza el evento
  $scope.updateEvent = function(){
    if ($scope.currentEvent) {
      $http.put('/api/events/'+ $scope.currentEvent._id, $scope.currentEvent )
      .success(function(data){
        //$('#editForm').hide();
        $('#editForm').hide();
          $scope.listEvents();
          
        if (data == true) {
          
        }
      });
    }
  }
  
  //funcion que borra el evento
  $scope.deleteEvent = function(info){
    $scope.currentEvent = info;
    
    if ($scope.currentEvent) {
      $http.delete('/api/events/'+ $scope.currentEvent._id, $scope.currentEvent )
      .success(function(data){
        //$('#editForm').hide();
        //$('#editForm').hide();
          $scope.listEvents();
          
        if (data == true) {
          
        }
      });
    }
  }
  
  //funcion que borra el evento
  $scope.asistirEvent = function(info,user_id){
    $scope.currentEvent = info;
    
    if ($scope.currentEvent && user_id) {
      //uso este user de prueba
      //5bb7d0ded3b365165665b003
      $http.post('/api/events/'+ $scope.currentEvent._id + '/' + user_id, $scope.currentEvent )
      .success(function(data){
        //$('#editForm').hide();
        //$('#editForm').hide();
          $scope.listEvents();
          
        if (data == true) {
          
        }
      });
    }
  }
  
  
  $scope.mostarAsistentes = function (info){
    
    $scope.currentEvent = info;
    
    if ($scope.currentEvent) {
      //uso este user de prueba
      //5bb7d0ded3b365165665b003
      $http.get('/api/events/'+ $scope.currentEvent._id + '/users')
      .success(function(data){
        //$scope.asistentes = data;
        $window.alert(JSON.stringify(data));
      });
    }
  }



});



app.controller('userController', function ($scope, $location, $http, $window, CurrentUser) {
  
  $scope.currentUser = CurrentUser;
  
  
  
   // funcion para listar eventos
  $scope.listUsers = function() {
    $http.get('/api/users')
    .success(function(data) {
      $scope.users = data;
      console.log(data)
    })
    .error(function(data) {
    console.log('Error: ' + data);
    });
  };
  
  
   
  //submite del add
  $scope.submitUser = function(user) {
    
    console.log ("enro al subtmi");
    if ($scope.user) {
        $http.post('/api/users',$scope.user)
        .success(function(data) {
          $scope.users = data;
          console.log(data)
        })
      .error(function(data) {
        console.log('Error: ' + data);
      });
      console.log($scope.user);
    }
  };
  
  $scope.seleccionarCurrentUser = function(user) {
    CurrentUser.username = user.username;
    CurrentUser._id = user._id;
    console.log(CurrentUser);
  }
  
  
});

